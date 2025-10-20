import { getInspectionSamplingData } from './actions'
import { SamplingClient } from './sampling-client'

interface SamplingPageProps {
  params: {
    id: string
  }
}

export default async function SamplingPage({ params }: SamplingPageProps) {
  const resolvedParams = await params
  const { id } = resolvedParams

  try {
    const { inspection, config } = await getInspectionSamplingData(id)

    return (
      <SamplingClient
        inspectionId={id}
        inspectionData={inspection}
        config={config}
      />
    )
  } catch (error) {
    console.error('Error loading sampling data:', error)
    return (
      <div className="px-4 lg:px-6">
        <div className="text-center py-12">
          <p className="text-destructive">
            Error al cargar los datos de muestreo
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {error instanceof Error ? error.message : 'Error desconocido'}
          </p>
        </div>
      </div>
    )
  }
}
