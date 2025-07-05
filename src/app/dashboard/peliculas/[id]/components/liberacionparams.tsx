import { Database } from '@/app/types/database'
import { createClient } from '@/app/utils/supabase/server'
import AceptVal from './acept-val'
type SchemaType = Database['public']['Tables']['parametros']['Row']

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
    <div className="flex flex-col items-center gap-10 px-8 py- w-full">
      <div className="w-full flex flex-col items-center gap-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h2 className="text-2xl font-bold">Parámetros de Liberación</h2>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow p-6 w-full max-w-3xl">
                <p>
                  <span className="font-semibold">Kilogramos Hora:</span>
                  <strong>{parametrosLiberacion.kilogramos}</strong>{' '}
                </p>
                <p>
                  <span className="font-semibold">Velocidad de Motor A:</span>{' '}
                  <strong>{parametrosLiberacion.velocidad_motor_A}</strong>
                </p>
                <p>
                  <span className="font-semibold">Velocidad de Motor B:</span>{' '}
                  <strong>{parametrosLiberacion.velocidad_motor_B}</strong>
                </p>
                <p>
                  <span className="font-semibold">Velocidad de Motor C:</span>{' '}
                  <strong>{parametrosLiberacion.velocidad_motor_C}</strong>
                </p>
                <p>
                  <span className="font-semibold">Velocidad de Turbo:</span>{' '}
                  <strong>{parametrosLiberacion.velocidad_turbo}</strong>
                </p>
                <p>
                  <span className="font-semibold">Velocidad del Jalador:</span>{' '}
                  <strong>{parametrosLiberacion.velocidad_jalador}</strong>
                </p>
                <p>
                  <span className="font-semibold">Tensión de Bobinador 1:</span>{' '}
                  <strong>{parametrosLiberacion.tension_bobinador_1}</strong>
                </p>
                <p>
                  <span className="font-semibold">Tensión de Bobinador 2:</span>{' '}
                  <strong>{parametrosLiberacion.tension_bobinador_2}</strong>
                </p>
                <p>
                  <span className="font-semibold">Prearrastre:</span>{' '}
                  <strong>{parametrosLiberacion.prearrastre}</strong>
                </p>
                <p>
                  <span className="font-semibold">
                    Presión Bobinador Izquierdo:
                  </span>{' '}
                  <strong>{parametrosLiberacion.presion_bobinador_I}</strong>
                </p>
                <p>
                  <span className="font-semibold">
                    Presión Bobinador Derecho:
                  </span>{' '}
                  <strong>{parametrosLiberacion.presion_bobinador_D}</strong>
                </p>
                <div className="col-span-1 md:col-span-2 bg-gradient-to-bl to-gray-200 from-gray-300 rounded p-4 mt-2 flex flex-col gap-2 items-center">
                  <p className="font-semibold mb-2">Temperaturas Cañiones</p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <p>
                      <span className="font-medium">Temperatura A:</span>{' '}
                      <strong>
                        {parametrosLiberacion.temperaturas_canions.a}
                      </strong>
                    </p>
                    <p>
                      <span className="font-medium">Temperatura B:</span>{' '}
                      <strong>
                        {parametrosLiberacion.temperaturas_canions.b}
                      </strong>
                    </p>
                    <p>
                      <span className="font-medium">Temperatura C:</span>{' '}
                      <strong>
                        {parametrosLiberacion.temperaturas_canions.c}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full max-w-5xl flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-center ">
          Muestreo de Liberacion
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h2 className="text-2xl font-bold">Parámetros de Liberación</h2>
            </AccordionTrigger>
            <AccordionContent>
              <AceptVal valores={valores_aceptables[0] || null} ID={ID} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h2 className="text-2xl font-bold">Detalles</h2>
            </AccordionTrigger>
            <AccordionContent>
              <AceptVal valores={valores_aceptables[0] || null} ID={ID} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
