import { Database } from "@/app/types/database"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Resultados from "./resultados"
import Table from "./tabla"
import ViewDetails from "./view-details"
import ViewParams from "./view-params"

type SchemaType = Database["public"]["Tables"]["parametros"]["Row"]

export default async function ValidationParam({ parametrosValidacion }: { parametrosValidacion: SchemaType[] }) {
  return (
    <div className="flex flex-col items-center gap-10 px-8 w-full">
      <Accordion type="single" collapsible className="w-full">
        {parametrosValidacion.map((parametro, index) => (
          <AccordionItem key={parametro.id} value={`item-${index}`}>
            <AccordionTrigger className="cursor-pointer">
              <h2 className="text-2xl font-bold">{`Parámetros de Validacion ${index + 1}`}</h2>
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Muestra de parametros */}
                <ViewParams parametros={parametro} className="text-lg" />
                {/* Mostrar los Detalles */}
                <ViewDetails parametros={parametro} />
                {/* Resultados */}
                <AccordionItem value="resultados">
                  <AccordionTrigger className="cursor-pointer">
                    <h3 className="text-lg font-bold">Resultados</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Resultados parametroId={parametro.id} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Table page_id={parametro.id} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
