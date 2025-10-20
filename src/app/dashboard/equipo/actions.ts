'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'

export async function updateUser(formData: FormData, userId: string) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    full_name: formData.get('full_name') as string,
    role: formData.get('role') as string,
    is_active: formData.get('is_active') === 'true',
  }

  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId)

  if (error) {
    console.error('Error updating user:', error)
    throw new Error('Error al actualizar el usuario')
  }

  console.log('update user success')

  // Revalidar el path para que se actualicen los datos
  revalidatePath('/dashboard/equipo')

  return { success: true }
}
