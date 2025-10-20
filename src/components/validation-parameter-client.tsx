'use client'

import {
  IconDeviceFloppy,
  IconEdit,
  IconPlus,
  IconTrash,
  IconX,
} from '@tabler/icons-react'
import { useState } from 'react'
import { PageTitle } from './page-title'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  CaliberMeasurementsSection,
  GeneralInfoSection,
  MeasurementParametersSection,
  ResultsSection,
  ValidationParametersSection,
} from './validation-sections'

// Tipo de datos para una validación
export type ValidationData = {
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

// Datos por defecto para una nueva validación
const getDefaultValidationData = (id: string): ValidationData => ({
  id,
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

// Función para transformar datos de Supabase a nuestro formato
const transformSupabaseData = (data: any[]): ValidationData[] => {
  return data.map((item, index) => ({
    id: String(index + 1),
    // info_id contiene: analyst (object con id y full_name), operator (string), release_time (string)
    analistaCalidad: {
      id: item.info_id?.analyst?.id || '',
      full_name: item.info_id?.analyst?.full_name || '',
    },
    horaLiberacion: item.info_id?.release_time || '',
    operadorMaquina: item.info_id?.operator || '',
    // machine_id contiene todos los parámetros de validación de la máquina
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
    // single_params_id contiene: kof_static, kof_dynamic, shrink_trans, shrink_long, electrostatic_field
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
      nivel: 0, // No viene en la respuesta actual
    },
    campoElectrostatico: {
      nivel: item.single_params_id?.electrostatic_field || 0,
    },
    // single_params_id también contiene: max_value, min_value, mode_value, range_value
    valoresAceptables: {
      maximo: item.single_params_id?.max_value || 0,
      minimo: item.single_params_id?.min_value || 0,
      moda: item.single_params_id?.mode_value || 0,
      rango: item.single_params_id?.range_value || 0,
    },
    // gauge_id contiene: values (objeto con las mediciones)
    medicionesCalibre: item.gauge_id?.values
      ? transformGaugeValues(item.gauge_id.values)
      : Array(10)
          .fill(null)
          .map(() => Array(8).fill(0)),
    // results_id contiene: within_spec_limits, range_accepted, design_ok, formulation_validated, appearance_ok, note
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

// Función auxiliar para transformar el objeto values de gauge_id a matriz
const transformGaugeValues = (values: any): number[][] => {
  // Si values es un objeto con la estructura esperada, convertirlo a matriz 10x8
  if (typeof values === 'object' && values !== null) {
    // Si tiene la estructura { data: [[...], [...]], rows: 10 }
    if (values.data && Array.isArray(values.data)) {
      return values.data
    }

    // Si ya es un array directamente, devolverlo
    if (Array.isArray(values)) {
      return values
    }

    // Si es un objeto con keys numéricas o posX, convertir a array
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

  // Default: matriz 10x8 de ceros
  return Array(10)
    .fill(null)
    .map(() => Array(8).fill(0))
}

interface ValidationParameterClientProps {
  id: string
  initialData: any[] | null
  calibre?: string
  config?: string
}

export default function ValidationParameterClient({
  id,
  initialData,
  calibre,
  config,
}: ValidationParameterClientProps) {
  // Transformar datos de Supabase o usar datos por defecto
  const getInitialValidations = (): ValidationData[] => {
    if (initialData && initialData.length > 0) {
      return transformSupabaseData(initialData)
    }
    return [getDefaultValidationData('1')]
  }

  const [initialValidations] = useState<ValidationData[]>(
    getInitialValidations()
  )
  const [isEditing, setIsEditing] = useState(false)
  const [validations, setValidations] =
    useState<ValidationData[]>(initialValidations)
  const [activeTab, setActiveTab] = useState('1')

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setValidations(initialValidations) // Restaurar datos originales
  }

  const handleSave = () => {
    // Transformar datos al formato de la base de datos separado por secciones
    const dataToSave = validations.map((validation) => ({
      // Información General (info_id)
      info_general: {
        analyst: validation.analistaCalidad.id,
        operator: validation.operadorMaquina,
        release_time: validation.horaLiberacion,
      },

      // Parámetros de Validación de Máquina (machine_id)
      parametros_validacion: {
        kilograms_per_hour: validation.parametrosValidacion.kilogramosHora,
        motor_speed_a: validation.parametrosValidacion.velocidadMotorA,
        motor_speed_b: validation.parametrosValidacion.velocidadMotorB,
        motor_speed_c: validation.parametrosValidacion.velocidadMotorC,
        turbo_speed: validation.parametrosValidacion.velocidadTurbo,
        puller_speed: validation.parametrosValidacion.velocidadJalador,
        winder_tension_1: validation.parametrosValidacion.tensionBobinador1,
        winder_tension_2: validation.parametrosValidacion.tensionBobinador2,
        pre_pull: validation.parametrosValidacion.prearrastre,
        winder_pressure_left:
          validation.parametrosValidacion.presionBobinadorIzq,
        winder_pressure_right:
          validation.parametrosValidacion.presionBobinadorDer,
        barrel_temp_a: validation.parametrosValidacion.temperaturaCañonA,
        barrel_temp_b: validation.parametrosValidacion.temperaturaCañonB,
        barrel_temp_c: validation.parametrosValidacion.temperaturaCañonC,
      },

      // Parámetros Individuales (single_params_id)
      parametros_individuales: {
        kof_static: validation.encogimientos.estatico.kof,
        kof_dynamic: validation.encogimientos.estatico.dinamico,
        shrink_trans: validation.encogimientos.longitudinal.dinamico,
        shrink_long: validation.encogimientos.longitudinal.kof,
        electrostatic_field: validation.campoElectrostatico.nivel,
        max_value: validation.valoresAceptables.maximo,
        min_value: validation.valoresAceptables.minimo,
        mode_value: validation.valoresAceptables.moda,
        range_value: validation.valoresAceptables.rango,
      },

      // Mediciones de Calibre (gauge_id)
      mediciones_calibre: {
        values: validation.medicionesCalibre,
      },

      // Resultados (results_id)
      resultados: {
        within_spec_limits: validation.resultados.muestreoDentroLimites,
        range_accepted: validation.resultados.rangoAceptado,
        design_ok: validation.resultados.acabados,
        formulation_validated: validation.resultados.validacionFormula,
        appearance_ok: validation.resultados.apariencia,
        note: validation.siguientesPasos,
      },
    }))

    console.log('📊 Datos organizados por secciones para guardar:')
    console.log('='.repeat(80))
    dataToSave.forEach((data, index) => {
      console.log(`\n🔹 VALIDACIÓN ${index + 1}`)
      console.log('\n📝 Información General (info_general):')
      console.log(data.info_general)
      console.log('\n⚙️ Parámetros de Validación (parametros_validacion):')
      console.log(data.parametros_validacion)
      console.log('\n📐 Parámetros Individuales (parametros_individuales):')
      console.log(data.parametros_individuales)
      console.log('\n📏 Mediciones de Calibre (mediciones_calibre):')
      console.log(data.mediciones_calibre)
      console.log('\n✅ Resultados (resultados):')
      console.log(data.resultados)
      console.log('\n' + '='.repeat(80))
    })

    setIsEditing(false)
    // TODO: Implementar llamada a API/Supabase para guardar
  }

  const handleAddValidation = () => {
    const newId = String(validations.length + 1)
    const newValidation = getDefaultValidationData(newId)

    // Mostrar en consola los datos de la nueva validación organizada por secciones
    const newValidationData = {
      // Información General (info_general)
      info_general: {
        analyst: newValidation.analistaCalidad.id,
        operator: newValidation.operadorMaquina,
        release_time: newValidation.horaLiberacion,
      },

      // Parámetros de Validación de Máquina (machine_id)
      parametros_validacion: {
        kilograms_per_hour: newValidation.parametrosValidacion.kilogramosHora,
        motor_speed_a: newValidation.parametrosValidacion.velocidadMotorA,
        motor_speed_b: newValidation.parametrosValidacion.velocidadMotorB,
        motor_speed_c: newValidation.parametrosValidacion.velocidadMotorC,
        turbo_speed: newValidation.parametrosValidacion.velocidadTurbo,
        puller_speed: newValidation.parametrosValidacion.velocidadJalador,
        winder_tension_1: newValidation.parametrosValidacion.tensionBobinador1,
        winder_tension_2: newValidation.parametrosValidacion.tensionBobinador2,
        pre_pull: newValidation.parametrosValidacion.prearrastre,
        winder_pressure_left:
          newValidation.parametrosValidacion.presionBobinadorIzq,
        winder_pressure_right:
          newValidation.parametrosValidacion.presionBobinadorDer,
        barrel_temp_a: newValidation.parametrosValidacion.temperaturaCañonA,
        barrel_temp_b: newValidation.parametrosValidacion.temperaturaCañonB,
        barrel_temp_c: newValidation.parametrosValidacion.temperaturaCañonC,
      },

      // Parámetros Individuales (single_params_id)
      parametros_individuales: {
        kof_static: newValidation.encogimientos.estatico.kof,
        kof_dynamic: newValidation.encogimientos.estatico.dinamico,
        shrink_trans: newValidation.encogimientos.longitudinal.dinamico,
        shrink_long: newValidation.encogimientos.longitudinal.kof,
        electrostatic_field: newValidation.campoElectrostatico.nivel,
        max_value: newValidation.valoresAceptables.maximo,
        min_value: newValidation.valoresAceptables.minimo,
        mode_value: newValidation.valoresAceptables.moda,
        range_value: newValidation.valoresAceptables.rango,
      },

      // Mediciones de Calibre (gauge_id)
      mediciones_calibre: {
        values: newValidation.medicionesCalibre,
      },

      // Resultados (results_id)
      resultados: {
        within_spec_limits: newValidation.resultados.muestreoDentroLimites,
        range_accepted: newValidation.resultados.rangoAceptado,
        design_ok: newValidation.resultados.acabados,
        formulation_validated: newValidation.resultados.validacionFormula,
        appearance_ok: newValidation.resultados.apariencia,
        note: newValidation.siguientesPasos,
      },
    }

    console.log('➕ Nueva validación agregada - Datos por secciones:')
    console.log('='.repeat(80))
    console.log(`\n🔹 VALIDACIÓN ${newId}`)
    console.log('\n📝 Información General (info_general):')
    console.log(newValidationData.info_general)
    console.log('\n⚙️ Parámetros de Validación (parametros_validacion):')
    console.log(newValidationData.parametros_validacion)
    console.log('\n📐 Parámetros Individuales (parametros_individuales):')
    console.log(newValidationData.parametros_individuales)
    console.log('\n📏 Mediciones de Calibre (mediciones_calibre):')
    console.log(newValidationData.mediciones_calibre)
    console.log('\n✅ Resultados (resultados):')
    console.log(newValidationData.resultados)
    console.log('\n' + '='.repeat(80))

    setValidations([...validations, newValidation])
    setActiveTab(newId)
    setIsEditing(true)
  }

  const handleDeleteValidation = (validationId: string) => {
    if (validations.length <= 1) {
      alert('No se puede eliminar la última validación')
      return
    }

    const filteredValidations = validations.filter((v) => v.id !== validationId)
    setValidations(filteredValidations)

    // Si estamos eliminando la pestaña activa, cambiar a la primera
    if (activeTab === validationId) {
      setActiveTab(filteredValidations[0].id)
    }
  }

  const updateValidation = (
    validationId: string,
    updates: Partial<ValidationData>
  ) => {
    setValidations((prev) =>
      prev.map((validation) =>
        validation.id === validationId
          ? { ...validation, ...updates }
          : validation
      )
    )
  }

  const updateNestedValue = (
    validationId: string,
    path: string[],
    value: any
  ) => {
    setValidations((prev) =>
      prev.map((validation) => {
        if (validation.id !== validationId) return validation

        const newValidation = { ...validation }
        let current: any = newValidation
        for (let i = 0; i < path.length - 1; i++) {
          current[path[i]] = { ...current[path[i]] }
          current = current[path[i]]
        }
        current[path[path.length - 1]] = value
        return newValidation
      })
    )
  }

  const updateTableCell = (
    validationId: string,
    rowIdx: number,
    cellIdx: number,
    value: number
  ) => {
    setValidations((prev) =>
      prev.map((validation) => {
        if (validation.id !== validationId) return validation

        const newMediciones = [...validation.medicionesCalibre]
        newMediciones[rowIdx] = [...newMediciones[rowIdx]]
        newMediciones[rowIdx][cellIdx] = value
        return { ...validation, medicionesCalibre: newMediciones }
      })
    )
  }

  const currentValidation = validations.find((v) => v.id === activeTab)

  if (!currentValidation) return null

  return (
    <>
      <PageTitle title={`Muestreo de Liberación`} />

      <div className="px-4 lg:px-6 space-y-6 pb-8">
        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleAddValidation}
              variant="outline"
              className="gap-2"
            >
              <IconPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Agregar Validación</span>
              <span className="sm:hidden">Agregar</span>
            </Button>
            <div className="text-sm text-muted-foreground">
              Total: {validations.length} validación
              {validations.length !== 1 ? 'es' : ''}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {validations.length > 1 && (
              <Button
                onClick={() => handleDeleteValidation(activeTab)}
                variant="destructive"
                size="sm"
                className="gap-2"
              >
                <IconTrash className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Eliminar Validación {activeTab}
                </span>
                <span className="sm:hidden">Eliminar</span>
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
                  <IconX className="h-4 w-4" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <IconDeviceFloppy className="h-4 w-4" />
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
                >
                  Validación {validation.id}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {validations.map((validation) => (
            <TabsContent
              key={validation.id}
              value={validation.id}
              className="space-y-6"
            >
              {/* Información General */}
              <GeneralInfoSection
                id={id}
                isEditing={isEditing}
                data={{
                  id: validation.analistaCalidad.id,
                  full_name: validation.analistaCalidad.full_name,
                  horaLiberacion: validation.horaLiberacion,
                  operadorMaquina: validation.operadorMaquina,
                }}
                onDataChange={(field, value) => {
                  if (field === 'id') {
                    // Si cambia el ID del analista, actualizar el objeto completo
                    updateNestedValue(
                      validation.id,
                      ['analistaCalidad', 'id'],
                      value
                    )
                  } else if (
                    field === 'horaLiberacion' ||
                    field === 'operadorMaquina'
                  ) {
                    updateValidation(validation.id, { [field]: value })
                  }
                }}
              />

              {/* Parámetros de Validación */}
              <ValidationParametersSection
                id={id}
                isEditing={isEditing}
                data={validation.parametrosValidacion}
                onDataChange={(field, value) =>
                  updateNestedValue(
                    validation.id,
                    ['parametrosValidacion', field],
                    value
                  )
                }
              />

              {/* Mediciones de Calibre */}
              <CaliberMeasurementsSection
                id={id}
                isEditing={isEditing}
                data={validation.medicionesCalibre}
                config={config}
                onDataChange={(rowIdx, cellIdx, value) =>
                  updateTableCell(validation.id, rowIdx, cellIdx, value)
                }
              />

              {/* Parámetros de Medición */}
              <MeasurementParametersSection
                id={id}
                isEditing={isEditing}
                calibre={calibre}
                data={{
                  encogimientos: validation.encogimientos,
                  coeficienteFriccion: validation.coeficienteFriccion,
                  campoElectrostatico: validation.campoElectrostatico,
                  valoresAceptables: validation.valoresAceptables,
                }}
                onDataChange={(path, value) =>
                  updateNestedValue(validation.id, path, value)
                }
              />

              {/* Resultados */}
              <ResultsSection
                id={id}
                isEditing={isEditing}
                data={validation.resultados}
                siguientesPasos={validation.siguientesPasos}
                onDataChange={(field, value) =>
                  updateNestedValue(validation.id, ['resultados', field], value)
                }
                onSiguientesPasosChange={(value) =>
                  updateValidation(validation.id, { siguientesPasos: value })
                }
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
