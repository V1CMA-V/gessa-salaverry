import { Database } from "@/app/types/database"
import { createClient } from "@/app/utils/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset } from "@/components/ui/sidebar"
import { Table } from "lucide-react"
import Link from "next/link"
import MuestreoTables from "./components/tables"

type PeliculaType = Database["public"]["Tables"]["peliculas"]["Row"]
type LoteType = Database["public"]["Tables"]["lote"]["Row"]
type SchemaType = PeliculaType & { lote: LoteType }

export const metadata = {
  title: "Muestreo de Pelicula",
  description: "Muestreo de Pelicula"
}

export default async function MuestreoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createClient()

  const { data: pelicula, error: peliculaError } = await supabase
    .from("peliculas")
    .select("lote (num, peso_objetivo, peso_rollo), *")
    .eq("id", id)
    .single()

  if (peliculaError) {
    console.error("Error fetching pelicula:", peliculaError)
    return <div>Error loading pelicula</div>
  }

  const data = pelicula as SchemaType
  return (
    <SidebarInset>
      <SiteHeader route="Muestreo de Pelicula" />
      <div className="flex flex-col items-center gap-10 px-8 py-8">
        <h2 className="text-5xl font-bold">Muestreo</h2>
        <Link href={`/dashboard/peliculas/${id}`}>
          <Button variant="outline" className="cursor-pointer">
            <Table className="mr-2 h-4 w-4" /> Ver Pelicula
          </Button>
        </Link>

        <Card className="w-full max-w-xl m-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Informacion General</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">
                Lote: <strong>{data?.lote?.num}</strong>
              </p>
              <p className="text-muted-foreground">
                Peso Objetivo: <strong>{data?.lote?.peso_objetivo}</strong>
              </p>
              <p className="text-muted-foreground">
                Peso Rollo: <strong>{data?.lote?.peso_rollo}</strong>
              </p>
              <p className="text-muted-foreground">
                Configuracion: <strong>{data?.configuracion}</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="w-full" />

        <MuestreoTables
          category={data?.configuracion}
          peso_objetivo={data?.lote?.peso_objetivo}
          peso_rollo={data?.lote?.peso_rollo}
          id={id}
        />
      </div>
    </SidebarInset>
  )
}
