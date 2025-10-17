import { GalleryVerticalEnd } from 'lucide-react'

import { LoginForm } from '@/components/login-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: userData, error } = await supabase.auth.getUser()
  if (!error || userData?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Gessa Salaverry
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:flex flex-col items-center justify-center p-10 text-center">
        <div className="max-w-xl w-full flex flex-col items-center justify-center text-6xl font-normal text-muted-foreground gap-3">
          <p className=" flex justify-between items-center w-full">
            <span>G</span> <span>R</span> <span>U</span> <span>P</span>{' '}
            <span>O</span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>E</span> <span>M</span> <span>P</span> <span>R</span>{' '}
            <span>E</span> <span>S</span> <span>A</span> <span>R</span>{' '}
            <span>I</span> <span>A</span> <span>L</span>
          </p>
          <p className="w-full max-w-3/4 font-bold text-blue-600  text-7xl flex items-center justify-between">
            <span>G</span> <span>E</span> <span>S</span> <span>S</span>{' '}
            <span>A</span>
          </p>
          <p className="w-full flex items-center justify-between border-t-4 border-blue-600">
            <span>S</span> <span>A</span> <span>L</span> <span>A</span>{' '}
            <span>V</span> <span>E</span> <span>R</span> <span>R</span>{' '}
            <span>Y</span>
          </p>
        </div>
      </div>
    </div>
  )
}
