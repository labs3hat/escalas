import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RegionalClient from '@/components/regional/RegionalClient'

export default async function RegionalPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  if (!['regional','diretoria','rh'].includes(profile?.role ?? '')) {
    redirect('/escalas')
  }

  const { data: stores } = await supabase
    .from('stores').select('*').eq('active', true).order('code')

  return <RegionalClient stores={stores ?? []} />
}
