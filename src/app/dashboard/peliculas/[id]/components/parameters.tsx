import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import LiberationParams from "./liberacion-params"
import ValidationParam from "./validation"

interface ParametersProps {
  parametros: any[] | null
  parametrosLiberacion: any | null
  parametrosValidacion: any[]
  peliculaId: string
}

export default function Parameters({
  parametros,
  parametrosLiberacion,
  parametrosValidacion,
  peliculaId
}: ParametersProps) {
  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-center">Parámetros de Muestreo</h2>

      {/* Parametros de Liberacion */}
      {parametrosLiberacion ? (
        <LiberationParams parametrosLiberacion={parametrosLiberacion} ID={peliculaId} />
      ) : (
        <div></div>
      )}

      {/* Separador solo si hay parámetros de liberación y validación */}
      {parametrosLiberacion && parametrosValidacion && parametrosValidacion.length > 0 && (
        <Separator className="w-full" />
      )}

      {/* Parametros de Validacion */}
      {parametrosValidacion && parametrosValidacion.length > 0 ? (
        <ValidationParam parametrosValidacion={parametrosValidacion} />
      ) : (
        parametrosLiberacion && <div></div>
      )}

      {/* Botón para crear parámetros de validación si no hay ninguno */}
      <div className="flex flex-col items-center gap-4 w-full p-4">
        <Link href={`/dashboard/peliculas/${peliculaId}/liberacion/crear`}>
          <Button variant="outline" className="cursor-pointer">
            Crear Parametros de Validacion
          </Button>
        </Link>
      </div>
    </div>
  )
}
