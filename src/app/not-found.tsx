'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold">Gessa Salaverry</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        La página que buscas no existe o ha sido movida.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild size="sm" variant="outline">
          <Link href="/">Inicio</Link>
        </Button>

        <Button asChild size="sm" variant="ghost">
          <Link href="/dashboard">Dashboard</Link>
        </Button>

        <Button asChild size="sm" variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
      </div>

      <div className="mt-6">
        <Button size="sm" variant="default" onClick={() => router.back()}>
          Regresar
        </Button>
      </div>
    </main>
  )
}
