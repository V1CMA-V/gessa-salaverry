'use client'

import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  CaliberMeasurementsSection,
  GeneralInfoSection,
  MeasurementParametersSection,
  ResultsSection,
  ValidationParametersSection,
} from './validation-sections'

// Tipo de datos transformado desde la BD
export type ValidationData = {
  id: string
  dbId: string // ID real de la base de datos
  isReleased: boolean // Estado de liberación
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

interface ExistingValidationsProps {
  inspectionId: string
  validations: ValidationData[]
  calibre?: string
  config: string
  onUpdate?: (validationId: string, data: ValidationData) => Promise<void>
  onDelete?: (validationId: string) => Promise<void>
  onToggleRelease?: (
    validationId: string,
    currentStatus: boolean
  ) => Promise<void>
}

/**
 * Componente para renderizar validaciones existentes.
 *
 * ¿Por qué usamos useState aquí?
 * - isEditing: Necesario para controlar el modo de edición (UI state)
 * - activeTab: Necesario para controlar la pestaña activa (UI state)
 * - editingData: NECESARIO porque:
 *   1. Permite editar sin modificar los datos originales hasta guardar
 *   2. Permite cancelar y restaurar valores originales
 *   3. Evita mutaciones no deseadas en los props
 *
 * NO guardamos los datos de validaciones en estado porque:
 * - Vienen directamente de la BD vía props
 * - Después de cada mutación, la página se revalida desde el server
 * - Evita sincronización de estado local con BD
 */
export default function ExistingValidations({
  inspectionId,
  validations,
  calibre,
  config,
  onUpdate,
  onDelete,
  onToggleRelease,
}: ExistingValidationsProps) {
  // Estado para controlar el modo de edición (UI state - necesario)
  const [isEditing, setIsEditing] = useState(false)

  // Estado para controlar la pestaña activa (UI state - necesario)
  const [activeTab, setActiveTab] = useState(validations[0]?.id || '1')

  // Estado temporal para edición (necesario para cancelar cambios)
  const [editingData, setEditingData] = useState<ValidationData | null>(null)

  // Estado para el diálogo de confirmación de eliminación
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingValidation, setDeletingValidation] =
    useState<ValidationData | null>(null)

  const currentValidation = isEditing
    ? editingData
    : validations.find((v) => v.id === activeTab)

  if (!currentValidation) return null

  const handleEdit = () => {
    const validation = validations.find((v) => v.id === activeTab)
    if (validation) {
      setEditingData(JSON.parse(JSON.stringify(validation))) // Deep clone
      setIsEditing(true)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingData(null)
  }

  const handleSave = async () => {
    if (!editingData || !onUpdate) return

    try {
      await onUpdate(editingData.dbId, editingData)
      setIsEditing(false)
      setEditingData(null)
      // La página se revalidará automáticamente desde el server
    } catch (error) {
      console.error('Error al guardar:', error)
      alert('Error al guardar la validación')
    }
  }

  const handleDelete = async () => {
    if (!onDelete) return

    const validation = validations.find((v) => v.id === activeTab)
    if (!validation) return

    if (validations.length <= 1) {
      alert('No se puede eliminar la última validación')
      return
    }

    // Mostrar diálogo de confirmación
    setDeletingValidation(validation)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!onDelete || !deletingValidation) return

    try {
      await onDelete(deletingValidation.dbId)
      // Cambiar a otra pestaña
      const remainingValidations = validations.filter(
        (v) => v.id !== deletingValidation.id
      )
      if (remainingValidations.length > 0) {
        setActiveTab(remainingValidations[0].id)
      }
      setShowDeleteDialog(false)
      setDeletingValidation(null)
      // La página se revalidará automáticamente desde el server
    } catch (error) {
      console.error('Error al eliminar:', error)
      alert('Error al eliminar la validación')
      setShowDeleteDialog(false)
      setDeletingValidation(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setDeletingValidation(null)
  }

  const handleToggleRelease = async () => {
    if (!onToggleRelease) return

    const validation = validations.find((v) => v.id === activeTab)
    if (!validation) return

    try {
      await onToggleRelease(validation.dbId, validation.isReleased)
      // La página se revalidará automáticamente desde el server
    } catch (error) {
      console.error('Error al cambiar el estado de liberación:', error)
      alert('Error al cambiar el estado de liberación')
    }
  }

  // Funciones de actualización de datos temporales (solo para edición)
  const updateValidation = (updates: Partial<ValidationData>) => {
    if (!editingData) return
    setEditingData({ ...editingData, ...updates })
  }

  const updateNestedValue = (path: string[], value: any) => {
    if (!editingData) return

    const newData = { ...editingData }
    let current: any = newData
    for (let i = 0; i < path.length - 1; i++) {
      current[path[i]] = { ...current[path[i]] }
      current = current[path[i]]
    }
    current[path[path.length - 1]] = value
    setEditingData(newData)
  }

  const updateTableCell = (rowIdx: number, cellIdx: number, value: number) => {
    if (!editingData) return

    const newMediciones = [...editingData.medicionesCalibre]
    newMediciones[rowIdx] = [...newMediciones[rowIdx]]
    newMediciones[rowIdx][cellIdx] = value
    setEditingData({ ...editingData, medicionesCalibre: newMediciones })
  }

  return (
    <div className="space-y-6">
      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-muted-foreground">
            Total: {validations.length} validación
            {validations.length !== 1 ? 'es' : ''}
          </div>
          {currentValidation?.isReleased && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <IconCheck className="h-4 w-4" />
              <span>Parámetro de Liberación</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {validations.length > 1 && (
            <Button
              onClick={handleDelete}
              variant="destructive"
              size="sm"
              className="gap-2"
              disabled={isEditing}
            >
              <IconTrash className="h-4 w-4" />
              <span className="hidden sm:inline">
                Eliminar Validación {activeTab}
              </span>
              <span className="sm:hidden">Eliminar</span>
            </Button>
          )}
          {onToggleRelease && (
            <Button
              onClick={handleToggleRelease}
              variant={currentValidation?.isReleased ? 'outline' : 'default'}
              size="sm"
              className="gap-2"
              disabled={isEditing}
            >
              <IconCheck className="h-4 w-4" />
              <span className="hidden sm:inline">
                {currentValidation?.isReleased
                  ? 'Quitar de Liberación'
                  : 'Marcar como Liberación'}
              </span>
              <span className="sm:hidden">
                {currentValidation?.isReleased ? 'Quitar' : 'Liberar'}
              </span>
            </Button>
          )}
          {!isEditing ? (
            <Button onClick={handleEdit} className="gap-2">
              <IconEdit className="h-4 w-4" />
              Editar
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="gap-2"
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} className="gap-2">
                Guardar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Pestañas de Validaciones */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto min-w-full">
            {validations.map((validation) => (
              <TabsTrigger
                key={validation.id}
                value={validation.id}
                className="flex-1 min-w-[120px]"
                disabled={isEditing}
              >
                Validación {validation.id}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {validations.map((validation) => {
          // Si estamos editando, solo mostrar el tab activo con los datos de edición
          const displayData =
            isEditing && validation.id === activeTab
              ? currentValidation
              : validation

          return (
            <TabsContent
              key={validation.id}
              value={validation.id}
              className="space-y-6"
            >
              {/* Información General */}
              <GeneralInfoSection
                id={inspectionId}
                isEditing={isEditing}
                data={{
                  id: displayData.analistaCalidad.id,
                  full_name: displayData.analistaCalidad.full_name,
                  horaLiberacion: displayData.horaLiberacion,
                  operadorMaquina: displayData.operadorMaquina,
                }}
                onDataChange={(field, value) => {
                  if (field === 'id') {
                    updateNestedValue(['analistaCalidad', 'id'], value)
                  } else if (
                    field === 'horaLiberacion' ||
                    field === 'operadorMaquina'
                  ) {
                    updateValidation({ [field]: value })
                  }
                }}
              />

              {/* Parámetros de Validación */}
              <ValidationParametersSection
                id={inspectionId}
                isEditing={isEditing}
                data={displayData.parametrosValidacion}
                onDataChange={(field, value) =>
                  updateNestedValue(['parametrosValidacion', field], value)
                }
              />

              {/* Mediciones de Calibre */}
              <CaliberMeasurementsSection
                id={inspectionId}
                isEditing={isEditing}
                data={displayData.medicionesCalibre}
                config={config}
                onDataChange={(rowIdx, cellIdx, value) =>
                  updateTableCell(rowIdx, cellIdx, value)
                }
              />

              {/* Parámetros de Medición */}
              <MeasurementParametersSection
                id={inspectionId}
                isEditing={isEditing}
                calibre={calibre}
                data={{
                  encogimientos: displayData.encogimientos,
                  coeficienteFriccion: displayData.coeficienteFriccion,
                  campoElectrostatico: displayData.campoElectrostatico,
                  valoresAceptables: displayData.valoresAceptables,
                }}
                onDataChange={(path, value) => updateNestedValue(path, value)}
              />

              {/* Resultados */}
              <ResultsSection
                id={inspectionId}
                isEditing={isEditing}
                data={displayData.resultados}
                siguientesPasos={displayData.siguientesPasos}
                onDataChange={(field, value) =>
                  updateNestedValue(['resultados', field], value)
                }
                onSiguientesPasosChange={(value) =>
                  updateValidation({ siguientesPasos: value })
                }
              />
            </TabsContent>
          )
        })}
      </Tabs>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la{' '}
              <span className="font-semibold">
                Validación {deletingValidation?.id}
              </span>
              ?<br />
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
