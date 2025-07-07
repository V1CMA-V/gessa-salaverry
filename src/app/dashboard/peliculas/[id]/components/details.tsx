"use client"
import { Database } from "@/app/types/database"
type SchemaType = Database["public"]["Tables"]["team"]["Row"]

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createClient } from "@/app/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name_analista: z.string({
    message: "Nombre del Analista es requerido"
  }),
  name_operator: z.string({
    message: "Nombre del Operador es requerido"
  }),
  hora_muestreo: z
    .string({
      message: "hora_muestreo debe ser un número"
    })
    .min(0, {
      message: "No se permiten valores negativos"
    }),
  parada: z
    .number({
      message: "parada debe ser un número"
    })
    .min(0, {
      message: "No se permiten valores negativos"
    })
    .optional()
})

export default function DetailsForm({ team, ID }: { team: SchemaType; ID: string }) {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_analista: team?.name_analista || "",
      name_operator: team?.name_operator || "",
      hora_muestreo: team?.hora_muestreo || "",
      parada: undefined
    }
  })

  async function update(values: z.infer<typeof formSchema>) {
    const supabase = await createClient()

    const { error } = await supabase
      .from("team")
      .update({
        ...values
      })
      .eq("parametros_id", ID)

    if (error) {
      console.error("Error updating team:", error)
      return
    }
    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(update)}
        className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 items-center"
      >
        <FormField
          control={form.control}
          name="name_analista"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1 w-full flex flex-col items-center">
              <FormLabel className="text-center">Analista de Calidad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona uno" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem className="" value="Jesus Alberto Borges Solis">
                    Jesus Alberto Borges Solis
                  </SelectItem>
                  <SelectItem value="Andre Mora Zempoalteca">Andre Mora Zempoalteca</SelectItem>
                  <SelectItem value="Montserrath Cuatepotzo">Montserrath Cuatepotzo</SelectItem>
                  <SelectItem value="Mariangel Gutierrez Coca">Mariangel Gutierrez Coca</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_operator"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="text-center">Operador de Maquina</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="text"
                  placeholder={team?.name_operator || "Nombre del Operador"}
                  {...field}
                  onChange={e => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hora_muestreo"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Horas de Liberacion</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={team?.hora_muestreo?.toString() || "0"}
                  {...field}
                  onChange={e => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-2 lg:col-span-3 cursor-pointer">
          Actualizar Valores
        </Button>
      </form>
    </Form>
  )
}
