import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { PeliculasTable } from '@/components/peliculas-table'
import { SectionCards } from '@/components/section-cards'

import data from './data.json'

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <PeliculasTable data={data} />
    </>
  )
}
