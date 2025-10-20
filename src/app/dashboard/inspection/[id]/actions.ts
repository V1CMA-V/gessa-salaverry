'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

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
      id,
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

// Tipo para los datos de creación/actualización
type ValidationFormData = {
  analistaCalidad: { id: string; full_name: string }
  horaLiberacion: string
  operadorMaquina: string
  parametrosValidacion: {
    kilogramosHora: number
    velocidadMotorA: number
    velocidadMotorB: number
    velocidadMotorC: number
    velocidadTurbo: number
    velocidadJalador: number
    tensionBobinador1: number
    tensionBobinador2: number
    prearrastre: number
    presionBobinadorIzq: number
    presionBobinadorDer: number
    temperaturaCañonA: number
    temperaturaCañonB: number
    temperaturaCañonC: number
  }
  encogimientos: {
    estatico: { kof: number; dinamico: number }
    longitudinal: { kof: number; dinamico: number }
  }
  coeficienteFriccion: { nivel: number }
  campoElectrostatico: { nivel: number }
  valoresAceptables: {
    maximo: number
    minimo: number
    moda: number
    rango: number
  }
  medicionesCalibre: number[][]
  resultados: {
    muestreoDentroLimites: boolean
    rangoAceptado: boolean
    acabados: boolean
    validacionFormula: boolean
    apariencia: boolean
  }
  siguientesPasos: string
}

export async function CreateValidation(
  inspectionId: string,
  data: ValidationFormData
) {
  const supabase = await createClient()

  try {
    // 1. Crear registro en la tabla

    const infoDataEnviar = {
      analyst: data.analistaCalidad.id,
      operator: data.operadorMaquina,
      release_time: data.horaLiberacion,
    }

    const { data: infoData, error: infoError } = await supabase
      .from('validation_info')
      .insert({
        analyst: data.analistaCalidad.id,
        operator: data.operadorMaquina,
        release_time: data.horaLiberacion,
      })
      .select()
      .single()

    if (infoError) throw infoError

    // 2. Crear registro en la tabla machine_parameters
    const { data: machineData, error: machineError } = await supabase
      .from('machine_parameters')
      .insert({
        kilograms_per_hour: data.parametrosValidacion.kilogramosHora,
        motor_speed_a: data.parametrosValidacion.velocidadMotorA,
        motor_speed_b: data.parametrosValidacion.velocidadMotorB,
        motor_speed_c: data.parametrosValidacion.velocidadMotorC,
        turbo_speed: data.parametrosValidacion.velocidadTurbo,
        puller_speed: data.parametrosValidacion.velocidadJalador,
        winder_tension_1: data.parametrosValidacion.tensionBobinador1,
        winder_tension_2: data.parametrosValidacion.tensionBobinador2,
        pre_pull: data.parametrosValidacion.prearrastre,
        winder_pressure_left: data.parametrosValidacion.presionBobinadorIzq,
        winder_pressure_right: data.parametrosValidacion.presionBobinadorDer,
        barrel_temp_a: data.parametrosValidacion.temperaturaCañonA,
        barrel_temp_b: data.parametrosValidacion.temperaturaCañonB,
        barrel_temp_c: data.parametrosValidacion.temperaturaCañonC,
      })
      .select('id')
      .single()

    if (machineError) throw machineError

    // 3. Crear registro en la tabla measurement_params
    const { data: paramsData, error: paramsError } = await supabase
      .from('measurement_params')
      .insert({
        kof_static: data.encogimientos.estatico.kof,
        kof_dynamic: data.encogimientos.estatico.dinamico,
        shrink_trans: data.encogimientos.longitudinal.dinamico,
        shrink_long: data.encogimientos.longitudinal.kof,
        electrostatic_field: data.campoElectrostatico.nivel,
        max_value: data.valoresAceptables.maximo,
        min_value: data.valoresAceptables.minimo,
        mode_value: data.valoresAceptables.moda,
        range_value: data.valoresAceptables.rango,
      })
      .select('id')
      .single()

    if (paramsError) throw paramsError

    // 4. Crear registro en la tabla gauge_measurements
    const { data: gaugeData, error: gaugeError } = await supabase
      .from('gauge_measurements')
      .insert({
        values: { data: data.medicionesCalibre },
      })
      .select('id')
      .single()

    if (gaugeError) throw gaugeError

    // 5. Crear registro en la tabla validation_results
    const { data: resultsData, error: resultsError } = await supabase
      .from('validation_results')
      .insert({
        within_spec_limits: data.resultados.muestreoDentroLimites,
        range_accepted: data.resultados.rangoAceptado,
        design_ok: data.resultados.acabados,
        formulation_validated: data.resultados.validacionFormula,
        appearance_ok: data.resultados.apariencia,
        note: data.siguientesPasos,
      })
      .select('id')
      .single()

    if (resultsError) throw resultsError

    // 6. Crear el registro principal en validations
    const { data: validationData, error: validationError } = await supabase
      .from('validations')
      .insert({
        inspection_id: inspectionId,
        info_id: infoData.id,
        machine_id: machineData.id,
        single_params_id: paramsData.id,
        gauge_id: gaugeData.id,
        results_id: resultsData.id,
        is_released: false,
      })
      .select('id')
      .single()

    if (validationError) throw validationError

    // Revalidar la página para mostrar los nuevos datos
    revalidatePath(`/dashboard/inspection/${inspectionId}`)

    return { success: true, id: validationData.id }
  } catch (error) {
    console.error('Error creating validation:', error)
    throw new Error('Error al crear la validación')
  }
}

