'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { StopData } from '@/types/sampling'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

interface PalletStackedBarProps {
  stops: StopData[]
}

export function PalletStackedBar({ stops }: PalletStackedBarProps) {
  const chartData = stops.map((stop) => {
    const rollStart = stop.rolls[0]?.roll_number || 0
    const rollEnd = stop.rolls[stop.rolls.length - 1]?.roll_number || 0
    const progress = (stop.actual_weight / stop.target_weight) * 100

    return {
      stop: `P${stop.stop_number}`,
      actual: stop.actual_weight,
      remaining: Math.max(0, stop.target_weight - stop.actual_weight),
      target: stop.target_weight,
      rollRange: `${rollStart}-${rollEnd}`,
      isComplete: stop.is_complete,
      progress: Math.min(progress, 100),
    }
  })

  const chartConfig = {
    actual: {
      label: 'Completado',
      color: 'var(--chart-1)',
    },
    remaining: {
      label: 'Pendiente',
      color: 'var(--chart-5)',
    },
  } satisfies ChartConfig

  return (
    <div className="space-y-2">
      <ChartContainer config={chartConfig} className="h-[80px] w-full">
        <BarChart data={chartData} layout="vertical" margin={{ left: 0 }}>
          <CartesianGrid horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            dataKey="stop"
            type="category"
            tickLine={false}
            axisLine={false}
            width={30}
            fontSize={11}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(value, payload) => {
                  const data = payload[0]?.payload
                  return `Parada ${data?.stop} • Rollos ${data?.rollRange}`
                }}
                formatter={(value, name) => {
                  return [
                    `${Number(value).toFixed(1)} kg`,
                    name === 'actual' ? 'Completado' : 'Pendiente',
                  ]
                }}
              />
            }
          />
          <Bar
            dataKey="actual"
            stackId="a"
            fill="var(--color-actual)"
            radius={[0, 4, 4, 0]}
          />
          <Bar
            dataKey="remaining"
            stackId="a"
            fill="var(--color-remaining)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
      <div className="flex items-center gap-3 text-xs text-muted-foreground justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--chart-1)]" />
          <span>Completado</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--chart-5)]" />
          <span>Pendiente</span>
        </div>
      </div>
    </div>
  )
}
