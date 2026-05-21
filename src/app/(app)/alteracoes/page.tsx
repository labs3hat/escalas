import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AlteracoesClient from '@/components/alteracoes/AlteracoesClient'

export default async function AlteracoesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: stores } = await supabase
    .from('stores').select('*')
    .in('id', profile?.store_ids ?? [])
    .eq('active', true).order('code')

  return <AlteracoesClient profile={profile} initialStores={stores ?? []} />
}
