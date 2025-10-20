// Tipos para el sistema de muestreo

export type RollConfig = 'single' | 'doble' | 'triple' | 'cuadruple'

export interface BatchConfig {
  target_lot_weight: number // kg
  target_weight_per_roll: number // kg
  roll_config: RollConfig
  pallet_target_weight: number // kg
  max_pallets: number
}

export interface CalculatedMetrics {
  rolls_per_stop: number
  stop_capacity_kg: number
  stops_per_pallet: number
  rolls_per_pallet: number
  pallets_needed: number
}

export interface RollData {
  roll_number: number
  actual_weight: number | null
  is_confirmed: boolean
}

export interface StopData {
  stop_number: number
  rolls: RollData[]
  target_weight: number
  actual_weight: number
  is_complete: boolean
}

export interface PalletData {
  pallet_number: number
  stops: StopData[]
  target_weight: number
  actual_weight: number
  progress_percentage: number
}

export interface SamplingSession {
  inspection_id: string
  config: BatchConfig
  metrics: CalculatedMetrics
  pallets: PalletData[]
  current_pallet: number
  current_stop: number
  mode: 'plan' | 'run'
}

// Función para obtener rollos por parada según configuración
export function getRollsPerStop(config: RollConfig): number {
  const mapping: Record<RollConfig, number> = {
    single: 2,
    doble: 4,
    triple: 6,
    cuadruple: 8,
  }
  return mapping[config] || 4
}

// Función para calcular métricas
export function calculateMetrics(config: BatchConfig): CalculatedMetrics {
  const rolls_per_stop = getRollsPerStop(config.roll_config)
  const stop_capacity_kg = rolls_per_stop * config.target_weight_per_roll
  const stops_per_pallet = Math.ceil(
    config.pallet_target_weight / stop_capacity_kg
  )
  const rolls_per_pallet = stops_per_pallet * rolls_per_stop
  const pallets_needed = Math.ceil(
    config.target_lot_weight / config.pallet_target_weight
  )

  return {
    rolls_per_stop,
    stop_capacity_kg,
    stops_per_pallet,
    rolls_per_pallet,
    pallets_needed: Math.min(pallets_needed, config.max_pallets),
  }
}

// Función para inicializar una sesión de muestreo
export function initializeSamplingSession(
  inspection_id: string,
  config: BatchConfig
): SamplingSession {
  const metrics = calculateMetrics(config)
  const pallets: PalletData[] = []

  for (let p = 1; p <= metrics.pallets_needed; p++) {
    const stops: StopData[] = []
    let rollCounter = (p - 1) * metrics.rolls_per_pallet + 1

    for (let s = 1; s <= metrics.stops_per_pallet; s++) {
      const rolls: RollData[] = []

      for (let r = 0; r < metrics.rolls_per_stop; r++) {
        rolls.push({
          roll_number: rollCounter++,
          actual_weight: null,
          is_confirmed: false,
        })
      }

      // Calcular peso objetivo de esta parada (puede ser residual en la última)
      const remaining =
        config.pallet_target_weight - (s - 1) * metrics.stop_capacity_kg
      const target_weight = Math.min(remaining, metrics.stop_capacity_kg)

      stops.push({
        stop_number: s,
        rolls,
        target_weight,
        actual_weight: 0,
        is_complete: false,
      })
    }

    pallets.push({
      pallet_number: p,
      stops,
      target_weight: config.pallet_target_weight,
      actual_weight: 0,
      progress_percentage: 0,
    })
  }

  return {
    inspection_id,
    config,
    metrics,
    pallets,
    current_pallet: 1,
    current_stop: 1,
    mode: 'plan',
  }
}
