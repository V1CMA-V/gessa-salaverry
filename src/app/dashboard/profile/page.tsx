import { PageTitle } from '@/components/page-title'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { UpdatePasswordForm } from './update-password-form'
import { UpdateProfileForm } from './update-profile-form'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Obtener las iniciales del nombre
  const fullName =
    user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <PageTitle title="Mi Perfil" />
      <div className="space-y-6">
        {/* Encabezado del perfil */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Gestiona tu información personal y preferencias de seguridad
          </p>
        </div>

        {/* Información de la cuenta */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
            <CardDescription>
              Detalles de tu cuenta y estado actual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="grid gap-3">
                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Nombre:
                    </span>
                    <span className="text-sm font-semibold">{fullName}</span>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Email:
                    </span>
                    <span className="text-sm">{user.email}</span>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Estado:
                    </span>
                    <Badge
                      variant={
                        user.email_confirmed_at ? 'default' : 'secondary'
                      }
                      className="w-fit"
                    >
                      {user.email_confirmed_at ? 'Verificado' : 'Sin verificar'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Miembro desde:
                    </span>
                    <span className="text-sm">
                      {new Date(user.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Última conexión:
                    </span>
                    <span className="text-sm">
                      {new Date(
                        user.last_sign_in_at || user.created_at
                      ).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario para actualizar nombre */}
        <Card>
          <CardHeader>
            <CardTitle>Actualizar Nombre</CardTitle>
            <CardDescription>Cambia tu nombre de usuario</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateProfileForm currentName={fullName} />
          </CardContent>
        </Card>

        {/* Formulario para cambiar contraseña */}
        <Card>
          <CardHeader>
            <CardTitle>Cambiar Contraseña</CardTitle>
            <CardDescription>
              Actualiza tu contraseña para mantener tu cuenta segura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdatePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
