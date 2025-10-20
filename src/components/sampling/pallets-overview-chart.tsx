'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { PalletData } from '@/types/sampling'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'

interface PalletsOverviewChartProps {
  pallets: PalletData[]
}

export function PalletsOverviewChart({ pallets }: PalletsOverviewChartProps) {
  const chartData = pallets.map((pallet) => ({
    pallet: `Tarima ${pallet.pallet_number}`,
    actual: pallet.actual_weight,
    target: pallet.target_weight,
    progress: pallet.progress_percentage,
    stopsComplete: pallet.stops.filter((s) => s.is_complete).length,
    stopsTotal: pallet.stops.length,
  }))

  const chartConfig = {
    actual: {
      label: 'Peso Actual',
      color: 'var(--chart-1)',
    },
    target: {
      label: 'Objetivo',
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig

  const getBarColor = (progress: number) => {
    if (progress >= 100) return 'var(--chart-1)' // Verde - Completo
    if (progress >= 50) return 'var(--chart-2)' // Amarillo - En progreso
    if (progress > 0) return 'var(--chart-4)' // Naranja - Iniciado
    return 'var(--chart-5)' // Gris - Pendiente
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista General de Tarimas</CardTitle>
        <CardDescription>
          Progreso de peso por tarima vs objetivo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="pallet"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value, payload) => {
                    const data = payload[0]?.payload
                    return `${value} • ${data?.stopsComplete}/${data?.stopsTotal} paradas`
                  }}
                  formatter={(value, name) => {
                    return [
                      `${Number(value).toFixed(1)} kg`,
                      name === 'actual' ? 'Peso Actual' : 'Objetivo',
                    ]
                  }}
                />
              }
            />
            <Bar dataKey="actual" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.progress)}
                />
              ))}
            </Bar>
            <Bar
              dataKey="target"
              fill="var(--color-target)"
              opacity={0.2}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[var(--chart-1)]" />
            <span>Completo (100%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[var(--chart-2)]" />
            <span>Avanzado (≥50%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[var(--chart-4)]" />
            <span>Iniciado (&gt;0%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[var(--chart-5)]" />
            <span>Pendiente</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[var(--chart-3)] opacity-20" />
            <span>Objetivo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
