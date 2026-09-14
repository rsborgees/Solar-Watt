import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentMeta } from '../../useDocumentMeta'
import { portalApi, setToken } from '../../portalApi'

export default function PortalLoginPage() {
  useDocumentMeta({ title: 'Área do cliente | Solar Eleven Watt' })

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { token, isAdmin } = await portalApi.login(email, password)
      setToken(token)
      navigate(isAdmin ? '/portal/admin' : '/portal/painel')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section portal-auth">
      <div className="portal-auth-card">
        <span className="section-label">Área do cliente</span>
        <h1>Acompanhe o seu projeto</h1>
        <p className="page-hero-desc">
          Entre com o e-mail e senha que nossa equipe cadastrou pra você.
        </p>

        <form onSubmit={handleSubmit} className="simulator-form">
          <div className="form-field">
            <label htmlFor="portal-email">E-mail</label>
            <input
              id="portal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="portal-password">Senha</label>
            <input
              id="portal-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="portal-error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="portal-auth-note">
          Ainda não tem acesso? Fale com a equipe pelo WhatsApp pra ser cadastrado.
        </p>
      </div>
    </section>
  )
}
