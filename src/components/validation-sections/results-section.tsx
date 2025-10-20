'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

interface ResultsSectionProps {
  id: string
  isEditing?: boolean
  data?: {
    muestreoDentroLimites: boolean
    rangoAceptado: boolean
    acabados: boolean
    validacionFormula: boolean
    apariencia: boolean
  }
  siguientesPasos?: string
  onDataChange?: (field: string, value: boolean) => void
  onSiguientesPasosChange?: (value: string) => void
}

export function ResultsSection({
  id,
  isEditing = false,
  data = {
    muestreoDentroLimites: false,
    rangoAceptado: false,
    acabados: false,
    validacionFormula: false,
    apariencia: false,
  },
  siguientesPasos = '',
  onDataChange,
  onSiguientesPasosChange,
}: ResultsSectionProps) {
  const handleCheckboxChange = (field: string, value: boolean) => {
    if (onDataChange) {
      onDataChange(field, value)
    }
  }

  return (
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
              checked={data.muestreoDentroLimites}
              onCheckedChange={(checked) =>
                handleCheckboxChange(
                  'muestreoDentroLimites',
                  checked as boolean
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
              checked={data.rangoAceptado}
              onCheckedChange={(checked) =>
                handleCheckboxChange('rangoAceptado', checked as boolean)
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
              checked={data.acabados}
              onCheckedChange={(checked) =>
                handleCheckboxChange('acabados', checked as boolean)
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
              checked={data.validacionFormula}
              onCheckedChange={(checked) =>
                handleCheckboxChange('validacionFormula', checked as boolean)
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
              checked={data.apariencia}
              onCheckedChange={(checked) =>
                handleCheckboxChange('apariencia', checked as boolean)
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
              onChange={(e) => {
                if (onSiguientesPasosChange) {
                  onSiguientesPasosChange(e.target.value)
                }
              }}
              placeholder="Ingrese los siguientes pasos..."
              readOnly={!isEditing}
              className={`min-h-20 ${!isEditing ? 'bg-muted' : ''}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
