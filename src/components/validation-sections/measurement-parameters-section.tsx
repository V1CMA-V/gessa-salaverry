'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

interface MeasurementParametersSectionProps {
  id: string
  isEditing?: boolean
  data?: {
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
  }
  calibre?: string
  onDataChange?: (path: string[], value: number) => void
}

export function MeasurementParametersSection({
  id,
  isEditing = false,
  data = {
    encogimientos: {
      estatico: { kof: 0, dinamico: 0 },
      longitudinal: { kof: 0, dinamico: 0 },
    },
    coeficienteFriccion: { nivel: 0 },
    campoElectrostatico: { nivel: 0 },
    valoresAceptables: {
      maximo: 0,
      minimo: 0,
      moda: 0,
      rango: 0,
    },
  },
  calibre,
  onDataChange,
}: MeasurementParametersSectionProps) {
  const handleChange = (path: string[], value: number) => {
    if (onDataChange) {
      onDataChange(path, value)
    }
  }

  // Calcular valores aceptables basados en el calibre
  const calcularValoresAceptables = () => {
    if (calibre) {
      const calibreNum = parseFloat(calibre)
      if (!isNaN(calibreNum)) {
        // Calcular rango +/- = calibre * 0.1
        const rangoPlusMinus = calibreNum * 0.1

        // Calcular valores
        const minimo = calibreNum - rangoPlusMinus
        const maximo = calibreNum + rangoPlusMinus
        const moda = calibreNum
        const rango = maximo - minimo

        return { minimo, maximo, moda, rango }
      }
    }
    return data.valoresAceptables
  }

  const valoresCalculados = calcularValoresAceptables()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Encogimientos */}
      <Card>
        <CardHeader className="">
          <CardTitle className="text-sm">PARÁMETROS DE MEDICIÓN</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <CardTitle className="text-sm">ENCOGIMIENTOS:</CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">KOF Estático</span>
              <Input
                type="number"
                step="0.1"
                value={data.encogimientos.estatico.kof}
                onChange={(e) =>
                  handleChange(
                    ['encogimientos', 'estatico', 'kof'],
                    parseFloat(e.target.value) || 0
                  )
                }
                readOnly={!isEditing}
                className={`w-24 text-center ${!isEditing ? 'bg-muted' : ''}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">KOF Dinámico</span>
              <Input
                type="number"
                step="0.1"
                value={data.encogimientos.estatico.dinamico}
                onChange={(e) =>
                  handleChange(
                    ['encogimientos', 'estatico', 'dinamico'],
                    parseFloat(e.target.value) || 0
                  )
                }
                readOnly={!isEditing}
                className={`w-24 text-center ${!isEditing ? 'bg-muted' : ''}`}
              />
            </div>
            <Separator />
            <CardTitle className="text-sm">COEFICIENTE DE FRICCION:</CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Encog. Trans</span>
              <Input
                type="number"
                step="0.1"
                value={data.encogimientos.estatico.kof}
                onChange={(e) =>
                  handleChange(
                    ['encogimientos', 'estatico', 'kof'],
                    parseFloat(e.target.value) || 0
                  )
                }
                readOnly={!isEditing}
                className={`w-24 text-center ${!isEditing ? 'bg-muted' : ''}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Encog. Long</span>
              <Input
                type="number"
                step="0.1"
                value={data.encogimientos.estatico.dinamico}
                onChange={(e) =>
                  handleChange(
                    ['encogimientos', 'estatico', 'dinamico'],
                    parseFloat(e.target.value) || 0
                  )
                }
                readOnly={!isEditing}
                className={`w-24 text-center ${!isEditing ? 'bg-muted' : ''}`}
              />
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">CAMPO ELECTROSTÁTICO:</CardTitle>
                <CardDescription className="mb-2">
                  Nivel menor a 3kv/in
                </CardDescription>
              </div>
              <Input
                type="number"
                step="0.1"
                value={data.campoElectrostatico.nivel}
                onChange={(e) =>
                  handleChange(
                    ['campoElectrostatico', 'nivel'],
                    parseFloat(e.target.value) || 0
                  )
                }
                readOnly={!isEditing}
                className={`w-24 text-center ${!isEditing ? 'bg-muted' : ''}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valores Aceptables */}
      <Card>
        <CardHeader className="">
          <CardTitle className="text-sm">VALORES ACEPTABLES CALIBRE</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>MÁXIMO</Label>
              <Input
                type="number"
                value={valoresCalculados.maximo}
                onChange={(e) =>
                  handleChange(
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
                value={valoresCalculados.minimo}
                onChange={(e) =>
                  handleChange(
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
                value={valoresCalculados.moda}
                onChange={(e) =>
                  handleChange(
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
                value={valoresCalculados.rango}
                onChange={(e) =>
                  handleChange(
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
  )
}
