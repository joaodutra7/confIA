"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Calibracao = {
  id: string;
  equipamento: string;
  data: string;
  responsavel: string;
  status: "concluída" | "pendente" | "atrasada";
};

const mockCalibracoes: Calibracao[] = [
  { id: "C001", equipamento: "Câmera Industrial A1", data: "2025-09-01", responsavel: "Carlos Silva", status: "concluída" },
  { id: "C002", equipamento: "Sensor Óptico B2", data: "2025-09-10", responsavel: "Ana Paula", status: "pendente" },
  { id: "C003", equipamento: "Microscópio Digital C3", data: "2025-08-20", responsavel: "Roberto Lima", status: "atrasada" },
];

export default function CalibracaoPage() {
  const [calibracoes, setCalibracoes] = useState<Calibracao[]>(mockCalibracoes);

  // estados do formulário
  const [equipamento, setEquipamento] = useState("");
  const [data, setData] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [status, setStatus] = useState<Calibracao["status"]>("pendente");

  const getStatusBadge = (status: Calibracao["status"]) => {
    switch (status) {
      case "concluída":
        return <Badge variant="default">Concluída</Badge>;
      case "pendente":
        return <Badge variant="secondary">Pendente</Badge>;
      case "atrasada":
        return <Badge variant="destructive">Atrasada</Badge>;
    }
  };

  const handleAddCalibracao = () => {
    if (!equipamento || !data || !responsavel) return;

    const nova: Calibracao = {
      id: `C${String(calibracoes.length + 1).padStart(3, "0")}`,
      equipamento,
      data,
      responsavel,
      status,
    };

    setCalibracoes((prev) => [...prev, nova]);
    setEquipamento("");
    setData("");
    setResponsavel("");
    setStatus("pendente");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calibração"
        description="Gerencie as calibrações dos equipamentos de análise de corrosão"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Calibração
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Calibração</DialogTitle>
              <DialogDescription>
                Preencha os dados da calibração do equipamento
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="equipamento">Equipamento</Label>
                <Input
                  id="equipamento"
                  value={equipamento}
                  onChange={(e) => setEquipamento(e.target.value)}
                  placeholder="Ex: Câmera Industrial A1"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  type="date"
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  placeholder="Nome do responsável"
                />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={(val: Calibracao["status"]) => setStatus(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concluída">Concluída</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="atrasada">Atrasada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleAddCalibracao}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Calibrações</CardTitle>
          <CardDescription>Registros de calibrações realizadas e pendentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calibracoes.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.equipamento}</TableCell>
                    <TableCell>{c.data}</TableCell>
                    <TableCell>{c.responsavel}</TableCell>
                    <TableCell>{getStatusBadge(c.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
