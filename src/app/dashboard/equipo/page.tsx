import { EquipoLegend } from '@/components/equipo-legend'
import { UserTable } from '@/components/users-table'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()
  const { data: userData, error } = await supabase.auth.getUser()
  if (error || userData.user.user_metadata.role !== 'admin') {
    redirect('/dashboard')
  }

  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('*')

  if (fetchError) {
    console.error('Error fetching users:', fetchError)
    return <div>Error loading users</div>
  }

  return (
    <>
      <UserTable data={data} />
      <EquipoLegend />
    </>
  )
}
