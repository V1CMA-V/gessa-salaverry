import { createClient } from "@/app/utils/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarInset } from "@/components/ui/sidebar"
import { Table } from "lucide-react"
import Link from "next/link"
import Parameters from "./components/parameters"

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

  // Cambiar la lógica: el último parámetro es de liberación, el resto son de validación
  const parametrosLiberacion = parametros && parametros.length > 0 ? parametros[parametros.length - 1] : null
  const parametrosValidacion = parametros && parametros.length > 1 ? parametros.slice(0, -1) : []

  return (
    <SidebarInset>
      <SiteHeader route={`Muestreo de Pelicula ${peliculaData?.fecha}`} />
      <div className="flex flex-col items-center gap-10 px-8 py-8">
        <div className="flex md:flex-row flex-col items-center gap-8 justify-between w-full max-w-xl">
          <h2 className="text-5xl font-bold text-center">Informacion General</h2>
          <Link href={`/dashboard/peliculas/${id}/muestreo`}>
            <Button variant="outline" className="cursor-pointer">
              <Table className="mr-2 h-4 w-4" /> Ver Muestreo
            </Button>
          </Link>
        </div>
        <Separator className="w-full" />
        <div className="flex md:flex-row items-center justify-between flex-col gap-4 w-full md:max-w-5xl">
          <div className="flex flex-col gap-2 p-4 w-full">
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

          <div className="flex flex-col gap-2 p-4 w-full">
            <p className="text-muted-foreground">
              Codigo de Formulacion: <strong>{peliculaData?.codigo_formulacion}</strong>
            </p>
            <p className="text-muted-foreground">
              Lote: <strong>{peliculaData?.lote?.num}</strong>
            </p>
            <p className="text-muted-foreground">
              Código del Artículo: <strong>{peliculaData?.codigo_articulo}</strong>
            </p>
            <p className="text-muted-foreground">
              Configuracion de Rollos por Flecha: <strong>{peliculaData?.configuracion}</strong>
            </p>
          </div>
        </div>
        <Separator className="w-full" />

        <Parameters
          parametros={parametros}
          parametrosLiberacion={parametrosLiberacion}
          parametrosValidacion={parametrosValidacion}
          peliculaId={id}
        />
      </div>
    </SidebarInset>
  )
}
