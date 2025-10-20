'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SamplingSession } from '@/types/sampling'
import { useState } from 'react'
import { PalletRing } from './pallet-ring'
import { StopPanel } from './stop-panel'
import { StopStepper } from './stop-stepper'

interface PalletRunnerProps {
  session: SamplingSession
  onUpdateSession: (session: SamplingSession) => void
}

export function PalletRunner({ session, onUpdateSession }: PalletRunnerProps) {
  const [activePallet, setActivePallet] = useState(1)
  const [activeStop, setActiveStop] = useState(1)

  const currentPallet = session.pallets.find(
    (p) => p.pallet_number === activePallet
  )!

  const currentStop = currentPallet.stops.find(
    (s) => s.stop_number === activeStop
  )!

  const completedStops = currentPallet.stops
    .filter((s) => s.is_complete)
    .map((s) => s.stop_number)

  const handleUpdateRoll = (rollIndex: number, weight: number) => {
    const newSession = { ...session }
    const pallet = newSession.pallets[activePallet - 1]
    const stop = pallet.stops[activeStop - 1]

    stop.rolls[rollIndex].actual_weight = weight
  }

  const handleConfirmRoll = (rollIndex: number) => {
    const newSession = { ...session }
    const pallet = newSession.pallets[activePallet - 1]
    const stop = pallet.stops[activeStop - 1]

    stop.rolls[rollIndex].is_confirmed = true

    // Recalcular peso actual de la parada
    stop.actual_weight = stop.rolls.reduce(
      (sum, roll) => sum + (roll.actual_weight || 0),
      0
    )

    // Verificar si la parada está completa
    stop.is_complete = stop.rolls.every((r) => r.is_confirmed)

    // Recalcular peso actual de la tarima
    pallet.actual_weight = pallet.stops.reduce(
      (sum, s) => sum + s.actual_weight,
      0
    )

    // Recalcular porcentaje de progreso
    pallet.progress_percentage =
      (pallet.actual_weight / pallet.target_weight) * 100

    onUpdateSession(newSession)
  }

  const handleCompleteWithTarget = () => {
    const newSession = { ...session }
    const pallet = newSession.pallets[activePallet - 1]
    const stop = pallet.stops[activeStop - 1]
    const targetPerRoll = stop.target_weight / stop.rolls.length

    stop.rolls.forEach((roll) => {
      if (!roll.is_confirmed) {
        roll.actual_weight = targetPerRoll
        roll.is_confirmed = true
      }
    })

    stop.actual_weight = stop.rolls.reduce(
      (sum, roll) => sum + (roll.actual_weight || 0),
      0
    )
    stop.is_complete = true

    pallet.actual_weight = pallet.stops.reduce(
      (sum, s) => sum + s.actual_weight,
      0
    )
    pallet.progress_percentage =
      (pallet.actual_weight / pallet.target_weight) * 100

    onUpdateSession(newSession)
  }

  return (
    <div className="space-y-6">
      {/* Header con progreso general */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Muestreo en Planta</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activePallet.toString()}
            onValueChange={(v) => {
              setActivePallet(parseInt(v))
              setActiveStop(1)
            }}
          >
            <TabsList className="grid w-full grid-cols-4">
              {session.pallets.map((pallet) => (
                <TabsTrigger
                  key={pallet.pallet_number}
                  value={pallet.pallet_number.toString()}
                >
                  Tarima {pallet.pallet_number}
                </TabsTrigger>
              ))}
            </TabsList>

            {session.pallets.map((pallet) => (
              <TabsContent
                key={pallet.pallet_number}
                value={pallet.pallet_number.toString()}
                className="space-y-6"
              >
                {/* Progreso de tarima */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <PalletRing
                      progress={pallet.progress_percentage}
                      current={pallet.actual_weight}
                      target={pallet.target_weight}
                      size={100}
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          Parada {activeStop}/{pallet.stops.length}
                        </Badge>
                        <Badge variant="outline">
                          {pallet.actual_weight.toFixed(1)} /{' '}
                          {pallet.target_weight} kg
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Paradas completadas:{' '}
                        {pallet.stops.filter((s) => s.is_complete).length} /{' '}
                        {pallet.stops.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stepper de paradas */}
                <StopStepper
                  currentStop={activeStop}
                  totalStops={pallet.stops.length}
                  onStopChange={setActiveStop}
                  completedStops={completedStops}
                />

                {/* Panel de la parada actual */}
                <StopPanel
                  stop={currentStop}
                  onUpdateRoll={handleUpdateRoll}
                  onConfirmRoll={handleConfirmRoll}
                  onCompleteWithTarget={handleCompleteWithTarget}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
