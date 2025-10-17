'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('login data', data)

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  console.log('login success')
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: 'defaultpassword',
    options: {
      data: {
        full_name: formData.get('full_name') as string,
        role: formData.get('rol') as string,
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('signup error:', error)
    // redirect('/error')
  }

  redirect('/dashboard/equipo')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  console.log('logout success')
  revalidatePath('/', 'layout')
  redirect('/')
}
