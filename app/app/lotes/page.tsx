"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
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

type Lote = {
  id: string;
  nome: string;
  data: string;
  status: "ativo" | "encerrado" | "pendente";
};

const mockLotes: Lote[] = [
  { id: "L001", nome: "Lote Linha 1", data: "2025-09-01", status: "ativo" },
  { id: "L002", nome: "Lote Linha 2", data: "2025-09-05", status: "pendente" },
  { id: "L003", nome: "Lote Linha 3", data: "2025-09-10", status: "encerrado" },
];

export default function LotesPage() {
  const [lotes, setLotes] = useState<Lote[]>(mockLotes);

  // Estado para o formulário
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState<Lote["status"]>("pendente");

  const getStatusBadge = (status: Lote["status"]) => {
    switch (status) {
      case "ativo":
        return <Badge variant="default">Ativo</Badge>;
      case "pendente":
        return <Badge variant="secondary">Pendente</Badge>;
      case "encerrado":
        return <Badge variant="outline">Encerrado</Badge>;
    }
  };

  const handleAddLote = () => {
    if (!nome || !data) return;

    const novo: Lote = {
      id: `L${String(lotes.length + 1).padStart(3, "0")}`,
      nome,
      data,
      status,
    };

    setLotes((prev) => [...prev, novo]);
    setNome("");
    setData("");
    setStatus("pendente");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lotes"
        description="Gerencie os lotes cadastrados para análise"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Lote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Lote</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar um novo lote
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Lote Linha 4"
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
                <Label>Status</Label>
                <Select value={status} onValueChange={(val: Lote["status"]) => setStatus(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="encerrado">Encerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleAddLote}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Lotes</CardTitle>
          <CardDescription>Visualize e gerencie todos os lotes existentes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barra de busca */}
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar lote por ID ou nome..." className="max-w-sm" />
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
                  <TableHead>Nome</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lotes.map((lote) => (
                  <TableRow key={lote.id}>
                    <TableCell>{lote.id}</TableCell>
                    <TableCell>{lote.nome}</TableCell>
                    <TableCell>{lote.data}</TableCell>
                    <TableCell>{getStatusBadge(lote.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Detalhes
                      </Button>
                    </TableCell>
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
