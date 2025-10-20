'use client'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { StopData } from '@/types/sampling'

interface StopProgressBarProps {
  stop: StopData
}

export function StopProgressBar({ stop }: StopProgressBarProps) {
  const progress = (stop.actual_weight / stop.target_weight) * 100
  const confirmedRolls = stop.rolls.filter((r) => r.is_confirmed).length
  const totalRolls = stop.rolls.length
  const exceeds = stop.actual_weight > stop.target_weight

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          Progreso de Parada {stop.stop_number}
        </div>
        <Badge variant={exceeds ? 'destructive' : 'secondary'}>
          {stop.actual_weight.toFixed(1)} / {stop.target_weight} kg
        </Badge>
      </div>

      <Progress value={Math.min(progress, 100)} className="h-2" />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Rollos confirmados: {confirmedRolls}/{totalRolls}
        </span>
        <span>{progress.toFixed(0)}%</span>
      </div>

      {exceeds && (
        <div className="text-xs text-destructive">
          ⚠️ Peso excede el objetivo de la parada
        </div>
      )}
    </div>
  )
}
