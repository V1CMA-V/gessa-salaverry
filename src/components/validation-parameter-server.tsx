import {
  GetInfoGeneral,
  GetParameters,
} from '@/app/dashboard/inspection/[id]/actions'
import ValidationParameter from './validation-parameter'

export default async function ValidationParameterServer({
  id,
}: {
  id: string
}) {
  // Obtener los datos de validación desde Supabase
  const validationsData = await GetParameters(id)
  const info = await GetInfoGeneral(id)

  // Si no hay datos, pasar null
  const initialValidations =
    validationsData && validationsData.length > 0 ? validationsData : null

  return (
    <ValidationParameter
      id={id}
      initialData={initialValidations}
      calibre={info?.thickness_microns}
      config={info?.roll_config}
    />
  )
}
