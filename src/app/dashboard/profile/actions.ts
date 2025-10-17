'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string

  // Obtener el usuario actual
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'No se pudo obtener la información del usuario' }
  }

  // Actualizar el nombre en user_metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { full_name: name },
  })

  if (updateError) {
    return { error: 'Error al actualizar el nombre: ' + updateError.message }
  }

  //   Actualizar el nombre en la tabla profiles
  const { error: profileUpdateError } = await supabase
    .from('profiles')
    .update({ full_name: name })
    .eq('id', user.id)

  if (profileUpdateError) {
    return {
      error: 'Error al actualizar el perfil: ' + profileUpdateError.message,
    }
  }

  revalidatePath('/dashboard/profile')
  return { success: true, message: 'Nombre actualizado correctamente' }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validar que las contraseñas coincidan
  if (newPassword !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden' }
  }

  // Validar longitud mínima
  if (newPassword.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' }
  }

  // Obtener el usuario actual
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'No se pudo obtener la información del usuario' }
  }

  // Verificar la contraseña actual
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  })

  if (signInError) {
    return { error: 'La contraseña actual es incorrecta' }
  }

  // Actualizar la contraseña
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    return {
      error: 'Error al actualizar la contraseña: ' + updateError.message,
    }
  }

  return { success: true, message: 'Contraseña actualizada correctamente' }
}
