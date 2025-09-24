"use client";

import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Camera,
  Upload,
  Play,
  Square,
  RotateCcw,
  Zap,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { analysisApi } from "@/lib/api/analysis-api";
import { CorrosionAnalysis } from "@/lib/types/analysis";

export default function CapturaPage() {
  const [activeTab, setActiveTab] = useState("camera");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<CorrosionAnalysis | null>(null);

  // novos estados para ferrugem e fundo
  const [rustColor, setRustColor] = useState("vermelha");
  const [backgroundColor, setBackgroundColor] = useState("preto");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Mutation
  const analyzeImageMutation = useMutation({
    mutationFn: ({
      file,
      rustColor,
      backgroundColor,
    }: {
      file: File;
      rustColor: string;
      backgroundColor: string;
    }) => analysisApi.analyzeImage(file, { rustColor, backgroundColor }),
    onSuccess: (result) => {
      setAnalysis(result);
      toast.success(
        `Análise concluída! Corrosão: ${result.corrosionPercentage.toFixed(
          1
        )}%`
      );
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro na análise da imagem");
    },
  });

  // Câmera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsRecording(true);
      }
    } catch (error) {
      toast.error("Erro ao acessar a câmera");
      console.error("Camera error:", error);
    }
  }, [selectedDevice]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);

  // Upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff"],
    },
    maxFiles: 1,
  });

  // Análise
  const handleAnalyze = async () => {
    let file: File;

    if (uploadedFile) {
      file = uploadedFile;
    } else if (capturedImage) {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      file = new File([blob], `capture_${Date.now()}.jpg`, {
        type: "image/jpeg",
      });
    } else {
      toast.error("Nenhuma imagem disponível para análise");
      return;
    }

    analyzeImageMutation.mutate({ file, rustColor, backgroundColor });
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setUploadedFile(null);
    setAnalysis(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "inspection":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado";
      case "inspection":
        return "Inspeção";
      case "rejected":
        return "Rejeitado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Captura e Análise"
        description="Capture imagens ou faça upload para análise de corrosão"
      >
        <Button variant="outline" onClick={resetCapture} disabled={!capturedImage}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Limpar
        </Button>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Painel de Captura */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Captura de Imagem</CardTitle>
              <CardDescription>
                Use a câmera ou faça upload de uma imagem para análise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="camera" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Câmera
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                {/* Captura com câmera */}
                <TabsContent value="camera" className="space-y-4">
                  {!capturedImage && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Select
                          value={selectedDevice}
                          onValueChange={setSelectedDevice}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Selecionar câmera" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Câmera padrão</SelectItem>
                          </SelectContent>
                        </Select>

                        {!isRecording ? (
                          <Button onClick={startCamera}>
                            <Play className="h-4 w-4 mr-2" />
                            Iniciar
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button onClick={capturePhoto}>
                              <Camera className="h-4 w-4 mr-2" />
                              Capturar
                            </Button>
                            <Button variant="outline" onClick={stopCamera}>
                              <Square className="h-4 w-4 mr-2" />
                              Parar
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} style={{ display: "none" }} />
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Upload de imagem */}
                <TabsContent value="upload" className="space-y-4">
                  {!capturedImage && (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-primary bg-primary/5"
                          : "border-muted-foreground/25"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">
                        Arraste uma imagem aqui
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Formatos: JPG, PNG, BMP, TIFF
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Preview + Configuração + Analisar */}
              {capturedImage && (
                <div className="mt-6 space-y-4">
                  {/* Configuração de análise */}
                  <div className="space-y-4 border rounded-lg p-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Cor da Ferrugem
                      </label>
                      <Select value={rustColor} onValueChange={setRustColor}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a cor da ferrugem" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vermelha">Vermelha</SelectItem>
                          <SelectItem value="preta">Preta</SelectItem>
                          <SelectItem value="branca">Branca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Cor do Gabarito (Fundo)
                      </label>
                      <Select
                        value={backgroundColor}
                        onValueChange={setBackgroundColor}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a cor do fundo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preto">Preto</SelectItem>
                          <SelectItem value="branco">Branco</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Imagem Capturada</h3>
                    <Button
                      onClick={handleAnalyze}
                      disabled={analyzeImageMutation.isPending}
                      size="sm"
                    >
                      {analyzeImageMutation.isPending ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <Zap className="h-4 w-4 mr-2" />
                      )}
                      Analisar
                    </Button>
                  </div>

                  <div className="relative border rounded-lg overflow-hidden">
                    <img
                      ref={imageRef}
                      src={capturedImage}
                      alt="Captured"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Progress */}
              {analyzeImageMutation.isPending && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm">Analisando imagem...</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Processando algoritmos de detecção de corrosão
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Resultado da Análise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge
                      variant={
                        analysis.status === "approved"
                          ? "default"
                          : analysis.status === "inspection"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {getStatusIcon(analysis.status)}
                      <span className="ml-2">{getStatusText(analysis.status)}</span>
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Corrosão:</span>
                      <span className="text-lg font-bold tabular-nums">
                        {analysis.corrosionPercentage.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Confiança:</span>
                      <span className="text-sm font-medium tabular-nums">
                        {(analysis.confidenceScore * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Pixels corroídos:
                      </span>
                      <span className="text-sm tabular-nums">
                        {analysis.pixelsCorrupted.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Pixels totais:
                      </span>
                      <span className="text-sm tabular-nums">
                        {analysis.pixelsTotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Exibição da cor da ferrugem e do fundo */}
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cor da Ferrugem:</span>
                      <span className="text-sm font-medium capitalize">{rustColor}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cor do Gabarito:</span>
                      <span className="text-sm font-medium capitalize">{backgroundColor}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full" size="sm">
                      Ver Análise Completa
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    Capture ou faça upload de uma imagem para ver os resultados
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
