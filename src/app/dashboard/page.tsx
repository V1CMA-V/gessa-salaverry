import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { PageTitle } from '@/components/page-title'
import { PeliculasTable } from '@/components/peliculas-table'
import { SectionCards } from '@/components/section-cards'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data, error: fetchError } = await supabase
    .from('inspections')
    .select(
      'id, customer, inspection_date, roll_config, batch_id(batch_code), feature, formulation_code, created_by(full_name)'
    )

  if (fetchError) {
    console.error('Error fetching inspections:', fetchError)
    return <div>Error fetching inspections</div>
  }

  const normalizedData = (data ?? []).map((row: any) => ({
    ...row,
    // supabase nested selects return arrays for relations; take the first related row
    batch_id: Array.isArray(row.batch_id)
      ? row.batch_id[0] ?? null
      : row.batch_id,
    created_by: Array.isArray(row.created_by)
      ? row.created_by[0] ?? null
      : row.created_by,
  }))

  return (
    <>
      <PageTitle title="Dashboard" />
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <PeliculasTable data={normalizedData as any} />
    </>
  )
}
