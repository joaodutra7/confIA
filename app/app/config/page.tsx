"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ConfiguracoesPage() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [tema, setTema] = useState("claro");
  const [limiteCorrosao, setLimiteCorrosao] = useState(30);

  const handleSalvar = () => {
    console.log("Configurações salvas:", {
      notificacoes,
      tema,
      limiteCorrosao,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Ajuste parâmetros e preferências do sistema"
      />

      {/* Preferências gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Preferências Gerais</CardTitle>
          <CardDescription>
            Configure opções de exibição e notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="notificacoes">Notificações por e-mail</Label>
            <Switch
              id="notificacoes"
              checked={notificacoes}
              onCheckedChange={setNotificacoes}
            />
          </div>
        </CardContent>
      </Card>

      {/* Parâmetros de análise */}
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros de Análise</CardTitle>
          <CardDescription>
            Defina limites e padrões para a inspeção de corrosão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2 max-w-sm">
            <Label htmlFor="limiteCorrosao">
              Limite de corrosão aceitável (%) 
            </Label>
            <Input
              type="number"
              id="limiteCorrosao"
              value={limiteCorrosao}
              onChange={(e) => setLimiteCorrosao(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Acima deste valor, a peça será marcada como <strong>Rejeitada</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex justify-end">
        <Button onClick={handleSalvar}>Salvar Alterações</Button>
      </div>
    </div>
  );
}
