'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PalletData } from '@/types/sampling'
import { PalletRing } from './pallet-ring'
import { PalletStackedBar } from './pallet-stacked-bar'

interface PalletCardProps {
  pallet: PalletData
  mode: 'plan' | 'run'
}

export function PalletCard({ pallet, mode }: PalletCardProps) {
  const {
    pallet_number,
    target_weight,
    actual_weight,
    progress_percentage,
    stops,
  } = pallet

  const totalStops = stops.length
  const completedStops = stops.filter((s) => s.is_complete).length
  const rollsPerStop = stops[0]?.rolls.length || 0
  const stopCapacity = stops[0]?.target_weight || 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Tarima {pallet_number}</CardTitle>
          <Badge variant="secondary">
            {actual_weight.toFixed(1)} / {target_weight} kg
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Donut Chart */}
        <div className="flex justify-center">
          <PalletRing
            progress={progress_percentage}
            current={actual_weight}
            target={target_weight}
            size={140}
          />
        </div>

        {/* Chips informativos */}
        <div className="flex flex-wrap gap-2 justify-center text-sm">
          <Badge variant="outline">
            Paradas: {completedStops}/{totalStops}
          </Badge>
          <Badge variant="outline">Capacidad: {stopCapacity} kg/parada</Badge>
          <Badge variant="outline">Rollos: {rollsPerStop}/parada</Badge>
        </div>

        {/* Barra apilada */}
        <PalletStackedBar stops={stops} />
      </CardContent>
    </Card>
  )
}
