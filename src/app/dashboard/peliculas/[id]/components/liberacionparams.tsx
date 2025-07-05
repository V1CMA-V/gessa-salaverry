import { Database } from '@/app/types/database'
import { Separator } from '@/components/ui/separator'
type SchemaType = Database['public']['Tables']['parametros']['Row']

export default function LiberationParams({
  parametrosLiberacion,
}: {
  parametrosLiberacion: SchemaType
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Parametros de Liberacion</h2>
      <Separator className="w-full" />
      <div className="flex flex-col gap-2 p-4"></div>
    </div>
  )
}
