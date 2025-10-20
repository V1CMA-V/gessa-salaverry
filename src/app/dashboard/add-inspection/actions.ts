'use server'

import { createClient } from '@/utils/supabase/server'

export async function newBatch(formData: FormData) {
  const supabase = await createClient()

  // Transformar FormData a objeto con tipos correctos
  const batchData = {
    batch_code: formData.get('batch_code') as string,
    production_date: formData.get('production_date') as string,
    notes: formData.get('notes') as string,
    target_lot_weight_kg: Number(formData.get('target_lot_weight_kg')),
    target_weight_per_roll_kg: Number(formData.get('target_weight_per_r')),
  }

  const { data, error } = await supabase
    .from('batches')
    .insert(batchData)
    .select('id, batch_code')
    .single()

  if (error) {
    console.error('Error creating batch:', error)
    throw new Error('Error al crear el lote')
  }

  return { success: true, batch: data }
}

export async function getBatches() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('batches')
    .select('id, batch_code')
  if (error) {
    console.error('Error fetching batches:', error)
    throw new Error('Error al obtener los lotes')
  }
  return data
}

export async function newInspection(formData: FormData) {
  const supabase = await createClient()

  const inspectionData = {
    customer: String(formData.get('customer') ?? ''),
    inspection_date: String(formData.get('inspection_date') ?? ''),
    thickness_microns: Number(String(formData.get('thickness_microns') ?? '0')),
    width_cm: Number(String(formData.get('width_cm') ?? '0')),
    roll_config: String(formData.get('roll_config') ?? ''),
    batch_id: String(formData.get('batch_id') ?? ''),
    formulation_code: String(formData.get('formulation_code') ?? ''),
    feature: String(formData.get('feature') ?? ''),
    nota: String(formData.get('nota') ?? ''),
  }

  await supabase.from('inspections').insert(inspectionData)

}
