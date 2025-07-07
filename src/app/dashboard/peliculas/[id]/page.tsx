import { createClient } from "@/app/utils/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarInset } from "@/components/ui/sidebar"
import { Table } from "lucide-react"
import Link from "next/link"
import LiberationParams from "./components/liberacion-params"
import ValidationParam from "./components/validation"

export const metadata = {
  title: "Muestreo de Pelicula",
  description: "Muestreo de Pelicula"
}

export default async function PeliculaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createClient()

  const { data: pelicula, error: peliculaError } = await supabase.from("peliculas").select("*, lote (num)").eq("id", id)
  if (peliculaError) {
    console.error("Error fetching pelicula:", peliculaError)
    return <div>Error loading pelicula</div>
  }

  const { data: parametros, error: parametrosError } = await supabase
    .from("parametros")
    .select("*")
    .eq("pelicula_id", id)

  if (parametrosError) {
    console.error("Error fetching parametros:", parametrosError)
    return <div>Error loading parametros</div>
  }

  const peliculaData = pelicula?.[0]
  const parametrosLiberacion = parametros?.[0]
  const parametrosValidacion = parametros?.slice(1)

  return (
    <SidebarInset>
      <SiteHeader route={`Muestreo de Pelicula ${peliculaData?.fecha}`} />
      <div className="flex flex-col items-center gap-10 px-8 py-8">
        <div className="flex md:flex-row  flex-col items-center gap-2 justify-between w-full max-w-xl">
          <h2 className="text-2xl font-bold">Informacion General</h2>
          <Link href={`/dashboard/peliculas/${id}/muestreo`}>
            <Button variant="outline" className="cursor-pointer">
              <Table className="mr-2 h-4 w-4" /> Ver Muestreo
            </Button>
          </Link>
        </div>
        <Separator className="w-full" />
        <div className="flex md:flex-row items-center justify-between flex-col gap-4 w-full md:max-w-5xl">
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
          <Separator className="w-full  md:hidden" />
          <Separator orientation="vertical" className=" hidden md:block" />

          <div className="flex flex-col gap-2 p-4 ">
            <p className="text-muted-foreground">
              Codigo de Formulacion: <strong>{peliculaData?.codigo_formulacion}</strong>
            </p>
            <p className="text-muted-foreground">
              Lote: <strong>{peliculaData?.lote?.num}</strong>
            </p>
            <p className="text-muted-foreground">
              Configuracion de Rollos por Flecha: <strong>{peliculaData?.configuracion}</strong>
            </p>
          </div>
        </div>
        <Separator className="w-full" />

        {/* Parametros de Liberacion */}
        {parametrosLiberacion ? (
          <LiberationParams parametrosLiberacion={parametrosLiberacion} ID={id} />
        ) : (
          <div className="flex flex-col items-center gap-4 w-full p-4">
            <p className="text-muted-foreground">No hay parametros de liberacion disponibles.</p>
            <Link href={`/dashboard/peliculas/${id}/liberacion/crear`}>
              <Button variant="outline" className="cursor-pointer">
                Crear Parametros de Liberacion
              </Button>
            </Link>
          </div>
        )}

        {/* Parametros de Validacion */}
        {parametrosValidacion && parametrosValidacion.length > 0 ? (
          <ValidationParam parametrosValidacion={parametrosValidacion} />
        ) : (
          <div className="flex flex-col items-center gap-4 w-full p-4">
            <p className="text-muted-foreground">No hay parametros de validacion disponibles.</p>
          </div>
        )}

        <Link href={`/dashboard/peliculas/${id}/liberacion/crear`}>
          <Button variant="outline" className="cursor-pointer">
            Crear Parametros de Validacion
          </Button>
        </Link>
      </div>
    </SidebarInset>
  )
}
