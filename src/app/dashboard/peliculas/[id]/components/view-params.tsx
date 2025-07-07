import { Database } from "@/app/types/database"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type SchemaType = Database["public"]["Tables"]["parametros"]["Row"]

export default async function ViewParams({
  parametros,
  title,
  className
}: {
  parametros: SchemaType
  title?: string
  className?: string
}) {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="cursor-pointer">
        <h2 className={`${className} font-bold`}>{title || "Parámetros de Validacion"}</h2>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow p-6 w-full max-w-3xl m-auto items-center justify-between ">
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Kilogramos Hora:</span>
            <strong>{parametros.kilogramos}</strong>{" "}
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Velocidad de Motor A:</span> <strong>{parametros.velocidad_motor_A}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Velocidad de Motor B:</span> <strong>{parametros.velocidad_motor_B}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Velocidad de Motor C:</span> <strong>{parametros.velocidad_motor_C}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Velocidad de Turbo:</span> <strong>{parametros.velocidad_turbo}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Velocidad del Jalador:</span>{" "}
            <strong>{parametros.velocidad_jalador}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Tensión de Bobinador 1:</span>{" "}
            <strong>{parametros.tension_bobinador_1}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Tensión de Bobinador 2:</span>{" "}
            <strong>{parametros.tension_bobinador_2}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Prearrastre:</span> <strong>{parametros.prearrastre}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Presión Bobinador Izquierdo:</span>{" "}
            <strong>{parametros.presion_bobinador_I}</strong>
          </p>
          <p className="w-full flex items-center justify-between">
            <span className="font-semibold">Presión Bobinador Derecho:</span>{" "}
            <strong>{parametros.presion_bobinador_D}</strong>
          </p>
          <div className="col-span-1 md:col-span-2 bg-gradient-to-bl to-blue-100 from-blue-200 rounded p-4 mt-2 flex flex-col gap-2 items-center">
            <p className="font-semibold mb-2">Temperaturas Cañiones</p>
            <div className="flex flex-col md:flex-row gap-4 w-full items-center px-8">
              <p className="w-full flex items-center justify-between">
                <span className="font-medium">Temperatura A:</span> <strong>{parametros.temperaturas_canions.a}</strong>
              </p>
              <p className="w-full flex items-center justify-between">
                <span className="font-medium">Temperatura B:</span> <strong>{parametros.temperaturas_canions.b}</strong>
              </p>
              <p className="w-full flex items-center justify-between">
                <span className="font-medium">Temperatura C:</span> <strong>{parametros.temperaturas_canions.c}</strong>
              </p>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
