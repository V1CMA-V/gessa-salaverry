import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'

import NewForms from './components/form'

export default function NewData() {
  return (
    <SidebarInset>
      <SiteHeader route="Crear nueva película" />
      <div
        className="h-[80dvh] text-center flex flex-col items-center justify-center gap-10 px-8
      "
      >
        <div className="flex flex-col gap-2 absolute top-24 left-1/2 -translate-x-1/2">
          <h1 className="text-xl md:text-2xl font-bold">
            Crear nueva película
          </h1>
        </div>

        {/* Aquí iría el formulario de creación de película */}
        <NewForms />
      </div>
    </SidebarInset>
  )
}
