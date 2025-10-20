'use client'

import { IconDeviceFloppy, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  CaliberMeasurementsSection,
  GeneralInfoSection,
  MeasurementParametersSection,
  ResultsSection,
  ValidationParametersSection,
} from './validation-sections'

// Tipo para nueva validación
type NewValidationData = {
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

// Datos por defecto para una nueva validación
const getDefaultValidationData = (): NewValidationData => ({
  analistaCalidad: {
    id: '',
    full_name: '',
  },
  horaLiberacion: '',
  operadorMaquina: '',
  parametrosValidacion: {
    kilogramosHora: 0,
    velocidadMotorA: 0,
    velocidadMotorB: 0,
    velocidadMotorC: 0,
    velocidadTurbo: 0,
    velocidadJalador: 0,
    tensionBobinador1: 0,
    tensionBobinador2: 0,
    prearrastre: 0,
    presionBobinadorIzq: 0,
    presionBobinadorDer: 0,
    temperaturaCañonA: 0,
    temperaturaCañonB: 0,
    temperaturaCañonC: 0,
  },
  encogimientos: {
    estatico: { kof: 0, dinamico: 0 },
    longitudinal: { kof: 0, dinamico: 0 },
  },
  coeficienteFriccion: {
    nivel: 0,
  },
  campoElectrostatico: {
    nivel: 0,
  },
  valoresAceptables: {
    maximo: 0,
    minimo: 0,
    moda: 0,
    rango: 0,
  },
  medicionesCalibre: Array(10)
    .fill(null)
    .map(() => Array(8).fill(0)),
  resultados: {
    muestreoDentroLimites: false,
    rangoAceptado: false,
    acabados: false,
    validacionFormula: false,
    apariencia: false,
  },
  siguientesPasos: '',
})

interface NewValidationFormProps {
  inspectionId: string
  calibre?: string
  config: string
  onCancel: () => void
  onCreate: (data: NewValidationData) => Promise<void>
}

/**
 * Componente para crear una nueva validación.
 *
 * ¿Por qué usamos useState aquí?
 * - formData: NECESARIO porque:
 *   1. Es un formulario controlado que necesita guardar el estado temporalmente
 *   2. Los datos solo existen en el cliente hasta que se envían a la BD
 *   3. Permite cancelar sin afectar nada
 *   4. Solo después de guardar exitosamente se agrega a la lista real
 *
 * - isSaving: Necesario para el estado de carga durante el envío (UI state)
 *
 * Este es el caso correcto de uso de useState: datos temporales del formulario
 * que NO vienen de la BD y NO necesitan sincronizarse hasta el envío final.
 */
export default function NewValidationForm({
  inspectionId,
  calibre,
  config,
  onCancel,
  onCreate,
}: NewValidationFormProps) {
  // Estado del formulario (necesario - datos temporales no persistidos)
  const [formData, setFormData] = useState<NewValidationData>(
    getDefaultValidationData()
  )

  // Estado de carga (UI state - necesario)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onCreate(formData)
      // No hacemos nada más aquí, el componente padre manejará la revalidación
    } catch (error) {
      console.error('Error al crear validación:', error)
      alert('Error al crear la validación')
    } finally {
      setIsSaving(false)
    }
  }

  // Funciones de actualización del formulario
  const updateFormData = (updates: Partial<NewValidationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const updateNestedValue = (path: string[], value: any) => {
    setFormData((prev) => {
      const newData = { ...prev }
      let current: any = newData
      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] }
        current = current[path[i]]
      }
      current[path[path.length - 1]] = value
      return newData
    })
  }

  const updateTableCell = (rowIdx: number, cellIdx: number, value: number) => {
    setFormData((prev) => {
      const newMediciones = [...prev.medicionesCalibre]
      newMediciones[rowIdx] = [...newMediciones[rowIdx]]
      newMediciones[rowIdx][cellIdx] = value
      return { ...prev, medicionesCalibre: newMediciones }
    })
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold">Nueva Validación</h2>
        <div className="flex gap-2">
          <Button
            onClick={onCancel}
            variant="outline"
            className="gap-2"
            disabled={isSaving}
          >
            <IconX className="h-4 w-4" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2" disabled={isSaving}>
            <IconDeviceFloppy className="h-4 w-4" />
            {isSaving ? 'Guardando...' : 'Guardar Validación'}
          </Button>
        </div>
      </div>

      {/* Formulario */}
      <div className="space-y-6">
        {/* Información General */}
        <GeneralInfoSection
          id={inspectionId}
          isEditing={true}
          data={{
            id: formData.analistaCalidad.id,
            full_name: formData.analistaCalidad.full_name,
            horaLiberacion: formData.horaLiberacion,
            operadorMaquina: formData.operadorMaquina,
          }}
          onDataChange={(field, value) => {
            if (field === 'id') {
              updateNestedValue(['analistaCalidad', 'id'], value)
            } else if (
              field === 'horaLiberacion' ||
              field === 'operadorMaquina'
            ) {
              updateFormData({ [field]: value })
            }
          }}
        />

        {/* Parámetros de Validación */}
        <ValidationParametersSection
          id={inspectionId}
          isEditing={true}
          data={formData.parametrosValidacion}
          onDataChange={(field, value) =>
            updateNestedValue(['parametrosValidacion', field], value)
          }
        />

        {/* Mediciones de Calibre */}
        <CaliberMeasurementsSection
          id={inspectionId}
          isEditing={true}
          data={formData.medicionesCalibre}
          config={config}
          onDataChange={(rowIdx, cellIdx, value) =>
            updateTableCell(rowIdx, cellIdx, value)
          }
        />

        {/* Parámetros de Medición */}
        <MeasurementParametersSection
          id={inspectionId}
          isEditing={true}
          calibre={calibre}
          data={{
            encogimientos: formData.encogimientos,
            coeficienteFriccion: formData.coeficienteFriccion,
            campoElectrostatico: formData.campoElectrostatico,
            valoresAceptables: formData.valoresAceptables,
          }}
          onDataChange={(path, value) => updateNestedValue(path, value)}
        />

        {/* Resultados */}
        <ResultsSection
          id={inspectionId}
          isEditing={true}
          data={formData.resultados}
          siguientesPasos={formData.siguientesPasos}
          onDataChange={(field, value) =>
            updateNestedValue(['resultados', field], value)
          }
          onSiguientesPasosChange={(value) =>
            updateFormData({ siguientesPasos: value })
          }
        />
      </div>
    </div>
  )
}
