'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { signup } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { IconPlus } from '@tabler/icons-react'

// Esquema de validación con Zod
const userSchema = z.object({
  email: z
    .string({ message: 'El correo es requerido' })
    .min(1, { message: 'El correo es requerido' })
    .email({ message: 'Debe ser un correo válido' }),
  full_name: z
    .string({ message: 'El nombre completo es requerido' })
    .min(1, { message: 'El nombre completo es requerido' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
})

type UserFormData = z.infer<typeof userSchema>

export function NewUser() {
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Agregar usuario</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear usuario</DialogTitle>
            <DialogDescription>
              Rellena el formulario para agregar un nuevo usuario a la
              plataforma.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Agregar usuario</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Crear usuario</DrawerTitle>
          <DrawerDescription>
            Rellena el formulario para agregar un nuevo usuario a la plataforma.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      full_name: '',
    },
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log('Datos del formulario:', data)

      // Mostrar notificación de carga
      toast.loading('Creando usuario...', { id: 'create-user' })

      // Convertir los datos a FormData para la función signup
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('full_name', data.full_name)

      console.log('FormData para signup:', {
        email: formData.get('email'),
        full_name: formData.get('full_name'),
        rol: formData.get('rol'),
      })

      // Llamar a la función signup
      await signup(formData)

      // Mostrar notificación de éxito
      toast.success('Usuario creado exitosamente', { id: 'create-user' })
      console.log('Usuario creado exitosamente')
    } catch (error) {
      console.error('Error al crear usuario:', error)
      // Mostrar notificación de error
      toast.error('Error al crear el usuario. Por favor, intenta nuevamente.', {
        id: 'create-user',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid items-start gap-6', className)}
    >
      <div className="grid gap-3">
        <Label htmlFor="email">Correo</Label>
        <Input
          type="email"
          id="email"
          placeholder="usuario@ejemplo.com"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="full_name">Nombre completo</Label>
        <Input
          id="full_name"
          placeholder="Nombre completo"
          {...register('full_name')}
          className={errors.full_name ? 'border-red-500' : ''}
        />
        {errors.full_name && (
          <p className="text-sm text-red-500">{errors.full_name.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Crear usuario'}
      </Button>
    </form>
  )
}
