import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EscalasClient from '@/components/escalas/EscalasClient'

export default async function EscalasPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).single()

  const { data: stores } = await supabase
    .from('stores').select('*')
    .in('id', profile?.store_ids ?? [])
    .eq('active', true)
    .order('code')

  return <EscalasClient profile={profile} initialStores={stores ?? []} />
}
