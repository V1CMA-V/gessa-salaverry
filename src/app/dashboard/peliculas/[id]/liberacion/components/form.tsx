'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createClient } from '@/app/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { redirect } from 'next/navigation'

const formSchema = z.object({
  kilogramos: z.number().min(2, {
    message: 'kilogramos debe ser un número y tener al menos 2',
  }),
  velocidad_motor_A: z.number().min(2, {
    message: 'velocidad_motor_A debe ser un número y tener al menos 2',
  }),
  velocidad_motor_B: z.number().min(2, {
    message: 'velocidad_motor_B debe ser un número y tener al menos 2',
  }),
  velocidad_motor_C: z.number().min(2, {
    message: 'velocidad_motor_C debe ser un número y tener al menos 2',
  }),
  velocidad_turbo: z.number().min(2, {
    message: 'velocidad_turbo debe ser un número y tener al menos 2',
  }),
  velocidad_jalador: z.number().min(2, {
    message: 'velocidad_jalador debe ser un número y tener al menos 2',
  }),
  tension_bobinador_1: z.number().min(2, {
    message: 'tension_bobinador_1 debe ser un número y tener al menos 2',
  }),
  tension_bobinador_2: z.number().min(2, {
    message: 'tension_bobinador_2 debe ser un número y tener al menos 2',
  }),
  prearrastre: z.number().min(2, {
    message: 'prearrastre debe ser un número y tener al menos 2',
  }),
  presion_bobinador_I: z.number().min(2, {
    message: 'presion_bobinador_I debe ser un número y tener al menos 2',
  }),
  presion_bobinador_D: z.number().min(2, {
    message: 'presion_bobinador_D debe ser un número y tener al menos 2',
  }),
  temperaturas_canions: z.object({
    a: z.number().min(2, {
      message: 'Temperatura A debe ser un número y tener al menos 2',
    }),
    b: z.number().min(2, {
      message: 'Temperatura B debe ser un número y tener al menos 2',
    }),
    c: z.number().min(2, {
      message: 'Temperatura C debe ser un número y tener al menos 2',
    }),
  }),
})

export default function FormParameter({
  pelicula_id,
}: {
  pelicula_id: string
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = await createClient()

    const { error } = await supabase.from('parametros').insert({
      pelicula_id,
      ...values,
    })

    if (error) {
      console.error('Error inserting parameters:', error)
      return
    }

    redirect(`/dashboard/peliculas/${pelicula_id}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 items-center"
      >
        <FormField
          control={form.control}
          name="kilogramos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilogramos hora</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Kilogramos"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es el peso en kilogramos hora.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="velocidad_motor_A"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocidad Motor A</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Velocidad Motor A"
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
          name="velocidad_motor_B"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocidad Motor B</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Velocidad Motor B"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la velocidad de la motor B.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="velocidad_motor_C"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocidad Motor C</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Velocidad Motor C"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la velocidad de la motor C.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="velocidad_turbo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocidad Turbo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Velocidad Turbo"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Este es la velocidad del turbo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="velocidad_jalador"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocidad Jalador</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Velocidad Jalador"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la velocidad del jalador.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tension_bobinador_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tensión Bobinador 1</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Tensión Bobinador 1"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la tensión del bobinador 1.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tension_bobinador_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tensión Bobinador 2</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Tensión Bobinador 2"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la tensión del bobinador 2.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prearrastre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prearrastre</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Prearrastre"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Este es el prearrastre.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presion_bobinador_I"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presión Bobinador Izquierdo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Presión Bobinador Izquierdo"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la presión del bobinador izquierdo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presion_bobinador_D"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presión Bobinador Derecho</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Presión Bobinador Derecho"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es la presión del bobinador derecho.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperaturas_canions.a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperatura A</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Temperatura A"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es el valor de la temperatura A.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperaturas_canions.b"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperatura B</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Temperatura B"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es el valor de la temperatura B.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperaturas_canions.c"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperatura C</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Temperatura C"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Este es el valor de la temperatura C.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="md:col-span-2 lg:col-span-3">
          Submit
        </Button>
      </form>
    </Form>
  )
}
