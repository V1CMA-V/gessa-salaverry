import { Database } from '@/app/types/database'
import { createClient } from '@/app/utils/supabase/server'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import DetailsForm from './details'

type SchemaType = Database['public']['Tables']['parametros']['Row']

export default async function ViewDetails({
  parametros,
  ID,
}: {
  parametros: SchemaType
  ID?: string
}) {
  const supabase = await createClient()
  const { data: team, error: teamError } = await supabase
    .from('team')
    .select('*')
    .eq('parametros_id', ID)

  if (teamError) {
    console.error('Error fetching team:', teamError)
    return <div>Error loading team data</div>
  }
  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>
        <h2 className="text-lg font-bold">Detalles</h2>
      </AccordionTrigger>
      <AccordionContent>
        <DetailsForm ID={parametros.id} team={team[0]} />
      </AccordionContent>
    </AccordionItem>
  )
}
