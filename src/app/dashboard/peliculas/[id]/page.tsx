import { createClient } from '@/app/utils/supabase/server'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset } from '@/components/ui/sidebar'
import Link from 'next/link'
import LiberationParams from './components/liberacionparams'

export default async function PeliculaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const { data: pelicula, error: peliculaError } = await supabase
    .from('peliculas')
    .select('*')
    .eq('id', id)
  if (peliculaError) {
    console.error('Error fetching pelicula:', peliculaError)
    return <div>Error loading pelicula</div>
  }

  const { data: parametros, error: parametrosError } = await supabase
    .from('parametros')
    .select('*')
    .eq('pelicula_id', id)

  if (parametrosError) {
    console.error('Error fetching parametros:', parametrosError)
    return <div>Error loading parametros</div>
  }

  const peliculaData = pelicula?.[0]
  const parametrosLiberacion = parametros?.[0]
  const parametrosValidacion = parametros?.[1]

  return (
    <SidebarInset>
      <SiteHeader route={`Muestreo de Pelicula ${peliculaData?.fecha}`} />
      <div className="flex flex-col items-center gap-10 px-8 py-8">
        <h2 className="text-2xl font-bold">Informacion General</h2>
        <Separator className="w-full" />
        <div className="flex flex-col gap-4 w-full ">
          <div className="flex flex-col gap-2 p-4">
            <p className="text-muted-foreground">
              Cliente: <strong>{peliculaData?.cliente}</strong>
            </p>
            <p className="text-muted-foreground">
              Fecha: <strong>{peliculaData?.fecha}</strong>
            </p>
            <p className="text-muted-foreground">
              Medida: <strong>{peliculaData?.medida}</strong> cm
            </p>
            <p className="text-muted-foreground">
              Calibre: <strong>{peliculaData?.calibre}</strong> mm
            </p>
            <p className="text-muted-foreground">
              Caracteristica: <strong>{peliculaData?.caracteristicas}</strong>
            </p>
          </div>
          <Separator className="w-full  " />

          <div className="flex flex-col gap-2 p-4 ">
            <p className="text-muted-foreground">
              Codigo de Formulacion:{' '}
              <strong>{peliculaData?.codigo_formulacion}</strong>
            </p>
            <p className="text-muted-foreground">
              Lote: <strong>{peliculaData?.lote}</strong>
            </p>
            <p className="text-muted-foreground">
              Configuracion de Rollos por Flecha:{' '}
              <strong>{peliculaData?.configuracion}</strong>
            </p>
          </div>
          <Separator className="w-full" />
        </div>

        {/* Parametros de Liberacion */}
        {parametrosLiberacion ? (
          <LiberationParams
            parametrosLiberacion={parametrosLiberacion}
            ID={id}
          />
        ) : (
          <div className="flex flex-col items-center gap-4 w-full p-4">
            <p className="text-muted-foreground">
              No hay parametros de liberacion disponibles.
            </p>
            <Link href={`/dashboard/peliculas/${id}/liberacion/crear`}>
              <Button variant="outline">Crear Parametros de Liberacion</Button>
            </Link>
          </div>
        )}

        {/* Parametros de Validacion */}
        {parametrosValidacion ? (
          <p>HHola</p>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full p-4">
            <p className="text-muted-foreground">
              No hay parametros de validacion disponibles.
            </p>
            <Link href={`/dashboard/peliculas/${id}/validacion/crear`}>
              <Button variant="outline">Crear Parametros de Validacion</Button>
            </Link>
          </div>
        )}
      </div>
    </SidebarInset>
  )
}
