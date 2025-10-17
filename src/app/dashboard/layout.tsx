import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { HeaderProvider } from '@/contexts/header-context'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect('/login')
  }

  const { data: session, error: sessionError } = await supabase
    .from('profiles')
    .select('role, full_name, email, is_active')
    .eq('id', userData.user.id)
    .single()

  if (sessionError || !session) {
    console.error('Error fetching user session:', sessionError)
    redirect('/login')
  }

  if (session.is_active === false) {
    redirect('/inactive')
  }

  const user = {
    role: session?.role,
    name: session?.full_name,
    email: session?.email,
  }

  return (
    <>
      <HeaderProvider>
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <AppSidebar
            variant="inset"
            role={user.role}
            name={user.name}
            email={user.email}
          />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </HeaderProvider>
      <Toaster position="top-center" />
    </>
  )
}
