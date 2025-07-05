import { Database } from '@/app/types/database'
import { createClient } from '@/app/utils/supabase/server'
import AceptVal from './acept-val'
type SchemaType = Database['public']['Tables']['parametros']['Row']

export default async function LiberationParams({
  parametrosLiberacion,
  ID,
}: {
  parametrosLiberacion: SchemaType
  ID: string
}) {
  const supabase = await createClient()

  const { data: valores_aceptables, error } = await supabase
    .from('valores_aceptables')
    .select('*')
    .eq('pelicula_id', ID)

  if (error) {
    console.error('Error fetching valores:', error)
    return null
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Parametros de Liberacion</h2>
      <div className="flex flex-col gap-2 p-4">
        <AceptVal valores={valores_aceptables[0] || null} ID={ID} />
      </div>
    </div>
  )
}
