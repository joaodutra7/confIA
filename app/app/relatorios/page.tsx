"use client";

import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Chart } from "react-google-charts";

export default function RelatoriosPage() {
  // Mock data - futuramente pode vir da API
  const corrosaoAoLongoDoTempo = [
    ["Data", "Corrosão (%)"],
    ["2025-09-01", 12.5],
    ["2025-09-05", 22.3],
    ["2025-09-10", 35.8],
    ["2025-09-15", 48.1],
    ["2025-09-20", 67.4],
  ];

  const distribuicaoStatus = [
    ["Status", "Quantidade"],
    ["Aprovado", 45],
    ["Inspeção", 30],
    ["Rejeitado", 25],
  ];

  const corrosaoPorLote = [
    ["Lote", "Corrosão (%)"],
    ["Lote 1", 15.2],
    ["Lote 2", 33.1],
    ["Lote 3", 54.7],
    ["Lote 4", 21.4],
    ["Lote 5", 62.9],
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios"
        description="Visualize relatórios e métricas de corrosão relevantes para a produção"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gráfico de linha */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução da Corrosão</CardTitle>
            <CardDescription>
              Percentual médio de corrosão detectado ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              chartType="LineChart"
              width="100%"
              height="300px"
              data={corrosaoAoLongoDoTempo}
              options={{
                curveType: "function",
                legend: { position: "bottom" },
                hAxis: { title: "Data" },
                vAxis: { title: "Corrosão (%)" },
                colors: ["#d9534f"],
              }}
            />
          </CardContent>
        </Card>

        {/* Gráfico de pizza */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Status</CardTitle>
            <CardDescription>
              Quantidade de peças por status de inspeção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              chartType="PieChart"
              width="100%"
              height="300px"
              data={distribuicaoStatus}
              options={{
                is3D: true,
                slices: {
                  0: { color: "#0C305F" },
                  1: { color: "#E30613" },
                  2: { color: "#999999" },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de barras */}
      <Card>
        <CardHeader>
          <CardTitle>Corrosão por Lote</CardTitle>
          <CardDescription>
            Comparativo do percentual médio de corrosão entre lotes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="350px"
            data={corrosaoPorLote}
            options={{
              legend: { position: "none" },
              hAxis: { title: "Lotes" },
              vAxis: { title: "Corrosão (%)" },
              colors: ["#0275d8"],
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