export async function UpdateValidation(
  inspectionId: string,
  validationId: string,
  data: ValidationFormData
) {
  const supabase = await createClient()

  try {
    const { data: validation, error: fetchError } = await supabase
      .from('validations')
      .select('info_id, machine_id, single_params_id, gauge_id, results_id')
      .eq('id', validationId)
      .single()

    if (fetchError) throw fetchError

    // 2. Actualizar info_general
    const { error: infoError } = await supabase
      .from('validation_info')
      .update({
        analyst: data.analistaCalidad.id,
        operator: data.operadorMaquina,
        release_time: data.horaLiberacion,
      })
      .eq('id', validation.info_id)

    if (infoError) throw infoError

    // 3. Actualizar machine_params
    const { error: machineError } = await supabase
      .from('machine_parameters')
      .update({
        kilograms_per_hour: data.parametrosValidacion.kilogramosHora,
        motor_speed_a: data.parametrosValidacion.velocidadMotorA,
        motor_speed_b: data.parametrosValidacion.velocidadMotorB,
        motor_speed_c: data.parametrosValidacion.velocidadMotorC,
        turbo_speed: data.parametrosValidacion.velocidadTurbo,
        puller_speed: data.parametrosValidacion.velocidadJalador,
        winder_tension_1: data.parametrosValidacion.tensionBobinador1,
        winder_tension_2: data.parametrosValidacion.tensionBobinador2,
        pre_pull: data.parametrosValidacion.prearrastre,
        winder_pressure_left: data.parametrosValidacion.presionBobinadorIzq,
        winder_pressure_right: data.parametrosValidacion.presionBobinadorDer,
        barrel_temp_a: data.parametrosValidacion.temperaturaCañonA,
        barrel_temp_b: data.parametrosValidacion.temperaturaCañonB,
        barrel_temp_c: data.parametrosValidacion.temperaturaCañonC,
      })
      .eq('id', validation.machine_id)

    if (machineError) throw machineError

    // 4. Actualizar single_params
    const { error: paramsError } = await supabase
      .from('measurement_params')
      .update({
        kof_static: data.encogimientos.estatico.kof,
        kof_dynamic: data.encogimientos.estatico.dinamico,
        shrink_trans: data.encogimientos.longitudinal.dinamico,
        shrink_long: data.encogimientos.longitudinal.kof,
        electrostatic_field: data.campoElectrostatico.nivel,
        max_value: data.valoresAceptables.maximo,
        min_value: data.valoresAceptables.minimo,
        mode_value: data.valoresAceptables.moda,
        range_value: data.valoresAceptables.rango,
      })
      .eq('id', validation.single_params_id)

    if (paramsError) throw paramsError

    // 5. Actualizar gauge_measurements
    const { error: gaugeError } = await supabase
      .from('gauge_measurements')
      .update({
        values: { data: data.medicionesCalibre },
      })
      .eq('id', validation.gauge_id)

    if (gaugeError) throw gaugeError

    // 6. Actualizar results
    const { error: resultsError } = await supabase
      .from('validation_results')
      .update({
        within_spec_limits: data.resultados.muestreoDentroLimites,
        range_accepted: data.resultados.rangoAceptado,
        design_ok: data.resultados.acabados,
        formulation_validated: data.resultados.validacionFormula,
        appearance_ok: data.resultados.apariencia,
        note: data.siguientesPasos,
      })
      .eq('id', validation.results_id)

    if (resultsError) throw resultsError

    // Revalidar la página para mostrar los datos actualizados
    revalidatePath(`/dashboard/inspection/${inspectionId}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating validation:', error)
    throw new Error('Error al actualizar la validación')
  }
}

export async function DeleteValidation(
  inspectionId: string,
  validationId: string
) {
  const supabase = await createClient()

  try {
    // 1. Obtener los IDs de las tablas relacionadas
    const { data: validation, error: fetchError } = await supabase
      .from('validations')
      .select('info_id, machine_id, single_params_id, gauge_id, results_id')
      .eq('id', validationId)
      .single()

    if (fetchError) throw fetchError

    // 2. Eliminar el registro principal
    const { error: deleteError } = await supabase
      .from('validations')
      .delete()
      .eq('id', validationId)

    if (deleteError) throw deleteError

    // // 3. Eliminar registros relacionados (si no hay CASCADE en la BD)
    // // Nota: Si tu BD tiene ON DELETE CASCADE, estos pasos no son necesarios
    // await Promise.all([
    //   supabase.from('info_general').delete().eq('id', validation.info_id),
    //   supabase.from('machine_params').delete().eq('id', validation.machine_id),
    //   supabase
    //     .from('single_params')
    //     .delete()
    //     .eq('id', validation.single_params_id),
    //   supabase
    //     .from('gauge_measurements')
    //     .delete()
    //     .eq('id', validation.gauge_id),
    //   supabase.from('results').delete().eq('id', validation.results_id),
    // ])

    // Revalidar la página después de eliminar
    revalidatePath(`/dashboard/inspection/${inspectionId}`)

    return { success: true }
  } catch (error) {
    console.error('Error deleting validation:', error)
    throw new Error('Error al eliminar la validación')
  }
}

export async function ToggleReleaseValidation(
  inspectionId: string,
  validationId: string,
  currentStatus: boolean
) {
  const supabase = await createClient()

  try {
    // Si se va a liberar esta validación (currentStatus es false y queremos ponerlo en true)
    if (!currentStatus) {
      // Primero, desmarcar todas las demás validaciones de esta inspección
      const { error: unreleaseError } = await supabase
        .from('validations')
        .update({ is_released: false })
        .eq('inspection_id', inspectionId)
        .neq('id', validationId)

      if (unreleaseError) throw unreleaseError
    }

    // Actualizar el estado de la validación actual
    const { error: updateError } = await supabase
      .from('validations')
      .update({ is_released: !currentStatus })
      .eq('id', validationId)

    if (updateError) throw updateError

    // Revalidar la página para mostrar los cambios
    revalidatePath(`/dashboard/inspection/${inspectionId}`)

    return { success: true }
  } catch (error) {
    console.error('Error toggling release status:', error)
    throw new Error('Error al cambiar el estado de liberación')
  }
}
