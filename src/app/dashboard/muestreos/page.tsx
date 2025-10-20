import { PageTitle } from '@/components/page-title'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import {
  CalendarIcon,
  FlaskConicalIcon,
  PackageIcon,
  UserIcon,
} from 'lucide-react'
import Link from 'next/link'

export default async function MuestreoPage() {
  const supabase = await createClient()
  const { data, error: fetchError } = await supabase
    .from('inspections')
    .select(
      'id, customer, inspection_date, roll_config, batch_id(batch_code), feature, formulation_code, created_by(full_name), thickness_microns'
    )
    .order('inspection_date', { ascending: false })

  if (fetchError) {
    console.error('Error fetching inspections:', fetchError)
    return <div>Error al cargar las inspecciones</div>
  }

  const normalizedData = (data ?? []).map((row: any) => ({
    ...row,
    batch_id: Array.isArray(row.batch_id)
      ? row.batch_id[0] ?? null
      : row.batch_id,
    created_by: Array.isArray(row.created_by)
      ? row.created_by[0] ?? null
      : row.created_by,
  }))

  return (
    <>
      <PageTitle title="Inspecciones de Muestreo" />
      <div className="px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {normalizedData.map((inspection: any) => (
            <Link
              key={inspection.id}
              href={`/dashboard/muestreos/${inspection.id}`}
              className="transition-all hover:scale-[1.02]"
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      {inspection.customer}
                    </CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {inspection.roll_config}
                    </Badge>
                  </div>
                  <CardDescription>
                    {inspection.feature || 'Sin característica'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <PackageIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Lote:</span>
                    <span className="font-medium">
                      {inspection.batch_id?.batch_code || 'Sin lote'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <FlaskConicalIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Formulación:</span>
                    <span className="font-medium">
                      {inspection.formulation_code || 'N/A'}
                    </span>
                  </div>

                  {inspection.thickness_microns && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Calibre:</span>
                      <span className="font-medium">
                        {inspection.thickness_microns} µm
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {new Date(inspection.inspection_date).toLocaleDateString(
                        'es-ES',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm pt-2 border-t">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Creado por:</span>
                    <span className="font-medium">
                      {inspection.created_by?.full_name || 'Desconocido'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {normalizedData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay inspecciones registradas
            </p>
          </div>
        )}
      </div>
    </>
  )
}
