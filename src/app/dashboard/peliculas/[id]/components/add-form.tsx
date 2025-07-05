'use client'

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
  valor1: z.number({
    required_error: 'Tiene que ser un número',
  }),
  valor2: z.number({
    required_error: 'Tiene que ser un número',
  }),
  valor3: z.number({
    required_error: 'Tiene que ser un número',
  }),
  valor4: z.number({
    required_error: 'Tiene que ser un número',
  }),
  valor5: z.number({
    required_error: 'Tiene que ser un número',
  }),
  valor6: z.number({
    required_error: 'Tiene que ser un número',
  }),
  valor7: z.number({
    required_error: 'Tiene que ser un número',
  }),
  valor8: z.number({
    required_error: 'Tiene que ser un número',
  }),

  // datos
  position: z
    .number({
      required_error: 'Tiene que ser un número',
    })
    .min(1, {
      message: 'La posición debe ser al menos 1',
    })
    .max(10, {
      message: 'La posición no puede ser mayor que 10',
    }),
})

export default function FormData({ id }: { id: string }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = await createClient()

    const { error: insertError } = await supabase.from('valores').insert({
      ...values,
      parametro_id: id,
    })

    if (insertError) {
      console.error('Error inserting valores:', insertError)
      return
    }

    // Reset the form after successful submission
    window.location.reload()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 md:gap-16 items-center px-5"
      >
        <div className="w-full grid grid-cols-2 gap-4 px-3">
          <FormField
            control={form.control}
            name="valor1"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 1</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 1"
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
            name="valor2"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 2</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 2"
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
            name="valor3"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 3</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 3"
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
            name="valor4"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 4</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 4"
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
            name="valor5"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 5</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 5"
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
            name="valor6"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 6</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 6"
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
            name="valor7"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 7</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 7"
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
            name="valor8"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Valor 8</FormLabel>
                <FormControl>
                  <Input
                    className="text-center"
                    type="number"
                    placeholder="Valor 8"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className="px-3 flex flex-col items-center w-full">
              <FormLabel>Posición</FormLabel>
              <FormControl>
                <Input
                  className="text-center w-full"
                  type="number"
                  placeholder="Posición"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className=" w-full">
          Enviar
        </Button>
      </form>
    </Form>
  )
}
