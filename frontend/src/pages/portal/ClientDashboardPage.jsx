import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentMeta } from '../../useDocumentMeta'
import RequireAuth from '../../components/RequireAuth'
import { portalApi, clearToken } from '../../portalApi'
import { PROJECT_STEPS } from '../../projectSteps'

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setStatus(null)

    if (newPassword !== confirmPassword) {
      setError('A confirmação não bate com a nova senha.')
      return
    }

    setLoading(true)
    try {
      await portalApi.changePassword(currentPassword, newPassword)
      setStatus('Senha alterada com sucesso.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <details className="portal-password">
      <summary>Trocar senha</summary>
      <form onSubmit={handleSubmit} className="simulator-form">
        <div className="form-field">
          <label htmlFor="current-password">Senha atual</label>
          <input
            id="current-password"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="new-password">Nova senha</label>
          <input
            id="new-password"
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirm-password">Confirmar nova senha</label>
          <input
            id="confirm-password"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="portal-error">{error}</p>}
        {status && <p className="portal-success">{status}</p>}

        <button type="submit" className="btn btn-ghost" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar nova senha'}
        </button>
      </form>
    </details>
  )
}

function ClientDashboard({ me }) {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = () => portalApi.myProjects().then(setProjects).catch((err) => setError(err.message))
    load()

    // Reconsulta ao voltar pra aba e periodicamente, pra refletir uma etapa
    // que a equipe tenha avançado no painel admin enquanto essa tela estava aberta.
    const onVisibility = () => {
      if (document.visibilityState === 'visible') load()
    }
    document.addEventListener('visibilitychange', onVisibility)
    const interval = setInterval(load, 30000)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = () => {
    clearToken()
    navigate('/portal')
  }

  return (
    <section className="section">
      <div className="portal-header">
        <div>
          <span className="section-label">Área do cliente</span>
          <h1>Olá, {me.name.split(' ')[0]}</h1>
        </div>
        <button type="button" className="btn btn-ghost" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {error && <p className="portal-error">{error}</p>}

      {!projects ? (
        <p className="page-hero-desc">Carregando seus projetos...</p>
      ) : projects.length === 0 ? (
        <p className="page-hero-desc">
          Ainda não há um projeto vinculado à sua conta. Fale com a nossa equipe.
        </p>
      ) : (
        <div className="portal-projects">
          {projects.map((project) => {
            const stepIndex = project.currentStep - 1
            return (
              <div key={project.id} className="portal-project-card">
                <div className="portal-project-head">
                  <h2>
                    {project.tipoProjeto} — {project.cidade}, {project.uf}
                  </h2>
                  {project.potenciaKwp && <span>{project.potenciaKwp} kWp</span>}
                </div>

                <div className="how-it-works-progress">
                  <span className="how-it-works-progress-label">
                    Etapa {project.currentStep} de {PROJECT_STEPS.length} — {PROJECT_STEPS[stepIndex]}
                  </span>
                  <div className="how-it-works-progress-track">
                    <div
                      className="how-it-works-progress-fill"
                      style={{ width: `${(project.currentStep / PROJECT_STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <ol className="portal-steps-list">
                  {PROJECT_STEPS.map((step, i) => (
                    <li key={step} className={i <= stepIndex ? 'is-done' : ''}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}
        </div>
      )}

      <ChangePasswordForm />
    </section>
  )
}

export default function ClientDashboardPage() {
  useDocumentMeta({ title: 'Meu painel | Solar Eleven Watt' })
  return <RequireAuth>{(me) => <ClientDashboard me={me} />}</RequireAuth>
}
