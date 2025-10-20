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
import { BatchConfig, CalculatedMetrics } from '@/types/sampling'
import { PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

interface SamplingMetricsRadialProps {
  config: BatchConfig
  metrics: CalculatedMetrics
}

export function SamplingMetricsRadial({
  config,
  metrics,
}: SamplingMetricsRadialProps) {
  // Crear datos para el radial chart
  const maxValue = Math.max(
    metrics.rolls_per_stop,
    metrics.stops_per_pallet,
    metrics.pallets_needed,
    metrics.stop_capacity_kg / 20 // Escalar para visualización
  )

  const chartData = [
    {
      name: 'Tarimas',
      value: metrics.pallets_needed,
      fill: 'var(--chart-1)',
    },
    {
      name: 'Paradas/Tarima',
      value: metrics.stops_per_pallet,
      fill: 'var(--chart-2)',
    },
    {
      name: 'Rollos/Parada',
      value: metrics.rolls_per_stop,
      fill: 'var(--chart-3)',
    },
    {
      name: 'Capacidad (kg/20)',
      value: Math.round(metrics.stop_capacity_kg / 20),
      fill: 'var(--chart-4)',
    },
  ]

  const chartConfig = {
    value: {
      label: 'Valor',
    },
    Tarimas: {
      label: 'Tarimas',
      color: 'var(--chart-1)',
    },
    'Paradas/Tarima': {
      label: 'Paradas por Tarima',
      color: 'var(--chart-2)',
    },
    'Rollos/Parada': {
      label: 'Rollos por Parada',
      color: 'var(--chart-3)',
    },
    'Capacidad (kg/20)': {
      label: 'Capacidad por Parada',
      color: 'var(--chart-4)',
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas de Configuración</CardTitle>
        <CardDescription>
          Distribución de recursos por configuración {config.roll_config}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
            innerRadius={30}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[36, 24]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              {/* <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {config.roll_config}
                        </tspan>
                      </text>
                    )
                  }
                }}
              /> */}
            </PolarRadiusAxis>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => {
                    const label = name as string
                    if (label.includes('Capacidad')) {
                      return [
                        `${metrics.stop_capacity_kg} kg`,
                        'Capacidad/Parada',
                      ]
                    }
                    return [value, name]
                  }}
                />
              }
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-[var(--chart-1)]">
              {metrics.pallets_needed}
            </div>
            <div className="text-xs text-muted-foreground">Tarimas</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-[var(--chart-2)]">
              {metrics.stops_per_pallet}
            </div>
            <div className="text-xs text-muted-foreground">Paradas/Tarima</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-[var(--chart-3)]">
              {metrics.rolls_per_stop}
            </div>
            <div className="text-xs text-muted-foreground">Rollos/Parada</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-[var(--chart-4)]">
              {metrics.stop_capacity_kg}
            </div>
            <div className="text-xs text-muted-foreground">kg/Parada</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
