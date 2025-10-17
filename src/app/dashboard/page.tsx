import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { PageTitle } from '@/components/page-title'
import { PeliculasTable } from '@/components/peliculas-table'
import { SectionCards } from '@/components/section-cards'

import data from './data.json'

export default function Page() {
  return (
    <>
      <PageTitle title="Dashboard" />
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <PeliculasTable data={data} />
    </>
  )
}
