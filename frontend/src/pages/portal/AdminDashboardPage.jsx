import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentMeta } from '../../useDocumentMeta'
import RequireAuth from '../../components/RequireAuth'
import { portalApi, clearToken } from '../../portalApi'
import { PROJECT_STEPS } from '../../projectSteps'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  password: '',
  cidade: '',
  uf: 'BA',
  tipoProjeto: 'Residencial',
  potenciaKwp: '',
}

function AdminDashboard() {
  const navigate = useNavigate()
  const [clients, setClients] = useState(null)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState(null)

  const loadClients = () => {
    portalApi
      .adminListClients()
      .then(setClients)
      .catch((err) => setError(err.message))
  }

  useEffect(loadClients, [])

  const handleLogout = () => {
    clearToken()
    navigate('/portal')
  }

  const handleStepChange = async (projectId, currentStep) => {
    try {
      await portalApi.adminUpdateProjectStep(projectId, Number(currentStep))
      loadClients()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError(null)
    setCreating(true)
    try {
      await portalApi.adminCreateClient({
        ...form,
        potenciaKwp: form.potenciaKwp ? Number(form.potenciaKwp) : null,
      })
      setForm(emptyForm)
      loadClients()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setCreating(false)
    }
  }

  return (
    <section className="section">
      <div className="portal-header">
        <div>
          <span className="section-label">Painel admin</span>
          <h1>Clientes e obras</h1>
        </div>
        <button type="button" className="btn btn-ghost" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {error && <p className="portal-error">{error}</p>}

      <div className="portal-admin-grid">
        <div className="portal-admin-clients">
          {!clients ? (
            <p className="page-hero-desc">Carregando...</p>
          ) : clients.length === 0 ? (
            <p className="page-hero-desc">Nenhum cliente cadastrado ainda.</p>
          ) : (
            clients.map((client) => (
              <div key={client.id} className="portal-project-card">
                <div className="portal-project-head">
                  <h2>{client.name}</h2>
                  <span>{client.email}</span>
                </div>
                {client.projects.map((project) => (
                  <div key={project.id} className="portal-admin-project-row">
                    <span>
                      {project.tipoProjeto} — {project.cidade}/{project.uf}
                      {project.potenciaKwp ? ` · ${project.potenciaKwp} kWp` : ''}
                    </span>
                    <select
                      value={project.currentStep}
                      onChange={(e) => handleStepChange(project.id, e.target.value)}
                    >
                      {PROJECT_STEPS.map((step, i) => (
                        <option key={step} value={i + 1}>
                          {i + 1}. {step}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <form className="simulator-form portal-admin-form" onSubmit={handleCreate}>
          <h2>Novo cliente</h2>

          <div className="form-field">
            <label htmlFor="c-name">Nome</label>
            <input
              id="c-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="c-email">E-mail</label>
            <input
              id="c-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="c-phone">Telefone (opcional)</label>
            <input
              id="c-phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="c-password">Senha inicial</label>
            <input
              id="c-password"
              type="text"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="c-cidade">Cidade</label>
              <input
                id="c-cidade"
                required
                value={form.cidade}
                onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
              />
            </div>
            <div className="form-field form-field-uf">
              <label htmlFor="c-uf">UF</label>
              <input
                id="c-uf"
                required
                maxLength={2}
                value={form.uf}
                onChange={(e) => setForm((f) => ({ ...f, uf: e.target.value.toUpperCase() }))}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="c-tipo">Tipo de projeto</label>
            <select
              id="c-tipo"
              value={form.tipoProjeto}
              onChange={(e) => setForm((f) => ({ ...f, tipoProjeto: e.target.value }))}
            >
              <option>Residencial</option>
              <option>Comercial</option>
              <option>Rural</option>
              <option>Industrial</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="c-kwp">Potência (kWp, opcional)</label>
            <input
              id="c-kwp"
              type="number"
              step="0.1"
              value={form.potenciaKwp}
              onChange={(e) => setForm((f) => ({ ...f, potenciaKwp: e.target.value }))}
            />
          </div>

          {formError && <p className="portal-error">{formError}</p>}

          <button type="submit" className="btn btn-primary" disabled={creating}>
            {creating ? 'Criando...' : 'Criar cliente'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default function AdminDashboardPage() {
  useDocumentMeta({ title: 'Painel admin | Solar Eleven Watt' })
  return <RequireAuth adminOnly>{() => <AdminDashboard />}</RequireAuth>
}
