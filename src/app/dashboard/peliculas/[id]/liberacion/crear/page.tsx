import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { SidebarInset } from '@/components/ui/sidebar'
import Link from 'next/link'
import FormParameter from '../components/form'

export default async function FormPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <SidebarInset>
      <SiteHeader route="Crear Parámetro" />
      <div className="w-full flex flex-col items-center justify-center p-4 gap-10">
        <h1 className="text-2xl font-bold text-center ">
          Crea un nuevo parametro
        </h1>
        <FormParameter pelicula_id={id} />

        <Link href={`/dashboard/peliculas/${id}`}>
          <Button variant="outline">Volver a Pelicula</Button>
        </Link>
      </div>
    </SidebarInset>
  )
}
