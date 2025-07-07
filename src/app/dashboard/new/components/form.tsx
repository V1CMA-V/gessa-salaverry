"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"

import { format } from "date-fns"

import { createClient } from "@/app/utils/supabase/client"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { es } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  medida: z
    .number({
      message: "Medida debe ser un número "
    })
    .min(0, {
      message: "Medida debe ser mayor o igual a 0"
    }),
  calibre: z
    .number({
      message: "Calilbre debe ser un número "
    })
    .min(0, {
      message: "Calilbre debe ser mayor o igual a 0"
    }),
  caracteristicas: z.string({
    message: "Es necesario ingresar las características"
  }),
  codigo_formulacion: z.string({
    message: "Es necesario ingresar el código de formulación"
  }),
  configuracion: z.string({
    message: "Es necesario ingresar la configuración"
  }),
  fecha: z.date({
    message: "Es necesario ingresar la fecha"
  }),
  cliente: z.string({
    message: "Es necesario ingresar el cliente"
  }),

  // Para lote
  num: z.string({
    message: "Es necesario ingresar el número de lote"
  }),
  peso_objetivo: z
    .number({
      message: "Peso objetivo debe ser un número"
    })
    .min(0, {
      message: "Peso objetivo debe ser mayor o igual a 0"
    }),
  peso_rollo: z
    .number({
      message: "Peso rollo debe ser un número"
    })
    .min(0, {
      message: "Peso rollo debe ser mayor o igual a 0"
    })
})

export default function NewForm() {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Crear logica a base de datos
    const supabase = await createClient()

    const { data: lote, error } = await supabase
      .from("lote")
      .insert({
        num: values.num,
        peso_objetivo: values.peso_objetivo,
        peso_rollo: values.peso_rollo
      })
      .select()

    if (error) {
      console.error("Error inserting lote:", error)
      toast.error("Error al insertar el lote")
      return
    }

    const { data: pelicula, error: errorPelicula } = await supabase
      .from("peliculas")
      .insert({
        fecha: values.fecha,
        cliente: values.cliente,
        medida: values.medida,
        calibre: values.calibre,
        caracteristicas: values.caracteristicas,
        codigo_formulacion: values.codigo_formulacion,
        configuracion: values.configuracion,
        lote: lote[0].id
      })
      .select()

    if (errorPelicula) {
      console.error("Error inserting pelicula:", errorPelicula)
      toast.error("Error al insertar la película")
      return
    }

    toast.success("Película insertada correctamente")
    router.push(`/dashboard/peliculas/${pelicula[0].id}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-10 items-center justify-center "
      >
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: es
                        })
                      ) : (
                        <span>Escoja una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={es}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date => date < new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Fecha de la película</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Cliente" {...field} onChange={e => field.onChange(e.target.value)} />
              </FormControl>
              <FormDescription>Cliente de la película</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medida"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medida</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Medida"
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Medida de la película</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calibre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calibre</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Calibre"
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Este es la velocidad de la motor A.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caracteristicas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una característica" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Punteado">Punteado</SelectItem>
                  <SelectItem value="Abierto por un lado">Abierto por un lado</SelectItem>
                  <SelectItem value="Abierto por los dos lados">Abierto por los dos lados</SelectItem>
                  <SelectItem value="Tratado">Tratado</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Características de la película</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codigo_formulacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo de Formulación</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Codigo de Formulación"
                  className="w-full"
                  {...field}
                  onChange={e => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>Escribe el codigo de formulacion</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="configuracion"
          render={({ field }) => (
            <FormItem className=" md:col-span-3 w-full flex flex-col items-center justify-center">
              <FormLabel>Configuración de Rollos por flecha</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="md:w-1/2 w-full">
                    <SelectValue placeholder="Selecciona una configuración" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Sencillo">Sencillo</SelectItem>
                  <SelectItem value="Doble">Doble</SelectItem>
                  <SelectItem value="Triple">Triple</SelectItem>
                  <SelectItem value="Cuadruple">Cuadruple</SelectItem>
                  <SelectItem value="Quintuple">Quintuple</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Configuración de rollos por flecha</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="w-full col-span-3" />

        <FormField
          control={form.control}
          name="num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Lote</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Número de Lote"
                  {...field}
                  onChange={e => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>Escribe el número de lote</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="peso_objetivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso Objetivo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Peso Objetivo"
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Escribe el número de lote</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="peso_rollo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso Rollo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Peso Rollo"
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Escribe el peso del rollo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="md:col-span-2 lg:col-span-3 cursor-pointer">
          Submit
        </Button>
      </form>
    </Form>
  )
}
