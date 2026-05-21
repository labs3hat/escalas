'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    setLoading(false)
    if (error) { toast.error('Erro ao enviar link: ' + error.message); return }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-500 rounded-2xl mb-4">
            <span className="text-white font-bold text-2xl">3H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">3HAT Escalas</h1>
          <p className="text-gray-500 text-sm mt-1">Gestão de escalas operacionais</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {!sent ? (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Entrar</h2>
              <p className="text-gray-500 text-sm mb-5">
                Digite seu e-mail para receber o link de acesso.
              </p>
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors disabled:opacity-60"
                >
                  {loading ? 'Enviando...' : 'Enviar link de acesso'}
                </button>
              </form>
              <p className="text-xs text-gray-400 text-center mt-4">
                Sem senha. Acesso seguro por e-mail.
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Link enviado!</h3>
              <p className="text-sm text-gray-500 mb-4">
                Verifique o e-mail <strong>{email}</strong> e clique no link para entrar.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-brand-500 hover:underline"
              >
                Usar outro e-mail
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
