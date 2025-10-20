import { login } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa tu correo electrónico a continuación para iniciar sesión en
            tu cuenta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@ejemplo.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" formAction={login} className="cursor-pointer">
            Iniciar sesión
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            No tienes una cuenta?{' '}
            <a href="#" className="underline underline-offset-4">
              Crear una cuenta
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
