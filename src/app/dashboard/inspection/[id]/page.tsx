import GeneralInformationInspection from '@/components/general-information-inspection'
import LiberationParameters from '@/components/liberation-parameters'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ValidationParameter from '@/components/validation-parameter'
import { TabsContent } from '@radix-ui/react-tabs'

interface InspectionPageProps {
  params: {
    id: string
  }
}

export default async function InspectionPage({ params }: InspectionPageProps) {
  const resolvedParams = await params
  const { id } = resolvedParams

  console.log('Inspection ID:', id)

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
        <LiberationParameters id={id} />
      </TabsContent>
      <TabsContent value="validation-parameters">
        <ValidationParameter id={id} />
      </TabsContent>
    </Tabs>
  )
}
