'use client'

import { PageTitle } from './page-title'
import {
  CaliberMeasurementsSection,
  GeneralInfoSection,
  MeasurementParametersSection,
  ResultsSection,
  ValidationParametersSection,
} from './validation-sections'

// Tipo de datos para una liberación
export type LiberationData = {
  id: string
  analistaCalidad: {
    id: string
    full_name: string
  }
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

const transformGaugeValues = (values: any): number[][] => {
  if (typeof values === 'object' && values !== null) {
    if (values.data && Array.isArray(values.data)) {
      return values.data
    }

    if (Array.isArray(values)) {
      return values
    }

    const keys = Object.keys(values).sort()
    const matrix: number[][] = []

    for (let i = 0; i < 10; i++) {
      const key = keys[i] || `pos${i + 1}`
      const row = values[key]
      if (Array.isArray(row) && row.length === 8) {
        matrix.push(row)
      } else {
        matrix.push(Array(8).fill(0))
      }
    }

    return matrix
  }

  return Array(10)
    .fill(null)
    .map(() => Array(8).fill(0))
}

// Función para transformar datos de Supabase a nuestro formato
const transformSupabaseData = (item: any): LiberationData => {
  return {
    id: item.id || '',
    analistaCalidad: {
      id: item.info_id?.analyst?.id || '',
      full_name: item.info_id?.analyst?.full_name || '',
    },
    horaLiberacion: item.info_id?.release_time || '',
    operadorMaquina: item.info_id?.operator || '',
    parametrosValidacion: {
      kilogramosHora: item.machine_id?.kilograms_per_hour || 0,
      velocidadMotorA: item.machine_id?.motor_speed_a || 0,
      velocidadMotorB: item.machine_id?.motor_speed_b || 0,
      velocidadMotorC: item.machine_id?.motor_speed_c || 0,
      velocidadTurbo: item.machine_id?.turbo_speed || 0,
      velocidadJalador: item.machine_id?.puller_speed || 0,
      tensionBobinador1: item.machine_id?.winder_tension_1 || 0,
      tensionBobinador2: item.machine_id?.winder_tension_2 || 0,
      prearrastre: item.machine_id?.pre_pull || 0,
      presionBobinadorIzq: item.machine_id?.winder_pressure_left || 0,
      presionBobinadorDer: item.machine_id?.winder_pressure_right || 0,
      temperaturaCañonA: item.machine_id?.barrel_temp_a || 0,
      temperaturaCañonB: item.machine_id?.barrel_temp_b || 0,
      temperaturaCañonC: item.machine_id?.barrel_temp_c || 0,
    },
    encogimientos: {
      estatico: {
        kof: item.single_params_id?.kof_static || 0,
        dinamico: item.single_params_id?.kof_dynamic || 0,
      },
      longitudinal: {
        kof: item.single_params_id?.shrink_long || 0,
        dinamico: item.single_params_id?.shrink_trans || 0,
      },
    },
    coeficienteFriccion: {
      nivel: 0,
    },
    campoElectrostatico: {
      nivel: item.single_params_id?.electrostatic_field || 0,
    },
    valoresAceptables: {
      maximo: item.single_params_id?.max_value || 0,
      minimo: item.single_params_id?.min_value || 0,
      moda: item.single_params_id?.mode_value || 0,
      rango: item.single_params_id?.range_value || 0,
    },
    medicionesCalibre: item.gauge_id?.values
      ? transformGaugeValues(item.gauge_id.values)
      : Array(10)
          .fill(null)
          .map(() => Array(8).fill(0)),
    resultados: {
      muestreoDentroLimites: item.results_id?.within_spec_limits || false,
      rangoAceptado: item.results_id?.range_accepted || false,
      acabados: item.results_id?.design_ok || false,
      validacionFormula: item.results_id?.formulation_validated || false,
      apariencia: item.results_id?.appearance_ok || false,
    },
    siguientesPasos: item.results_id?.note || '',
  }
}

interface LiberationParametersProps {
  id: string
  initialData: any[] | null
  calibre?: string
  config: string
}

export default function LiberationParameters({
  id,
  initialData,
  calibre,
  config,
}: LiberationParametersProps) {
  // Filtrar solo las validaciones con is_released = true y tomar la primera
  const releasedValidation =
    initialData && initialData.length > 0
      ? initialData.find((validation) => validation.is_released === true)
      : null

  const liberation = releasedValidation
    ? transformSupabaseData(releasedValidation)
    : null

  if (!liberation) {
    return (
      <>
        <PageTitle title="Parámetros de Liberación" />
        <div className="px-4 lg:px-6 space-y-6 pb-8">
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">
              No hay parámetros de liberación registrados
            </p>
            <p className="text-sm mt-2">
              Primero debe liberarse una validación en la pestaña de Parámetros
              de Validación
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Parámetros de Liberación" />
      <div className="px-4 lg:px-6 space-y-6 pb-8">
        {/* Información General */}
        <GeneralInfoSection
          id={id}
          isEditing={false}
          data={{
            id: liberation.analistaCalidad.id,
            full_name: liberation.analistaCalidad.full_name,
            horaLiberacion: liberation.horaLiberacion,
            operadorMaquina: liberation.operadorMaquina,
          }}
          onDataChange={() => {}}
        />

        {/* Parámetros de Validación */}
        <ValidationParametersSection
          id={id}
          isEditing={false}
          data={liberation.parametrosValidacion}
          onDataChange={() => {}}
        />

        {/* Mediciones de Calibre */}
        <CaliberMeasurementsSection
          id={id}
          isEditing={false}
          data={liberation.medicionesCalibre}
          config={config}
          onDataChange={() => {}}
        />

        {/* Parámetros de Medición */}
        <MeasurementParametersSection
          id={id}
          isEditing={false}
          calibre={calibre}
          data={{
            encogimientos: liberation.encogimientos,
            coeficienteFriccion: liberation.coeficienteFriccion,
            campoElectrostatico: liberation.campoElectrostatico,
            valoresAceptables: liberation.valoresAceptables,
          }}
          onDataChange={() => {}}
        />

        {/* Resultados */}
        <ResultsSection
          id={id}
          isEditing={false}
          data={liberation.resultados}
          siguientesPasos={liberation.siguientesPasos}
          onDataChange={() => {}}
          onSiguientesPasosChange={() => {}}
        />
      </div>
    </>
  )
}
