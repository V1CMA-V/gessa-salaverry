import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { createClient } from "@/app/utils/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideCalendarDays, PieChart } from "lucide-react"
import Link from "next/link"
import BasicBar from "./charts/basic-bar"
import BasicPie from "./charts/basic-pie"
import BasicSparkLine from "./charts/basic-sparkline"
import { Button } from "./ui/button"

export async function SectionCards() {
  const supabase = await createClient()

  const { data: peliculas, error } = await supabase.from("peliculas").select("*")

  if (error) {
    console.error("Error fetching peliculas:", error)
    return <div>Error loading peliculas</div>
  }

  const fechaHoy = new Date()
  const peliculasEsteMes = peliculas.filter(pelicula => {
    const fechaPelicula = new Date(pelicula.fecha)

    return fechaPelicula.getFullYear() === fechaHoy.getFullYear() && fechaPelicula.getMonth() === fechaHoy.getMonth()
  })

  // Calcular el total de películas
  // Total películas
  const totalPeliculas = peliculas.length

  // Conteo por mes para sparkline
  const peliculasPorMes = Array.from({ length: 12 }, (_, i) => {
    const fechaRef = new Date()
    fechaRef.setDate(1) // evitar problemas con meses de 31/30 días
    fechaRef.setMonth(i)

    const count = peliculas.filter(p => {
      const fechaP = new Date(p.fecha)
      return fechaP.getFullYear() === fechaRef.getFullYear() && fechaP.getMonth() === fechaRef.getMonth()
    }).length
    return count
  })
  const cuantityCategories = Object.groupBy(peliculas, pelicula => pelicula.configuracion)

  // Calcular porcentajes
  const dataPie = Object.entries(cuantityCategories).map(([configuracion, peliculas]) => {
    const cantidad = peliculas?.length || 0
    const porcentaje = totalPeliculas > 0 ? (cantidad / totalPeliculas) * 100 : 0

    return {
      label: configuracion,
      value: parseFloat(porcentaje.toFixed(2)) // Redondear a 2 decimales
    }
  })

  // Para la opción 3: Tasa de crecimiento
  // Películas del mes anterior
  const peliculasMesAnterior = peliculas.filter(pelicula => {
    const fechaPelicula = new Date(pelicula.fecha)
    const fechaHoy = new Date()

    const mesAnterior = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth() - 1, 1)

    return (
      fechaPelicula.getFullYear() === mesAnterior.getFullYear() && fechaPelicula.getMonth() === mesAnterior.getMonth()
    )
  })

  // Dataset para gráfica de barras (configuración por mes)
  const configKeys = Object.keys(cuantityCategories)
  const countsActual = Object.fromEntries(
    configKeys.map(key => [key, peliculasEsteMes.filter(p => p.configuracion === key).length])
  )
  const countsPrev = Object.fromEntries(
    configKeys.map(key => [key, peliculasMesAnterior.filter(p => p.configuracion === key).length])
  )

  const datasetBar = [
    { month: "anterior", ...countsPrev },
    { month: "actual", ...countsActual }
  ]

  const tasaCrecimiento =
    peliculasEsteMes.length && peliculasMesAnterior.length
      ? (((peliculasEsteMes.length - peliculasMesAnterior.length) / peliculasMesAnterior.length) * 100).toFixed(2)
      : 0

  console.log(datasetBar)

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardDescription>Total de Películas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {" "}
            {totalPeliculas}
          </CardTitle>
          <CardAction>
            <Badge variant="default">
              <IconTrendingUp />+{peliculasEsteMes.length}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cantidad de Películas este mes {peliculasEsteMes.length} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Vista de los últimos 12 meses</div>

          {/* Sparkline de los últimos 12 meses */}
          <BasicSparkLine data={peliculasPorMes} />
        </CardFooter>
      </Card>
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardDescription>Distribucion por configuracion</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            Preferencia de los clientes
          </CardTitle>

          <CardAction>
            <PieChart className="size-4" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <BasicPie data={dataPie} />
        </CardFooter>
      </Card>
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardDescription>Ultima Película Agregada</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Para: {peliculas[peliculas.length - 1].cliente}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <LucideCalendarDays />
              {peliculas[peliculas.length - 1].fecha}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="grid grid-cols-2 items-start gap-y-8 text-sm">
          <div className="tracking-wider flex flex-col items-start gap-2 justify-center">
            Configuracion: <strong>{peliculas[peliculas.length - 1].configuracion}</strong>
          </div>
          <div className="tracking-wider flex flex-col items-start gap-2 justify-center">
            Caracteristicas: <strong>{peliculas[peliculas.length - 1].caracteristicas}</strong>
          </div>
          <div className="tracking-wider flex flex-col items-start gap-2 justify-center">
            Calibre: <strong>{peliculas[peliculas.length - 1].calibre}</strong>
          </div>
          <div className="tracking-wider flex flex-col items-start gap-2 justify-center">
            Codigo de Formulacion: <strong>{peliculas[peliculas.length - 1].codigo_formulacion}</strong>
          </div>

          <Link href={`/dashboard/peliculas/${peliculas[peliculas.length - 1].id}`} className="w-full col-span-2">
            <Button variant="outline" className="w-full cursor-pointer">
              Ver
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardDescription>Crecimiento mensual</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {tasaCrecimiento}%
          </CardTitle>
          <CardAction>
            <Badge variant={Number(tasaCrecimiento) > 0 ? "default" : "destructive"}>
              {Number(tasaCrecimiento) > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {Number(tasaCrecimiento) > 0 ? "+" : ""}
              {tasaCrecimiento}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {Number(tasaCrecimiento) > 0 ? "Aumento" : "Disminución"} en producción
          </div>
          <div className="text-muted-foreground">Comparado con el mes anterior</div>

          <BasicBar dataset={datasetBar} />
        </CardFooter>
      </Card>
    </div>
  )
}
