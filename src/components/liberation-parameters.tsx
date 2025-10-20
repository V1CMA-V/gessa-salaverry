'use client'

import { IconDeviceFloppy, IconEdit, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { PageTitle } from './page-title'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Separator } from './ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

// Datos falsos para el ejemplo
const mockData = {
  analistaCalidad: 'Juan Pérez',
  horaLiberacion: '14:30',
  operadorMaquina: 'Carlos González',
  encogimientos: {
    estatico: { kof: 2.5, dinamico: 3.2 },
    longitudinal: { kof: 1.8, dinamico: 2.4 },
  },
  coeficienteFriccion: {
    nivel: 0.35,
  },
  campoElectrostatico: {
    nivel: 2.5,
  },
  valoresAceptables: {
    maximo: 0,
    minimo: 0,
    moda: 0,
    rango: 0,
  },
  medicionesCalibre: [
    [125, 128, 127, 126, 129, 130, 128, 127],
    [126, 127, 129, 128, 127, 126, 128, 129],
    [128, 126, 127, 129, 128, 127, 126, 128],
    [127, 129, 128, 126, 127, 128, 129, 127],
    [129, 127, 126, 128, 129, 128, 127, 126],
    [128, 128, 127, 127, 126, 129, 128, 127],
    [127, 126, 128, 129, 127, 128, 126, 129],
    [126, 129, 127, 128, 128, 127, 129, 126],
    [128, 127, 129, 127, 126, 128, 127, 128],
    [127, 128, 126, 128, 127, 129, 128, 127],
  ],
  resultados: {
    muestreoDentroLimites: true,
    rangoAceptado: true,
    acabados: true,
    validacionFormula: true,
    apariencia: true,
  },
}

