'use client'

import {
  CreateValidation,
  DeleteValidation,
  ToggleReleaseValidation,
  UpdateValidation,
} from '@/app/dashboard/inspection/[id]/actions'
import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ExistingValidations, {
  type ValidationData,
} from './existing-validations'
import NewValidationForm from './new-validation-form'
import { PageTitle } from './page-title'
import { Button } from './ui/button'

// Función para transformar datos de Supabase a nuestro formato
const transformSupabaseData = (data: any[]): ValidationData[] => {
  return data.map((item, index) => ({
    id: String(index + 1),
    dbId: item.id || '', // ID de la tabla validations (no info_id)
    isReleased: item.is_released || false, // Estado de liberación
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
  }))
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

interface ValidationParameterProps {
  id: string
  initialData: any[] | null
  calibre?: string
  config: string
}

/**
 * Componente principal de parámetros de validación.
 *
 * ¿Por qué usamos useState aquí?
 * - showNewForm: NECESARIO porque:
 *   1. Controla la visibilidad del formulario de nueva validación (UI state)
 *   2. Es un estado puramente del cliente que no viene ni va a la BD
 *
 * NO guardamos las validaciones en estado porque:
 * - Vienen como props desde el server component
 * - Después de crear/actualizar/eliminar, usamos router.refresh() para revalidar
 * - Esto mantiene la sincronización con la BD sin duplicar estado
 */
export default function ValidationParameter({
  id,
  initialData,
  calibre,
  config,
}: ValidationParameterProps) {
  const router = useRouter()

  // Estado para mostrar/ocultar formulario de nueva validación (UI state - necesario)
  const [showNewForm, setShowNewForm] = useState(false)

  // Transformar datos de Supabase si existen
  const validations =
    initialData && initialData.length > 0
      ? transformSupabaseData(initialData)
      : []

  const handleCreate = async (data: any) => {
    try {
      await CreateValidation(id, data)
      setShowNewForm(false)
      router.refresh() // Revalidar desde el server
    } catch (error) {
      throw error // Propagate error to NewValidationForm
    }
  }

  const handleUpdate = async (validationId: string, data: ValidationData) => {
    try {
      await UpdateValidation(id, validationId, data)
      router.refresh() // Revalidar desde el server
    } catch (error) {
      throw error // Propagate error to ExistingValidations
    }
  }

  const handleDelete = async (validationId: string) => {
    try {
      await DeleteValidation(id, validationId)
      router.refresh() // Revalidar desde el server
    } catch (error) {
      throw error // Propagate error to ExistingValidations
    }
  }

  const handleToggleRelease = async (
    validationId: string,
    currentStatus: boolean
  ) => {
    try {
      await ToggleReleaseValidation(id, validationId, currentStatus)
      router.refresh() // Revalidar desde el server
    } catch (error) {
      throw error // Propagate error to ExistingValidations
    }
  }

  return (
    <>
      <PageTitle title="Muestreo de Liberación" />

      <div className="px-4 lg:px-6 space-y-6 pb-8">
        {/* Botón para agregar nueva validación */}
        {!showNewForm && (
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setShowNewForm(true)}
              variant="outline"
              className="gap-2"
            >
              <IconPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Agregar Validación</span>
              <span className="sm:hidden">Agregar</span>
            </Button>
          </div>
        )}

        {/* Formulario de nueva validación */}
        {showNewForm && (
          <NewValidationForm
            inspectionId={id}
            calibre={calibre}
            config={config}
            onCancel={() => setShowNewForm(false)}
            onCreate={handleCreate}
          />
        )}

        {/* Validaciones existentes */}
        {!showNewForm && validations.length > 0 && (
          <ExistingValidations
            inspectionId={id}
            validations={validations}
            calibre={calibre}
            config={config}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onToggleRelease={handleToggleRelease}
          />
        )}

        {/* Mensaje cuando no hay validaciones */}
        {!showNewForm && validations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No hay validaciones registradas</p>
            <p className="text-sm mt-2">
              Haz clic en "Agregar Validación" para crear una nueva
            </p>
          </div>
        )}
      </div>
    </>
  )
}
