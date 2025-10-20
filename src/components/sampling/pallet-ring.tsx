'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { RadialBar, RadialBarChart } from 'recharts'

interface PalletRingProps {
  progress: number // 0-100
  current: number
  target: number
  size?: number
}

export function PalletRing({
  progress,
  current,
  target,
  size = 120,
}: PalletRingProps) {
  const chartData = [
    {
      name: 'progress',
      value: Math.min(progress, 100),
      fill: 'var(--chart-1)',
    },
  ]

  const chartConfig = {
    value: {
      label: 'Progreso',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ChartContainer config={chartConfig} className="mx-auto">
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={450}
          innerRadius={size * 0.35}
          outerRadius={size * 0.45}
          width={size}
          height={size}
        >
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value) => `${value}%`}
              />
            }
          />
          <RadialBar dataKey="value" background cornerRadius={10} />
        </RadialBarChart>
      </ChartContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{progress.toFixed(0)}%</div>
        <div className="text-xs text-muted-foreground">
          {current.toFixed(0)} kg
        </div>
      </div>
    </div>
  )
}
