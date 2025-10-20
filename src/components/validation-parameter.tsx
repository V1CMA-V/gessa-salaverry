import {
  GetInfoGeneral,
  GetParameters,
} from '@/app/dashboard/inspection/[id]/actions'
import ValidationParameterClient from './validation-parameter-client'

export default async function ValidationParameter({ id }: { id: string }) {
  // Obtener los datos de validación desde Supabase
  const validationsData = await GetParameters(id)
  const info = await GetInfoGeneral(id)

  // Si no hay datos, pasar null para que el cliente cree una validación por defecto
  const initialValidations =
    validationsData && validationsData.length > 0 ? validationsData : null

  return (
    <ValidationParameterClient
      id={id}
      initialData={initialValidations}
      calibre={info?.thickness_microns}
      config={info?.roll_config}
    />
  )
}
