'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StopData } from '@/types/sampling'
import { RollChip } from './roll-chip'
import { StopProgressBar } from './stop-progress-bar'

interface StopPanelProps {
  stop: StopData
  onUpdateRoll: (rollIndex: number, weight: number) => void
  onConfirmRoll: (rollIndex: number) => void
  onCompleteWithTarget: () => void
}

export function StopPanel({
  stop,
  onUpdateRoll,
  onConfirmRoll,
  onCompleteWithTarget,
}: StopPanelProps) {
  const allConfirmed = stop.rolls.every((r) => r.is_confirmed)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Parada {stop.stop_number}</CardTitle>
          {!allConfirmed && (
            <Button variant="outline" size="sm" onClick={onCompleteWithTarget}>
              Completar con peso objetivo
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <StopProgressBar stop={stop} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stop.rolls.map((roll, index) => (
            <RollChip
              key={roll.roll_number}
              roll={roll}
              targetWeight={stop.target_weight / stop.rolls.length}
              onWeightChange={(weight) => onUpdateRoll(index, weight)}
              onConfirm={() => onConfirmRoll(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