export default function LiberationParameters({ id }: { id: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(mockData)
  const [siguientesPasos, setSiguientesPasos] = useState('')

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(mockData) // Restaurar datos originales
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando datos:', editedData)
    setIsEditing(false)
    // TODO: Implementar llamada a API/Supabase
  }

  const updateNestedValue = (path: string[], value: any) => {
    setEditedData((prev) => {
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
    setEditedData((prev) => {
      const newData = { ...prev }
      const newMediciones = [...newData.medicionesCalibre]
      newMediciones[rowIdx] = [...newMediciones[rowIdx]]
      newMediciones[rowIdx][cellIdx] = value
      return { ...newData, medicionesCalibre: newMediciones }
    })
  }

  //   const supabase = await createClient()

  //   // Obtener los datos de la inspección
  //   const { data: inspection, error } = await supabase
  //     .from('inspections')
  //     .select(
  //       `
  //       id,
  //       customer,
  //       inspection_date,
  //       thickness_microns,
  //       width_cm,
  //       roll_config,
  //       batch_id(batch_code),
  //       formulation_code,
  //       feature,
  //       nota,
  //       created_at,
  //       created_by(full_name, email)
  //     `
  //     )
  //     .eq('id', id)
  //     .single()

  //   if (error || !inspection) {
  //     notFound()
  //   }

  //   // Normalizar datos anidados
  //   const normalizedInspection = {
  //     ...inspection,
  //     batch_id: Array.isArray(inspection.batch_id)
  //       ? inspection.batch_id[0] ?? null
  //       : inspection.batch_id,
  //     created_by: Array.isArray(inspection.created_by)
  //       ? inspection.created_by[0] ?? null
  //       : inspection.created_by,
  //   }

  return (
    <>
      <PageTitle title={`Muestreo de Liberación`} />

      <div className="px-4 lg:px-6 space-y-6 pb-8">
        {/* Botones de Acción */}
        <div className="flex justify-end gap-2">
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
                Guardar Cambios
              </Button>
            </>
          )}
        </div>

        {/* Información del Analista */}
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="analista">Analista de Calidad:</Label>
                <Select
                  value={editedData.analistaCalidad}
                  onValueChange={(value) =>
                    setEditedData({ ...editedData, analistaCalidad: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un analista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                    <SelectItem value="VICMA">VICMA</SelectItem>
                    <SelectItem value="Carlos González">
                      Carlos González
                    </SelectItem>
                    <SelectItem value="María López">María López</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora de Liberación:</Label>
                <Input
                  id="hora"
                  type="time"
                  value={editedData.horaLiberacion}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      horaLiberacion: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operador">Operador de Máquina:</Label>
                <Input
                  id="operador"
                  value={editedData.operadorMaquina}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      operadorMaquina: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parámetros de Medición */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Encogimientos */}
          <Card>
            <CardHeader className="">
              <CardTitle className="text-sm">ENCOGIMIENTOS:</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">KOF Estático</span>
                  <Input
                    type="number"
                    step="0.1"
                    value={editedData.encogimientos.estatico.kof}
                    onChange={(e) =>
                      updateNestedValue(
                        ['encogimientos', 'estatico', 'kof'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`w-24 text-center ${
                      !isEditing ? 'bg-muted' : ''
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">KOF Dinámico</span>
                  <Input
                    type="number"
                    step="0.1"
                    value={editedData.encogimientos.estatico.dinamico}
                    onChange={(e) =>
                      updateNestedValue(
                        ['encogimientos', 'estatico', 'dinamico'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`w-24 text-center ${
                      !isEditing ? 'bg-muted' : ''
                    }`}
                  />
                </div>
                <Separator />
                <CardTitle className="text-sm">
                  COEFICIENTE DE FRICCION:
                </CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Encog. Trans</span>
                  <Input
                    type="number"
                    step="0.1"
                    value={editedData.encogimientos.estatico.kof}
                    onChange={(e) =>
                      updateNestedValue(
                        ['encogimientos', 'estatico', 'kof'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`w-24 text-center ${
                      !isEditing ? 'bg-muted' : ''
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Encog. Long</span>
                  <Input
                    type="number"
                    step="0.1"
                    value={editedData.encogimientos.estatico.dinamico}
                    onChange={(e) =>
                      updateNestedValue(
                        ['encogimientos', 'estatico', 'dinamico'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`w-24 text-center ${
                      !isEditing ? 'bg-muted' : ''
                    }`}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">
                      CAMPO ELECTROSTÁTICO:
                    </CardTitle>
                    <CardDescription className="mb-2">
                      Nivel menor a 3kv/in
                    </CardDescription>
                  </div>
                  <Input
                    type="number"
                    step="0.1"
                    value={editedData.campoElectrostatico.nivel}
                    onChange={(e) =>
                      updateNestedValue(
                        ['campoElectrostatico', 'nivel'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`w-24 text-center ${
                      !isEditing ? 'bg-muted' : ''
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valores Aceptables */}
          <Card>
            <CardHeader className="">
              <CardTitle className="text-sm">
                VALORES ACEPTABLES CALIBRE
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>MÁXIMO</Label>
                  <Input
                    type="number"
                    value={editedData.valoresAceptables.maximo}
                    onChange={(e) =>
                      updateNestedValue(
                        ['valoresAceptables', 'maximo'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`text-center ${!isEditing ? 'bg-muted' : ''}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>MÍNIMO</Label>
                  <Input
                    type="number"
                    value={editedData.valoresAceptables.minimo}
                    onChange={(e) =>
                      updateNestedValue(
                        ['valoresAceptables', 'minimo'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`text-center ${!isEditing ? 'bg-muted' : ''}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>MODA</Label>
                  <Input
                    type="number"
                    value={editedData.valoresAceptables.moda}
                    onChange={(e) =>
                      updateNestedValue(
                        ['valoresAceptables', 'moda'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`text-center ${!isEditing ? 'bg-muted' : ''}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label>RANGO</Label>
                  <Input
                    type="number"
                    value={editedData.valoresAceptables.rango}
                    onChange={(e) =>
                      updateNestedValue(
                        ['valoresAceptables', 'rango'],
                        parseFloat(e.target.value) || 0
                      )
                    }
                    readOnly={!isEditing}
                    className={`text-center ${!isEditing ? 'bg-muted' : ''}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Mediciones de Calibre */}
        <Card>
          <CardHeader>
            <CardTitle>Mediciones de Calibre: Liberación/Parada 1</CardTitle>
            <CardDescription>
              Rollos Por Flecha/Posición - 10 Posiciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32 bg-blue-200">Posición</TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      1
                    </TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      2
                    </TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      3
                    </TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      4
                    </TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      5
                    </TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      6
                    </TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      7
                    </TableHead>
                    <TableHead className="text-center bg-blue-200/80">
                      8
                    </TableHead>
                    <TableHead className="bg-amber-100 text-center">
                      Medida de Ancho
                    </TableHead>
                    <TableHead className="bg-gray-200 text-center">
                      Resultados
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editedData.medicionesCalibre.map((row, idx) => {
                    const min = Math.min(...row)
                    const max = Math.max(...row)
                    const sum = row.reduce((a, b) => a + b, 0)
                    const avg = (sum / row.length).toFixed(1)
                    const range = max - min

                    // Alternar color por pares: filas 0-1 color A, 2-3 color B, 4-5 A, etc.
                    const pairParity = Math.floor(idx / 2) % 2 // 0 or 1
                    const rowBg =
                      pairParity === 0 ? 'bg-blue-200/30' : 'bg-blue-200/20'

                    return (
                      <TableRow key={idx} className={rowBg}>
                        <TableCell className={`font-medium `}>
                          Posición {idx + 1}
                        </TableCell>
                        {row.map((val, cellIdx) => (
                          <TableCell key={cellIdx} className="text-center p-1">
                            {isEditing ? (
                              <Input
                                type="number"
                                value={val}
                                onChange={(e) =>
                                  updateTableCell(
                                    idx,
                                    cellIdx,
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="w-16 h-8 text-center mx-auto"
                              />
                            ) : (
                              val
                            )}
                          </TableCell>
                        ))}
                        <TableCell className="bg-amber-50 text-center">
                          {avg}
                        </TableCell>
                        <TableCell className="bg-gray-50 text-center font-medium">
                          {idx === 0
                            ? 'Mínimo'
                            : idx === 1
                            ? min
                            : idx === 2
                            ? 'Máximo'
                            : idx === 3
                            ? max
                            : idx === 4
                            ? 'Rango'
                            : idx === 5
                            ? range
                            : idx === 6
                            ? 'Moda'
                            : idx === 7
                            ? '#N/D'
                            : idx === 8
                            ? 'Promedio'
                            : `#¡DIV/0!`}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center border-2 border-dashed">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Área del gráfico de control</p>
                <p className="text-xs mt-2">
                  Muestreo, Setpoint, LIE, LSE, LIC, LSC
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>¿Se libera el producto?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="muestreo"
                  checked={editedData.resultados.muestreoDentroLimites}
                  onCheckedChange={(checked) =>
                    updateNestedValue(
                      ['resultados', 'muestreoDentroLimites'],
                      checked
                    )
                  }
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="muestreo"
                  className={isEditing ? 'cursor-pointer' : 'cursor-default'}
                >
                  Muestreo Dentro de Límites de Especificación
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rango"
                  checked={editedData.resultados.rangoAceptado}
                  onCheckedChange={(checked) =>
                    updateNestedValue(['resultados', 'rangoAceptado'], checked)
                  }
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="rango"
                  className={isEditing ? 'cursor-pointer' : 'cursor-default'}
                >
                  Rango Aceptado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acabados"
                  checked={editedData.resultados.acabados}
                  onCheckedChange={(checked) =>
                    updateNestedValue(['resultados', 'acabados'], checked)
                  }
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="acabados"
                  className={isEditing ? 'cursor-pointer' : 'cursor-default'}
                >
                  Acabados
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="validacion"
                  checked={editedData.resultados.validacionFormula}
                  onCheckedChange={(checked) =>
                    updateNestedValue(
                      ['resultados', 'validacionFormula'],
                      checked
                    )
                  }
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="validacion"
                  className={isEditing ? 'cursor-pointer' : 'cursor-default'}
                >
                  Validación de Formula
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="apariencia"
                  checked={editedData.resultados.apariencia}
                  onCheckedChange={(checked) =>
                    updateNestedValue(['resultados', 'apariencia'], checked)
                  }
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="apariencia"
                  className={isEditing ? 'cursor-pointer' : 'cursor-default'}
                >
                  Apariencia
                </Label>
              </div>

              <Separator className="my-4 col-span-3" />

              <div className="space-y-2 col-span-3">
                <Label htmlFor="siguientes">Siguientes Pasos:</Label>
                <Input
                  id="siguientes"
                  value={siguientesPasos}
                  onChange={(e) => setSiguientesPasos(e.target.value)}
                  placeholder="Ingrese los siguientes pasos..."
                  readOnly={!isEditing}
                  className={`min-h-20 ${!isEditing ? 'bg-muted' : ''}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
