'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RollData } from '@/types/sampling'
import { AlertTriangleIcon, CheckIcon } from 'lucide-react'
import { useState } from 'react'

interface RollChipProps {
  roll: RollData
  targetWeight: number
  onWeightChange: (weight: number) => void
  onConfirm: () => void
}

export function RollChip({
  roll,
  targetWeight,
  onWeightChange,
  onConfirm,
}: RollChipProps) {
  const [weight, setWeight] = useState(roll.actual_weight ?? targetWeight)

  const deviation = weight
    ? Math.abs((weight - targetWeight) / targetWeight) * 100
    : 0
  const hasWarning = deviation > 10 // Más del 10% de desviación

  const handleConfirm = () => {
    onWeightChange(weight)
    onConfirm()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm()
    }
  }

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
        roll.is_confirmed
          ? 'bg-primary/5 border-primary'
          : hasWarning
          ? 'bg-amber-500/5 border-amber-500'
          : 'bg-muted/50 border-muted'
      }`}
    >
      <Badge variant={roll.is_confirmed ? 'default' : 'outline'}>
        Rollo {roll.roll_number}
      </Badge>

      <Input
        type="number"
        value={weight}
        onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
        onKeyPress={handleKeyPress}
        disabled={roll.is_confirmed}
        className="w-24 h-8"
        step="0.1"
      />

      <span className="text-sm text-muted-foreground">kg</span>

      {!roll.is_confirmed ? (
        <Button
          size="sm"
          variant="ghost"
          onClick={handleConfirm}
          className="h-8 w-8 p-0"
        >
          <CheckIcon className="h-4 w-4" />
        </Button>
      ) : (
        <CheckIcon className="h-4 w-4 text-primary" />
      )}

      {hasWarning && !roll.is_confirmed && (
        <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
      )}
    </div>
  )
}
