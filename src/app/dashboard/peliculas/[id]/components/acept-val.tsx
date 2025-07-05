'use client'
import { Database } from '@/app/types/database'

type SchemaType = Database['public']['Tables']['valores_aceptables']['Row']

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createClient } from '@/app/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  electrostatico: z
    .number({
      message: 'electrostatico debe ser un número',
    })
    .optional(),
  encog_logn: z
    .number({
      message: 'encog_logn debe ser un número',
    })
    .optional(),
  encog_tans: z
    .number({
      message: 'encog_tans debe ser un número',
    })
    .optional(),
  KOF_dinam: z
    .number({
      message: 'KOF_dinam debe ser un número',
    })
    .optional(),
  KOF_static: z
    .number({
      message: 'KOF_static debe ser un número',
    })
    .optional(),
  maximo: z
    .number({
      message: 'maximo debe ser un número',
    })
    .optional(),
  minimo: z
    .number({
      message: 'minimo debe ser un número',
    })
    .optional(),
  moda: z
    .number({
      message: 'moda debe ser un número',
    })
    .optional(),
  rango: z
    .number({
      message: 'rango debe ser un número ',
    })
    .optional(),
})

export default function AceptVal({
  valores,
  ID,
}: {
  valores: SchemaType | null
  ID: string
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electrostatico: valores?.electrostatico ?? undefined,
      encog_logn: valores?.encog_logn ?? undefined,
      encog_tans: valores?.encog_tans ?? undefined,
      KOF_dinam: valores?.KOF_dinam ?? undefined,
      KOF_static: valores?.KOF_static ?? undefined,
      maximo: valores?.maximo ?? undefined,
      minimo: valores?.minimo ?? undefined,
      moda: valores?.moda ?? undefined,
      rango: valores?.rango ?? undefined,
    },
  })

  // 2. Define a submit handler.
  async function newEntry(values: z.infer<typeof formSchema>) {
    const supabase = await createClient()

    const { error } = await supabase.from('valores_aceptables').insert({
      pelicula_id: ID,
      ...values,
    })

    if (error) {
      console.error('Error updating valores_aceptables:', error)
      return
    }

    window.location.reload()
  }
  async function update(values: z.infer<typeof formSchema>) {
    const supabase = await createClient()

    const { error } = await supabase
      .from('valores_aceptables')
      .update({
        ...values,
      })
      .eq('pelicula_id', ID)

    if (error) {
      console.error('Error updating valores_aceptables:', error)
      return
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={
          valores === null
            ? form.handleSubmit(newEntry)
            : form.handleSubmit(update)
        }
        className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 items-center"
      >
        <FormField
          control={form.control}
          name="encog_logn"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center ">
              <FormLabel className="text-center">
                Encogimiento Transversal
              </FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.encog_logn || ''}%`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="encog_tans"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="text-center">
                Encogimiento Longitudinal
              </FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.encog_tans || ''}%`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="KOF_static"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>KOF Estático</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.KOF_static || ''}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="KOF_dinam"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>KOF Dinámico</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.KOF_dinam || ''}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electrostatico"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3 flex flex-col items-center">
              <FormLabel>Campo Electrostático</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="text-center"
                  placeholder={`${valores?.electrostatico || ''}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maximo"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Aceptables Máximos</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.maximo || ''}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minimo"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Aceptables Mínimos</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.minimo || ''}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moda"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Moda</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.moda || ''}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rango"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Rango</FormLabel>
              <FormControl>
                <Input
                  className="text-center"
                  type="number"
                  placeholder={`${valores?.rango || ''}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-2 lg:col-span-3">
          {valores === null
            ? 'Crear Valores Aceptables'
            : 'Actualizar Valores Aceptables'}
        </Button>
      </form>
    </Form>
  )
}
