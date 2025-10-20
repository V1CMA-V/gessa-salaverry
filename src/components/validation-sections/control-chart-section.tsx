'use client'

import * as React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface ControlChartSectionProps {
  value?: number[][]
}

export function ControlChartSection({ value = [] }: ControlChartSectionProps) {
  // Transformar los datos de la matriz a formato de gráfico
  const chartData = React.useMemo(() => {
    if (!value || value.length === 0) return []

    // Transponer la matriz: cada columna (parámetro) se convierte en una serie
    const numParams = value[0]?.length || 8
    const data = []

    // Crear un punto de datos por cada posición (fila)
    for (let posIdx = 0; posIdx < value.length; posIdx++) {
      const dataPoint: any = {
        position: `Pos ${posIdx + 1}`,
      }

      // Agregar cada parámetro (columna) como una serie
      for (let paramIdx = 0; paramIdx < numParams; paramIdx++) {
        dataPoint[`param${paramIdx + 1}`] = value[posIdx][paramIdx] || 0
      }

      data.push(dataPoint)
    }

    return data
  }, [value])

  // Configuración del gráfico con colores para cada parámetro
  const chartConfig = React.useMemo(() => {
    const colors = [
      'var(--chart-1)',
      'var(--chart-2)',
      'var(--chart-3)',
      'var(--chart-4)',
      'var(--chart-5)',
      'hsl(210, 100%, 50%)',
      'hsl(280, 100%, 50%)',
      'hsl(340, 100%, 50%)',
    ]

    const config: ChartConfig = {
      values: {
        label: 'Mediciones',
      },
    }

    for (let i = 1; i <= 8; i++) {
      config[`param${i}`] = {
        label: `Parámetro ${i}: `,
        color: colors[i - 1],
      }
    }

    return config
  }, [])

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle>Gráfico de Control</CardTitle>
          <CardDescription>
            Mediciones de calibre por posición y parámetro
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={chartData}>
            {/* <defs>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <linearGradient
                  key={`gradient${i}`}
                  id={`fillParam${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-param${i})`}
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-param${i})`}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              ))}
            </defs> */}
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="position"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['auto', 'auto']}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Line
                key={`param${i}`}
                dataKey={`param${i}`}
                type="monotone"
                // fill={`url(#fillParam${i})`}
                stroke={`var(--color-param${i})`}
                strokeWidth={2}
                // fillOpacity={0.4}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
