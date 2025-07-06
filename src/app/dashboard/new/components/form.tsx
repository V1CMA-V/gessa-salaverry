"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  medida: z
    .number({
      message: "Medida debe ser un número ",
    })
    .min(0, {
      message: "Medida debe ser mayor o igual a 0",
    }),
  calibre: z
    .number({
      message: "Calilbre debe ser un número ",
    })
    .min(0, {
      message: "Calilbre debe ser mayor o igual a 0",
    }),
  caracteristicas: z.string({
    message: "Es necesario ingresar las características",
  }),
  codigo_formulacion: z.string({
    message: "Es necesario ingresar el código de formulación",
  }),
  configuracion: z.string({
    message: "Es necesario ingresar la configuración",
  }),
  fecha: z.date({
    message: "Es necesario ingresar la fecha",
  }),
  cliente: z.string({
    message: "Es necesario ingresar el cliente",
  }),

  // Para lote
  num: z.string({
    message: "Es necesario ingresar el número de lote",
  }),
  peso_objetivo: z
    .number({
      message: "Peso objetivo debe ser un número",
    })
    .min(0, {
      message: "Peso objetivo debe ser mayor o igual a 0",
    }),
  peso_rollo: z
    .number({
      message: "Peso rollo debe ser un número",
    })
    .min(0, {
      message: "Peso rollo debe ser mayor o igual a 0",
    }),
});

export default function NewForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Crear logica a base de datos
    // const supabase = await createClient();
    console.log(values);

    // redirect(`/dashboard/peliculas/${pelicula_id}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 items-center"
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
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Escoja una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
                <Input
                  type="text"
                  placeholder="Cliente"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la velocidad de la motor A.
              </FormDescription>
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
                  <SelectItem value="Abierto por un lado">
                    Abierto por un lado
                  </SelectItem>
                  <SelectItem value="Abierto por los dos lados">
                    Abierto por los dos lados
                  </SelectItem>
                  <SelectItem value="Tratado">Tratado</SelectItem>
                </SelectContent>
              </Select>
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
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Escribe el codigo de formulacion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="configuracion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Configuración de Rollos por flecha</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

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
                  onChange={(e) => field.onChange(e.target.value)}
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Escribe el peso del rollo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="md:col-span-2 lg:col-span-3">
          Submit
        </Button>
      </form>
    </Form>
  );
}
