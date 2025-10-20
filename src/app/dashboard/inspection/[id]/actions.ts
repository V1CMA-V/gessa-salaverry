'use server'

import { createClient } from '@/utils/supabase/server'

export async function GetInfoGeneral(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inspections')
    .select('roll_config, thickness_microns')
    .eq('id', id)
    .single()
  if (error) {
    console.error('Error fetching general info:', error)
    throw new Error('Error al obtener la información general')
  }
  return data
}

export async function GetParameters(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('validations')
    .select(
      `
      is_released,
      info_id!inner(
        id,
        analyst(id, full_name),
        operator,
        release_time
      ),
      gauge_id!inner(
        id,
        values
      ),
      single_params_id!inner(
        id,
        max_value,
        min_value,
        kof_static,
        mode_value,
        kof_dynamic,
        range_value,
        shrink_long,
        shrink_trans,
        electrostatic_field
      ),
      results_id!inner(
        id,
        note,
        design_ok,
        appearance_ok,
        range_accepted,
        within_spec_limits,
        formulation_validated
      ),
      machine_id!inner(*)
    `
    )
    .eq('inspection_id', id)

  if (error) {
    console.error('Error fetching validation parameters:', error)
    throw new Error('Error al obtener los parámetros de validación')
  }

  console.log('Fetched validation parameters:', data)

  return data
}

export async function GetAnalysts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'analyst')

  if (error) {
    console.error('Error fetching analysts:', error)
    throw new Error('Error al obtener los analistas')
  }

  return data
}
