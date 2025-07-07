import { Database } from "@/app/types/database"
import { createClient } from "@/app/utils/supabase/server"
import AceptVal from "./acept-val"
type SchemaType = Database["public"]["Tables"]["parametros"]["Row"]

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import DetailsForm from "./details"
import Table from "./tabla"
import ViewParams from "./view-params"

export default async function LiberationParams({
  parametrosLiberacion,
  ID
}: {
  parametrosLiberacion: SchemaType
  ID: string
}) {
  const supabase = await createClient()

  const { data: valores_aceptables, error } = await supabase
    .from("valores_aceptables")
    .select("*")
    .eq("pelicula_id", ID)

  if (error) {
    console.error("Error fetching valores:", error)
    return null
  }

  const { data: team, error: teamError } = await supabase
    .from("team")
    .select("*")
    .eq("parametros_id", parametrosLiberacion.id)

  if (teamError) {
    console.error("Error fetching team:", teamError)
    return null
  }

  return (
    <div className="flex flex-col items-center gap-10 px-8 w-full">
      <div className="w-full max-w-5xl flex flex-col items-center gap-4">
        <h2 className="text-5xl font-bold text-center mb-8">Muestreo de Liberación</h2>

        <Accordion type="single" collapsible className="w-full">
          <ViewParams className="text-2xl" parametros={parametrosLiberacion} title="Parámetros de Liberación" />

          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer">
              <h2 className="text-2xl font-bold">Parámetros Aceptables</h2>
            </AccordionTrigger>
            <AccordionContent>
              <AceptVal valores={valores_aceptables[0] || null} ID={ID} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="cursor-pointer">
              <h2 className="text-2xl font-bold">Detalles</h2>
            </AccordionTrigger>
            <AccordionContent>
              <DetailsForm ID={parametrosLiberacion.id} team={team[0]} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Table page_id={parametrosLiberacion.id} />
    </div>
  )
}
