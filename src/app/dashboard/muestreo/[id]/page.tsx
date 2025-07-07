import { createClient } from "@/app/utils/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset } from "@/components/ui/sidebar"
import { Table } from "lucide-react"
import Link from "next/link"
import MuestreoTables from "./components/tables"

type SchemaType = {
  pelicula_id: {
    id: string
    lote: {
      num: string
      peso_objetivo: number
      peso_rollo: number
    }
    configuracion: string
  }
}

export default async function MuestreoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createClient()

  const { data: parametro, error: parametroError } = await supabase
    .from("parametros")
    .select("pelicula_id (id, lote (num, peso_objetivo, peso_rollo), configuracion)")
    .eq("id", id)
    .single()

  if (parametroError) {
    console.error("Error fetching parametro:", parametroError)
    return <div>Error loading parametro</div>
  }

  const data = parametro as unknown as SchemaType

  return (
    <SidebarInset>
      <SiteHeader route="Muestreo de Pelicula" />
      <div className="flex flex-col items-center gap-10 px-8 py-8">
        <h2 className="text-5xl font-bold">Muestreo</h2>
        <Link href={`/dashboard/peliculas/${data?.pelicula_id?.id}`}>
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
                Lote: <strong>{data?.pelicula_id?.lote?.num}</strong>
              </p>
              <p className="text-muted-foreground">
                Peso Objetivo: <strong>{data?.pelicula_id?.lote?.peso_objetivo}</strong>
              </p>
              <p className="text-muted-foreground">
                Peso Rollo: <strong>{data?.pelicula_id?.lote?.peso_rollo}</strong>
              </p>
              <p className="text-muted-foreground">
                Configuracion: <strong>{data?.pelicula_id?.configuracion}</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="w-full" />

        <MuestreoTables
          category={data?.pelicula_id?.configuracion}
          peso_objetivo={data?.pelicula_id?.lote?.peso_objetivo}
          peso_rollo={data?.pelicula_id?.lote?.peso_rollo}
          id={id}
        />
      </div>
    </SidebarInset>
  )
}
