'use client'

import { GetAnalysts } from '@/app/dashboard/inspection/[id]/actions'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface GeneralInfoSectionProps {
  id: string
  isEditing?: boolean
  data?: {
    id: string
    full_name: string
    horaLiberacion: string
    operadorMaquina: string
  }
  onDataChange?: (field: string, value: string) => void
}

export function GeneralInfoSection({
  id,
  isEditing = false,
  data = {
    id: '',
    full_name: '',
    horaLiberacion: '',
    operadorMaquina: '',
  },
  onDataChange,
}: GeneralInfoSectionProps) {
  const [analysts, setAnalysts] = useState<{ id: string; full_name: string }[]>(
    []
  )
  const [isLoadingAnalysts, setIsLoadingAnalysts] = useState(true)

  useEffect(() => {
    async function fetchAnalysts() {
      try {
        const data = await GetAnalysts()
        setAnalysts(data)
      } catch (error) {
        console.error('Error loading analysts:', error)
      } finally {
        setIsLoadingAnalysts(false)
      }
    }
    fetchAnalysts()
  }, [])

  const handleChange = (field: string, value: string) => {
    if (onDataChange) {
      onDataChange(field, value)
    }
  }

  // Función para formatear la hora al formato HH:mm
  const formatTimeForInput = (time: string) => {
    if (!time) return ''

    // Si ya está en formato correcto (HH:mm), devuélvelo tal cual
    if (/^\d{2}:\d{2}$/.test(time)) return time

    // Si está en formato H:mm o H:m, agregar ceros
    const parts = time.split(':')
    if (parts.length === 2) {
      const hours = parts[0].padStart(2, '0')
      const minutes = parts[1].padStart(2, '0')
      return `${hours}:${minutes}`
    }

    return time
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Información General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="analista">Analista de Calidad:</Label>
            <Select
              value={data.id}
              onValueChange={(value) => handleChange('id', value)}
              disabled={!isEditing || isLoadingAnalysts}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingAnalysts ? 'Cargando...' : 'Selecciona un analista'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {analysts.map((analyst) => (
                  <SelectItem key={analyst.id} value={analyst.id}>
                    {analyst.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hora">Hora de Liberación:</Label>
            <Input
              id="hora"
              type="time"
              value={formatTimeForInput(data.horaLiberacion)}
              onChange={(e) => handleChange('horaLiberacion', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? 'bg-muted' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operador">Operador de Máquina:</Label>
            <Input
              id="operador"
              value={data.operadorMaquina}
              onChange={(e) => handleChange('operadorMaquina', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? 'bg-muted' : ''}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
