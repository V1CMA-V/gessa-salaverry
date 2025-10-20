'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface StopStepperProps {
  currentStop: number
  totalStops: number
  onStopChange: (stop: number) => void
  completedStops: number[]
}

export function StopStepper({
  currentStop,
  totalStops,
  onStopChange,
  completedStops,
}: StopStepperProps) {
  const canGoPrevious = currentStop > 1
  const canGoNext = currentStop < totalStops

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onStopChange(currentStop - 1)}
        disabled={!canGoPrevious}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalStops }, (_, i) => i + 1).map((stop) => {
          const isActive = stop === currentStop
          const isCompleted = completedStops.includes(stop)

          return (
            <Button
              key={stop}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStopChange(stop)}
              className={`relative ${
                isCompleted && !isActive
                  ? 'bg-primary/20 hover:bg-primary/30'
                  : ''
              }`}
            >
              {stop}
              {isCompleted && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onStopChange(currentStop + 1)}
        disabled={!canGoNext}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>

      <Badge variant="secondary" className="ml-4">
        Parada {currentStop} de {totalStops}
      </Badge>
    </div>
  )
}
