"use client";

import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockAnalises = [
  {
    id: "ANL-001",
    data: "2025-09-20",
    corrosao: 12.5,
    lote: "L001",
  },
  {
    id: "ANL-002",
    data: "2025-09-21",
    corrosao: 34.2,
    lote: "L002",
  },
  {
    id: "ANL-003",
    data: "2025-09-22",
    corrosao: 67.8,
    lote: "L001",
  },
];

export default function AnalisesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Análises"
        description="Histórico de análises realizadas com seus respectivos resultados"
      >
        <Button variant="outline">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Filtrar por data
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Análises</CardTitle>
          <CardDescription>Veja o histórico completo das análises realizadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input placeholder="Buscar por ID, lote ou data..." className="max-w-sm" />
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>% Corrosão</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAnalises.map((analise) => (
                  <TableRow key={analise.id}>
                    <TableCell>{analise.id}</TableCell>
                    <TableCell>{analise.data}</TableCell>
                    <TableCell>{analise.corrosao.toFixed(1)}%</TableCell>
                    <TableCell>{analise.lote}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Ver Detalhes
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
