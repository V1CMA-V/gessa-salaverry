import { createClient } from '@/utils/supabase/server'
import {
  IconCalendar,
  IconFlask,
  IconPackage,
  IconUser,
} from '@tabler/icons-react'
import { notFound } from 'next/navigation'
import { BatchInfoDialog } from './batch-info-dialog'
import { PageTitle } from './page-title'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Separator } from './ui/separator'

export default async function GeneralInformationInspection({
  id,
}: {
  id: string
}) {
  const supabase = await createClient()

  // Obtener los datos de la inspección
  const { data: inspection, error } = await supabase
    .from('inspections')
    .select(
      `
      id,
      customer,
      inspection_date,
      thickness_microns,
      width_cm,
      roll_config,
      batch_id(batch_code, notes, target_lot_weight_kg, target_weight_per_roll_kg),
      formulation_code,
      feature,
      note,
      created_at,
      created_by(full_name, email)
    `
    )
    .eq('id', id)
    .single()

  if (error || !inspection) {
    notFound()
  }

  // Normalizar datos anidados
  const normalizedInspection = {
    ...inspection,
    batch_id: Array.isArray(inspection.batch_id)
      ? inspection.batch_id[0] ?? null
      : inspection.batch_id,
    created_by: Array.isArray(inspection.created_by)
      ? inspection.created_by[0] ?? null
      : inspection.created_by,
  }

  return (
    <>
      <PageTitle
        title={`Información General para la película de: ${normalizedInspection.customer}`}
      />

      <div className="px-4 lg:px-6 space-y-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>
              Detalles generales de la inspección
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconUser className="size-4" />
                  <span>Cliente</span>
                </div>
                <p className="text-lg font-semibold">
                  {normalizedInspection.customer}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCalendar className="size-4" />
                  <span>Fecha de Inspección</span>
                </div>
                <Badge variant="outline" className="text-base font-medium">
                  {normalizedInspection.inspection_date}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconPackage className="size-4" />
                  <span>Lote</span>
                </div>
                <BatchInfoDialog
                  batchCode={normalizedInspection.batch_id?.batch_code || 'N/A'}
                  batchInfo={normalizedInspection.batch_id}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconFlask className="size-4" />
                  <span>Código de Formulación</span>
                </div>
                <Badge variant="outline" className="text-base font-medium">
                  {normalizedInspection.formulation_code}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Calibre (Micrones)
                </p>
                <p className="text-base font-medium">
                  {normalizedInspection.thickness_microns} μm
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Ancho (cm)</p>
                <p className="text-base font-medium">
                  {normalizedInspection.width_cm} cm
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Configuración de Rollo
                </p>
                <Badge variant="default" className="capitalize">
                  {normalizedInspection.roll_config}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="flex flex-col md:flex-row w-full gap-14">
          {/* Características */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Características</CardTitle>
              <CardDescription>
                Características del producto inspeccionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {normalizedInspection.feature}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notas */}
          {normalizedInspection.note && (
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Notas</CardTitle>
                <CardDescription>
                  Observaciones adicionales de la inspección
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">
                  {normalizedInspection.note}
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Información de Auditoría */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Auditoría</CardTitle>
            <CardDescription>
              Detalles de creación y responsable
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Creado por</p>
                <div>
                  <p className="text-base font-medium">
                    {normalizedInspection.created_by?.full_name || 'N/A'}
                  </p>
                  {normalizedInspection.created_by?.email && (
                    <p className="text-sm text-muted-foreground">
                      {normalizedInspection.created_by.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Fecha de Creación
                </p>
                <p className="text-base font-medium">
                  {new Date(normalizedInspection.created_at).toLocaleDateString(
                    'es-ES',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
