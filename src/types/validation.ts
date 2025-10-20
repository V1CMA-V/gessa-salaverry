// Tipos para los datos de Supabase (basados en la respuesta real)
export interface SupabaseValidationInfo {
  id: string
  analyst: string // UUID del analista
  operator: string
  release_time: string
}

export interface SupabaseSingleParams {
  id: string
  max_value: number
  min_value: number
  kof_static: number
  mode_value: number
  kof_dynamic: number
  range_value: number
  shrink_long: number
  shrink_trans: number
  electrostatic_field: number
}

export interface SupabaseGauge {
  id: string
  values: any // Objeto con las mediciones (estructura por definir)
}

export interface SupabaseResults {
  id: string
  note: string
  design_ok: boolean
  appearance_ok: boolean
  range_accepted: boolean
  within_spec_limits: boolean
  formulation_validated: boolean
}

export interface SupabaseValidation {
  is_released: boolean
  info_id: SupabaseValidationInfo
  gauge_id: SupabaseGauge
  single_params_id: SupabaseSingleParams
  results_id: SupabaseResults
}

// Tipos para nuestra aplicación
export interface ValidationData {
  id: string
  analistaCalidad: string
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
  coeficienteFriccion: {
    nivel: number
  }
  campoElectrostatico: {
    nivel: number
  }
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
