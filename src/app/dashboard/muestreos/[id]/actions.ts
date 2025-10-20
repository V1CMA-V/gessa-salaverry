'use server'

import { BatchConfig, RollConfig } from '@/types/sampling'
import { createClient } from '@/utils/supabase/server'

export async function getInspectionSamplingData(inspectionId: string) {
  const supabase = await createClient()

  // Obtener datos de la inspección
  const { data: inspection, error } = await supabase
    .from('inspections')
    .select(
      `
      id,
      customer,
      roll_config,
      batch_id (
        id,
        batch_code,
        target_lot_weight_kg,
        target_weight_per_roll_kg
      )
    `
    )
    .eq('id', inspectionId)
    .single()

  console.log('Fetched inspection data:', inspection, error)

  if (error || !inspection) {
    throw new Error('No se pudo obtener la inspección')
  }

  // Normalizar datos
  const batch = Array.isArray(inspection.batch_id)
    ? inspection.batch_id[0]
    : inspection.batch_id

  if (!batch) {
    throw new Error('La inspección no tiene lote asociado')
  }

  // Construir configuración del lote
  const config: BatchConfig = {
    target_lot_weight: batch.target_lot_weight_kg || 1080,
    target_weight_per_roll: batch.target_weight_per_roll_kg || 30,
    roll_config: (inspection.roll_config as RollConfig) || 'doble',
    pallet_target_weight: 1080, // Por defecto
    max_pallets: 4,
  }

  return {
    inspection: {
      id: inspection.id,
      customer: inspection.customer,
    },
    config,
  }
}

export async function saveSamplingSession(
  inspectionId: string,
  sessionData: any
) {
  // Aquí guardarías la sesión en la base de datos
  // Por ahora solo retornamos éxito
  console.log('Saving session for inspection:', inspectionId, sessionData)
  return { success: true }
}
