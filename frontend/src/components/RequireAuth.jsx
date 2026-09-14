import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getToken, portalApi } from '../portalApi'

// Confere se existe um token válido chamando /api/me antes de renderizar a
// página protegida. Se `adminOnly`, exige também que o cliente logado seja
// admin — senão manda pro painel normal em vez do painel admin.
export default function RequireAuth({ adminOnly = false, children }) {
  const token = getToken()
  const [state, setState] = useState({ status: 'checking', me: null })

  useEffect(() => {
    if (!token) return

    let cancelled = false
    portalApi
      .me()
      .then((me) => {
        if (!cancelled) setState({ status: 'authenticated', me })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'unauthenticated', me: null })
      })

    return () => {
      cancelled = true
    }
  }, [token])

  if (!token || state.status === 'unauthenticated') {
    return <Navigate to="/portal" replace />
  }

  if (state.status === 'checking') {
    return <div className="portal-loading">Carregando...</div>
  }

  if (adminOnly && !state.me.isAdmin) {
    return <Navigate to="/portal/painel" replace />
  }

  return children(state.me)
}
