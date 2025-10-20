'use client'

import { newBatch } from '@/app/dashboard/add-inspection/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

// Esquema de validación para nuevo lote
const batchSchema = z.object({
  batch_code: z.string().min(1, 'El código de lote es requerido'),
  production_date: z.string().min(1, 'La fecha de producción es requerida'),
  notes: z.string().optional(),
  target_lot_weight_kg: z
    .number()
    .gt(0, 'El peso del lote debe ser mayor que cero'),
  target_weight_per_r: z
    .number()
    .gt(0, 'El peso objetivo por rollo debe ser mayor que cero'),
})

export type BatchFormData = z.infer<typeof batchSchema>

interface NewBatchProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onBatchCreated: (batch: { id: string; code: string }) => void
}

export function NewBatch({
  isOpen,
  onOpenChange,
  onBatchCreated,
}: NewBatchProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BatchFormData>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      batch_code: '',
      production_date: '',
      notes: '',
      target_lot_weight_kg: undefined,
      target_weight_per_r: undefined,
    },
  })

  const onSubmit = async (
    data: BatchFormData,
    event?: React.BaseSyntheticEvent
  ) => {
    // Prevenir que el evento se propague al formulario padre
    event?.preventDefault()
    event?.stopPropagation()

    try {
      console.log('Datos del nuevo lote:', data)

      // Mostrar notificación de carga
      toast.loading('Creando lote...', { id: 'create-batch' })

      // Aquí irá la lógica para guardar el lote
      const formData = new FormData()
      formData.append('batch_code', data.batch_code)
      formData.append('production_date', data.production_date)
      formData.append('notes', data.notes ?? '')
      formData.append(
        'target_lot_weight_kg',
        data.target_lot_weight_kg.toString()
      )
      formData.append(
        'target_weight_per_r',
        data.target_weight_per_r.toString()
      )

      const result = await newBatch(formData)

      // Notificar al componente padre con el nuevo lote (usando el id real de la BD)
      if (result.batch) {
        onBatchCreated({
          id: result.batch.id,
          code: result.batch.batch_code,
        })
      }

      // Mostrar notificación de éxito
      toast.success('Lote creado exitosamente', { id: 'create-batch' })

      // Limpiar el formulario y cerrar el diálogo
      reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error al crear lote:', error)
      // Mostrar notificación de error
      toast.error('Error al crear el lote. Por favor, intenta nuevamente.', {
        id: 'create-batch',
      })
    }
  }

  const handleCancel = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="h-7">
          <IconPlus className="h-3 w-3" />
          <span className="ml-1">Nuevo lote</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo lote</DialogTitle>
          <DialogDescription>
            Completa la información para agregar un nuevo lote al sistema
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit(onSubmit)(e)
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* Código de Lote */}
            <div className="grid gap-2">
              <Label htmlFor="batch_code">
                Código de Lote <span className="text-destructive">*</span>
              </Label>
              <Input
                id="batch_code"
                type="text"
                placeholder="Ej: L004"
                disabled={isSubmitting}
                {...register('batch_code')}
                className={errors.batch_code ? 'border-red-500' : ''}
              />
              {errors.batch_code && (
                <p className="text-sm text-red-500">
                  {errors.batch_code.message}
                </p>
              )}
            </div>

            {/* Fecha de Producción */}
            <div className="grid gap-2">
              <Label htmlFor="production_date">
                Fecha de Producción <span className="text-destructive">*</span>
              </Label>
              <Input
                id="production_date"
                type="date"
                disabled={isSubmitting}
                {...register('production_date')}
                className={errors.production_date ? 'border-red-500' : ''}
              />
              {errors.production_date && (
                <p className="text-sm text-red-500">
                  {errors.production_date.message}
                </p>
              )}
            </div>

            {/* Peso Objetivo del Lote (kg) */}
            <div className="grid gap-2">
              <Label htmlFor="target_lot_weight_kg">
                Peso Objetivo del Lote (kg){' '}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="target_lot_weight_kg"
                type="number"
                step="0.01"
                placeholder="Ej: 1000"
                disabled={isSubmitting}
                {...register('target_lot_weight_kg', { valueAsNumber: true })}
                className={errors.target_lot_weight_kg ? 'border-red-500' : ''}
              />
              {errors.target_lot_weight_kg && (
                <p className="text-sm text-red-500">
                  {errors.target_lot_weight_kg.message}
                </p>
              )}
            </div>

            {/* Peso Objetivo por Rollo */}
            <div className="grid gap-2">
              <Label htmlFor="target_weight_per_r">
                Peso Objetivo por Rollo{' '}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="target_weight_per_r"
                type="number"
                step="0.01"
                placeholder="Ej: 50"
                disabled={isSubmitting}
                {...register('target_weight_per_r', { valueAsNumber: true })}
                className={errors.target_weight_per_r ? 'border-red-500' : ''}
              />
              {errors.target_weight_per_r && (
                <p className="text-sm text-red-500">
                  {errors.target_weight_per_r.message}
                </p>
              )}
            </div>
          </div>

          {/* Notas - Campo completo */}
          <div className="grid gap-2">
            <Label htmlFor="notes">Notas</Label>
            <Input
              id="notes"
              type="text"
              placeholder="Notas adicionales (opcional)"
              disabled={isSubmitting}
              {...register('notes')}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear Lote'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
