// Configuración de ejemplo para pruebas y desarrollo

import { BatchConfig } from '@/types/sampling'

// Ejemplo 1: Configuración Doble Estándar
export const exampleConfigDoble: BatchConfig = {
  target_lot_weight: 1080, // kg
  target_weight_per_roll: 30, // kg
  roll_config: 'doble',
  pallet_target_weight: 1080, // kg
  max_pallets: 4,
}

// Resultados calculados:
// - Rollos por parada: 4
// - Capacidad por parada: 120 kg
// - Paradas por tarima: 9
// - Rollos por tarima: 36
// - Tarimas necesarias: 1

// Ejemplo 2: Configuración Triple
export const exampleConfigTriple: BatchConfig = {
  target_lot_weight: 2160, // kg
  target_weight_per_roll: 30, // kg
  roll_config: 'triple',
  pallet_target_weight: 1080, // kg
  max_pallets: 4,
}

// Resultados calculados:
// - Rollos por parada: 6
// - Capacidad por parada: 180 kg
// - Paradas por tarima: 6
// - Rollos por tarima: 36
// - Tarimas necesarias: 2

// Ejemplo 3: Configuración Cuadruple
export const exampleConfigCuadruple: BatchConfig = {
  target_lot_weight: 4320, // kg
  target_weight_per_roll: 30, // kg
  roll_config: 'cuadruple',
  pallet_target_weight: 1080, // kg
  max_pallets: 4,
}

// Resultados calculados:
// - Rollos por parada: 8
// - Capacidad por parada: 240 kg
// - Paradas por tarima: 5 (residual en última)
// - Rollos por tarima: 40
// - Tarimas necesarias: 4

// Ejemplo 4: Configuración Single (producción pequeña)
export const exampleConfigSingle: BatchConfig = {
  target_lot_weight: 540, // kg
  target_weight_per_roll: 30, // kg
  roll_config: 'single',
  pallet_target_weight: 540, // kg
  max_pallets: 4,
}

// Resultados calculados:
// - Rollos por parada: 2
// - Capacidad por parada: 60 kg
// - Paradas por tarima: 9
// - Rollos por tarima: 18
// - Tarimas necesarias: 1
