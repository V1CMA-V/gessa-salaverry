import { SiteHeader } from "@/components/site-header"
import { SidebarInset } from "@/components/ui/sidebar"

import NewForm from "./components/form"

export const metadata = {
  title: "Crear nueva película",
  description: "Crear nueva película"
}

export default function NewData() {
  return (
    <SidebarInset>
      <SiteHeader route="Crear nueva película" />
      <div className="w-full flex flex-col items-center justify-center p-4 gap-10">
        <h1 className="text-2xl font-bold text-center">Crear nueva película</h1>
        {/* Aquí iría el formulario de creación de película */}
        <NewForm />
      </div>
    </SidebarInset>
  )
}
