import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentMeta } from '../../useDocumentMeta'
import RequireAuth from '../../components/RequireAuth'
import { portalApi, clearToken } from '../../portalApi'
import { PROJECT_STEPS } from '../../projectSteps'

function ClientDashboard({ me }) {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    portalApi
      .myProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
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
    </section>
  )
}

export default function ClientDashboardPage() {
  useDocumentMeta({ title: 'Meu painel | Solar Eleven Watt' })
  return <RequireAuth>{(me) => <ClientDashboard me={me} />}</RequireAuth>
}
