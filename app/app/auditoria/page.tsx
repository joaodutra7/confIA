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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Auditoria = {
  id: string;
  usuario: string;
  acao: string;
  data: string;
  resultado: "sucesso" | "falha";
};

const mockAuditorias: Auditoria[] = [
  { id: "A001", usuario: "Carlos", acao: "Login no sistema", data: "2025-09-01 08:12", resultado: "sucesso" },
  { id: "A002", usuario: "Ana", acao: "Análise de corrosão no lote L001", data: "2025-09-01 09:45", resultado: "sucesso" },
  { id: "A003", usuario: "Marcos", acao: "Tentativa de acesso não autorizado", data: "2025-09-02 10:30", resultado: "falha" },
  { id: "A004", usuario: "Fernanda", acao: "Cadastro de novo lote", data: "2025-09-03 14:20", resultado: "sucesso" },
  { id: "A005", usuario: "Roberto", acao: "Exclusão de calibração C002", data: "2025-09-04 16:55", resultado: "sucesso" },
];

export default function AuditoriaPage() {
  const [auditorias] = useState<Auditoria[]>(mockAuditorias);

  const getBadge = (resultado: Auditoria["resultado"]) => {
    return resultado === "sucesso" ? (
      <Badge variant="default">Sucesso</Badge>
    ) : (
      <Badge variant="destructive">Falha</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auditoria"
        description="Rastreie as ações realizadas no sistema para garantir conformidade e segurança"
      />

      <Card>
        <CardHeader>
          <CardTitle>Registro de Auditoria</CardTitle>
          <CardDescription>
            Histórico de ações executadas pelos usuários
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barra de busca */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar por usuário ou ação..."
              className="max-w-sm"
            />
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          {/* Tabela */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Resultado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditorias.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.id}</TableCell>
                    <TableCell>{a.usuario}</TableCell>
                    <TableCell>{a.acao}</TableCell>
                    <TableCell>{a.data}</TableCell>
                    <TableCell>{getBadge(a.resultado)}</TableCell>
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
