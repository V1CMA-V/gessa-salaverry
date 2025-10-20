import GeneralInformationInspection from '@/components/general-information-inspection'
import LiberationParameters from '@/components/liberation-parameters'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ValidationParameterServer from '@/components/validation-parameter-server'
import { TabsContent } from '@radix-ui/react-tabs'
import { GetInfoGeneral, GetParameters } from './actions'

interface InspectionPageProps {
  params: {
    id: string
  }
}

export default async function InspectionPage({ params }: InspectionPageProps) {
  const resolvedParams = await params
  const { id } = resolvedParams

  // Obtener los datos necesarios para LiberationParameters
  const validationsData = await GetParameters(id)
  const info = await GetInfoGeneral(id)

  return (
    <Tabs defaultValue="general-info" className="px-4 lg:px-6 space-y-6">
      <TabsList>
        <TabsTrigger value="general-info">Información General</TabsTrigger>
        <TabsTrigger value="liberation-parameters">
          Parámetros de Liberación
        </TabsTrigger>
        <TabsTrigger value="validation-parameters">
          Parámetros de Validación
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general-info">
        <GeneralInformationInspection id={id} />
      </TabsContent>
      <TabsContent value="liberation-parameters">
        <LiberationParameters
          id={id}
          initialData={validationsData}
          calibre={info?.thickness_microns}
          config={info?.roll_config}
        />
      </TabsContent>
      <TabsContent value="validation-parameters">
        <ValidationParameterServer id={id} />
      </TabsContent>
    </Tabs>
  )
}
