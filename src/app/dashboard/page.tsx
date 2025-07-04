import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'

import { createClient } from '../utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: peliculas, error } = await supabase
    .from('peliculas')
    .select('*')

  if (error) {
    console.error('Error fetching peliculas:', error)
    return <div>Error loading peliculas</div>
  }

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />

            <DataTable data={peliculas} />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
