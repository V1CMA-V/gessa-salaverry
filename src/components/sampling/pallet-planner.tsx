'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SamplingSession } from '@/types/sampling'
import { LayersIcon, PackageIcon } from 'lucide-react'
import { PalletCard } from './pallet-card'
import { PalletsOverviewChart } from './pallets-overview-chart'
import { SamplingMetricsRadial } from './sampling-metrics-radial'

interface PalletPlannerProps {
  session: SamplingSession
}

export function PalletPlanner({ session }: PalletPlannerProps) {
  const { config, metrics, pallets } = session

  const totalPlannedRolls = metrics.rolls_per_pallet * metrics.pallets_needed
  const totalPlannedWeight = config.target_lot_weight

  return (
    <div className="space-y-6">
      {/* Resumen general */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Plan de Muestreo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PackageIcon className="h-4 w-4" />
                <span>Rollos por Tarima</span>
              </div>
              <div className="text-2xl font-bold">
                {metrics.rolls_per_pallet}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LayersIcon className="h-4 w-4" />
                <span>Total de Tarimas</span>
              </div>
              <div className="text-2xl font-bold">{metrics.pallets_needed}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Total Planeado (Rollos)
              </div>
              <div className="text-2xl font-bold">{totalPlannedRolls}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Total Planeado (Peso)
              </div>
              <div className="text-2xl font-bold">{totalPlannedWeight} kg</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">Configuración: {config.roll_config}</Badge>
            <Badge variant="outline">
              {metrics.rolls_per_stop} rollos/parada
            </Badge>
            <Badge variant="outline">
              {metrics.stop_capacity_kg} kg/parada
            </Badge>
            <Badge variant="outline">
              {metrics.stops_per_pallet} paradas/tarima
            </Badge>
            <Badge variant="outline">
              {config.target_weight_per_roll} kg/rollo
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de métricas y vista general */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SamplingMetricsRadial config={config} metrics={metrics} />
        <PalletsOverviewChart pallets={pallets} />
      </div>

      {/* Grid de tarimas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pallets.map((pallet) => (
          <PalletCard key={pallet.pallet_number} pallet={pallet} mode="plan" />
        ))}
      </div>
    </div>
  )
}
