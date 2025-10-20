'use client'

import {
  getBatches,
  newInspection,
} from '@/app/dashboard/add-inspection/actions'
import { NewBatch } from '@/components/new-batch'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Textarea } from './ui/textarea'

// Esquema de validación para inspección
const inspectionSchema = z.object({
  customer: z.string().min(1, 'El customer es requerido'),
  inspection_date: z.string().min(1, 'La fecha de inspección es requerida'),
  thickness_microns: z.string().min(1, 'El calibre es requerido'),
  width_cm: z.string().min(1, 'La medida en cm es requerida'),
  roll_config: z.string().min(1, 'La configuración de rollo es requerida'),
  batch_id: z.string().min(1, 'El lote es requerido'),
  formulation_code: z.string().min(1, 'El código de formulación es requerido'),
  feature: z.string().min(1, 'Las características son requeridas'),
  nota: z.string().optional(),
})

type InspectionFormData = z.infer<typeof inspectionSchema>

interface Batch {
  id: string
  batch_code: string
}

export default function NewInspection() {
  // Estado para batch_ids disponibles
  const [batches, setBatches] = useState<Batch[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoadingBatches, setIsLoadingBatches] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionSchema),
    defaultValues: {
      customer: '',
      inspection_date: '',
      thickness_microns: '',
      width_cm: '',
      roll_config: '',
      batch_id: '',
      formulation_code: '',
      feature: '',
      nota: '',
    },
  })

  const roll_config = watch('roll_config')
  const feature = watch('feature')
  const batch_id = watch('batch_id')

  // Cargar batch_ids al montar el componente
  useEffect(() => {
    const loadBatches = async () => {
      try {
        setIsLoadingBatches(true)
        const data = await getBatches()
        setBatches(data)
      } catch (error) {
        console.error('Error al cargar batch_ids:', error)
        toast.error('Error al cargar los batch_ids')
      } finally {
        setIsLoadingBatches(false)
      }
    }

    loadBatches()
  }, [])

  const handleBatchCreated = async (batch: { id: string; code: string }) => {
    // Recargar los batch_ids desde la base de datos
    try {
      const data = await getBatches()
      setBatches(data)
      // Seleccionar automáticamente el nuevo batch_id (usando el id)
      setValue('batch_id', batch.id)
      toast.success('Lote agregado y seleccionado')
    } catch (error) {
      console.error('Error al recargar batch_ids:', error)
      toast.error('Error al actualizar la lista de batch_ids')
    }
  }

  const onSubmit = async (data: InspectionFormData) => {
    try {
      // Mostrar notificación de carga
      toast.loading('Creando inspección...', { id: 'create-inspection' })

      // Aquí irá la lógica para guardar la inspección
      // Por ejemplo: await createInspection(data)
      const formData = new FormData()
      formData.append('customer', data.customer)
      formData.append('formulation_code', data.formulation_code)
      formData.append('width_cm', data.width_cm)
      formData.append('batch_id', data.batch_id)
      formData.append('feature', data.feature)
      formData.append('roll_config', data.roll_config)
      formData.append('inspection_date', data.inspection_date)
      formData.append('thickness_microns', data.thickness_microns)
      formData.append('nota', data.nota ?? '')

      await newInspection(formData)

      // Mostrar notificación de éxito
      toast.success('Inspección creada exitosamente', {
        id: 'create-inspection',
      })

      // Limpiar el formulario
      reset()
    } catch (error) {
      console.error('Error al crear inspección:', error)
      // Mostrar notificación de error
      toast.error(
        'Error al crear la inspección. Por favor, intenta nuevamente.',
        {
          id: 'create-inspection',
        }
      )
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Nueva Inspección</CardTitle>
          <CardDescription>
            Completa el formulario para agregar una nueva inspección al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* customer */}
              <div className="grid gap-3">
                <Label htmlFor="customer">
                  Cliente <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customer"
                  type="text"
                  placeholder="Nombre del customer"
                  disabled={isSubmitting}
                  {...register('customer')}
                  className={errors.customer ? 'border-red-500' : ''}
                />
                {errors.customer && (
                  <p className="text-sm text-red-500">
                    {errors.customer.message}
                  </p>
                )}
              </div>

              {/* Fecha de Inspección */}
              <div className="grid gap-2">
                <Label htmlFor="inspection_date">
                  Fecha de Inspección{' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="inspection_date"
                  type="date"
                  disabled={isSubmitting}
                  {...register('inspection_date')}
                  className={errors.inspection_date ? 'border-red-500' : ''}
                />
                {errors.inspection_date && (
                  <p className="text-sm text-red-500">
                    {errors.inspection_date.message}
                  </p>
                )}
              </div>

              {/* Código de Formulación */}
              <div className="grid gap-3">
                <Label htmlFor="formulation_code">
                  Código de Formulación{' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="formulation_code"
                  type="text"
                  placeholder="Ej: F001"
                  disabled={isSubmitting}
                  {...register('formulation_code')}
                  className={errors.formulation_code ? 'border-red-500' : ''}
                />
                {errors.formulation_code && (
                  <p className="text-sm text-red-500">
                    {errors.formulation_code.message}
                  </p>
                )}
              </div>

              {/* batch_id */}
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="batch_id">
                    Lote <span className="text-destructive">*</span>
                  </Label>
                  <NewBatch
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onBatchCreated={handleBatchCreated}
                  />
                </div>
                <Select
                  value={batch_id}
                  onValueChange={(value) => setValue('batch_id', value)}
                  disabled={isSubmitting || isLoadingBatches}
                >
                  <SelectTrigger
                    id="batch_id"
                    className={`w-full ${
                      errors.batch_id ? 'border-red-500' : ''
                    }`}
                  >
                    <SelectValue
                      placeholder={
                        isLoadingBatches
                          ? 'Cargando lotes...'
                          : 'Selecciona un lote'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.batch_code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.batch_id && (
                  <p className="text-sm text-red-500">
                    {errors.batch_id.message}
                  </p>
                )}
              </div>

              {/* width_cm */}
              <div className="grid gap-3">
                <Label htmlFor="width_cm">
                  Medida en cm <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="width_cm"
                  type="text"
                  placeholder="Ej: 30"
                  disabled={isSubmitting}
                  {...register('width_cm')}
                  className={errors.width_cm ? 'border-red-500' : ''}
                />
                {errors.width_cm && (
                  <p className="text-sm text-red-500">
                    {errors.width_cm.message}
                  </p>
                )}
              </div>
              {/* thickness_microns */}
              <div className="grid gap-3">
                <Label htmlFor="thickness_microns">
                  Calibre en micrones{' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="thickness_microns"
                  type="text"
                  placeholder="Ej: 30"
                  disabled={isSubmitting}
                  {...register('thickness_microns')}
                  className={errors.thickness_microns ? 'border-red-500' : ''}
                />
                {errors.thickness_microns && (
                  <p className="text-sm text-red-500">
                    {errors.thickness_microns.message}
                  </p>
                )}
              </div>

              {/* Características de Papel */}
              <div className="grid gap-3">
                <Label htmlFor="feature">
                  Características de Papel{' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={feature}
                  onValueChange={(value) => setValue('feature', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="feature"
                    className={`w-full ${
                      errors.feature ? 'border-red-500' : ''
                    }`}
                  >
                    <SelectValue placeholder="Selecciona una configuración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Punteado">Punteado</SelectItem>
                    <SelectItem value="Abierto por un lado">
                      Abierto por un lado
                    </SelectItem>
                    <SelectItem value="Abierto por dos lados">
                      Abierto por dos lados
                    </SelectItem>
                    <SelectItem value="Tratado">Tratado</SelectItem>
                  </SelectContent>
                </Select>
                {errors.feature && (
                  <p className="text-sm text-red-500">
                    {errors.feature.message}
                  </p>
                )}
              </div>

              {/* Configuracion de Rollo */}
              <div className="grid gap-3">
                <Label htmlFor="roll_config">
                  Configuración de Rollo{' '}
                  <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={roll_config}
                  onValueChange={(value) => setValue('roll_config', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="roll_config"
                    className={`w-full ${
                      errors.roll_config ? 'border-red-500' : ''
                    }`}
                  >
                    <SelectValue placeholder="Selecciona una configuración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sencillo">Sencillo</SelectItem>
                    <SelectItem value="doble">Doble</SelectItem>
                    <SelectItem value="triple">Triple</SelectItem>
                    <SelectItem value="cuadruple">Cuadruple</SelectItem>
                    <SelectItem value="quintuple">Quintuple</SelectItem>
                    <SelectItem value="sextuple">Sextuple</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roll_config && (
                  <p className="text-sm text-red-500">
                    {errors.roll_config.message}
                  </p>
                )}
              </div>
            </div>

            {/* Mas espacio */}
            <div className="grid gap-2">
              <Label htmlFor="nota">Comentarios (opcional)</Label>
              <Textarea
                id="nota"
                disabled={isSubmitting}
                {...register('nota')}
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => reset()}
              >
                Limpiar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar Inspección'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
