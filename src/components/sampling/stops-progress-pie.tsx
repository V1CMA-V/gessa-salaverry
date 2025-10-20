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
import { StopData } from '@/types/sampling'
import { Cell, Legend, Pie, PieChart } from 'recharts'

interface StopsProgressPieProps {
  stops: StopData[]
  palletNumber: number
}

export function StopsProgressPie({
  stops,
  palletNumber,
}: StopsProgressPieProps) {
  const completeStops = stops.filter((s) => s.is_complete).length
  const partialStops = stops.filter(
    (s) => !s.is_complete && s.actual_weight > 0
  ).length
  const pendingStops = stops.filter((s) => s.actual_weight === 0).length

  const chartData = [
    {
      name: 'Completadas',
      value: completeStops,
      fill: 'var(--chart-1)',
    },
    {
      name: 'En Progreso',
      value: partialStops,
      fill: 'var(--chart-2)',
    },
    {
      name: 'Pendientes',
      value: pendingStops,
      fill: 'var(--chart-5)',
    },
  ].filter((item) => item.value > 0)

  const chartConfig = {
    value: {
      label: 'Paradas',
    },
    Completadas: {
      label: 'Completadas',
      color: 'var(--chart-1)',
    },
    'En Progreso': {
      label: 'En Progreso',
      color: 'var(--chart-2)',
    },
    Pendientes: {
      label: 'Pendientes',
      color: 'var(--chart-5)',
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Paradas - Tarima {palletNumber}</CardTitle>
        <CardDescription>Distribución de paradas por estado</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => {
                    return [
                      `${value} parada${Number(value) !== 1 ? 's' : ''}`,
                      name,
                    ]
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => {
                const count = entry.payload.value
                return `${value}: ${count}`
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
