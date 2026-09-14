import { useMemo, useState } from 'react'
import { useInView } from '../useInView'
import { whatsappLink } from '../whatsapp'
import { trackEvent } from '../analytics'
import { PROJECTS, PORTE_TIERS, porteDoProjeto } from '../projects'
import ProjectCard from './ProjectCard'

const TIPOS = ['Todos', 'Residencial', 'Comercial', 'Rural', 'Industrial']
const PORTES = ['Todos', ...PORTE_TIERS]

export default function Projects() {
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''
  const [tipo, setTipo] = useState('Todos')
  const [porte, setPorte] = useState('Todos')

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchTipo = tipo === 'Todos' || p.tipoProjeto === tipo
      const matchPorte = porte === 'Todos' || porteDoProjeto(p.potenciaKwp) === porte
      return matchTipo && matchPorte
    })
  }, [tipo, porte])

  const handleTipo = (t) => {
    setTipo(t)
    trackEvent('projects_filter', { tipo: t, porte })
  }

  const handlePorte = (p) => {
    setPorte(p)
    trackEvent('projects_filter', { tipo, porte: p })
  }

  return (
    <section id="obras" className="section">
      <div ref={ref}>
        <div className={`reveal ${cls}`}>
          <span className="section-label">Obras</span>
          <h2>Projetos reais na Bahia</h2>
          <p className="projects-desc">
            Cada obra abaixo só entra no site com autorização do cliente para
            uso de fotos e depoimento. Filtre por tipo de projeto e porte do
            sistema.
          </p>
        </div>

        {PROJECTS.length > 0 && (
          <div className={`projects-filters reveal reveal-2 ${cls}`}>
            <div className="projects-filter-group">
              <span className="projects-filter-label">Tipo de projeto</span>
              <div className="projects-filter-chips">
                {TIPOS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`projects-chip ${tipo === t ? 'is-active' : ''}`}
                    onClick={() => handleTipo(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="projects-filter-group">
              <span className="projects-filter-label">Porte</span>
              <div className="projects-filter-chips">
                {PORTES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`projects-chip ${porte === p ? 'is-active' : ''}`}
                    onClick={() => handlePorte(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {PROJECTS.length === 0 ? (
          <div className={`projects-empty reveal reveal-2 ${cls}`}>
            <p>
              Estamos organizando o portfólio de obras com fotos e
              depoimentos autorizados pelos clientes. Em breve, projetos
              reais de diferentes cidades, tipos e portes vão aparecer aqui.
            </p>
            <a
              className="btn btn-ghost"
              href={whatsappLink(
                'Olá! Gostaria de ver fotos de obras já feitas na minha região.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'projects_empty' })}
            >
              Peça fotos de obras na sua região
            </a>
          </div>
        ) : (
          <div className={`projects-grid reveal reveal-3 ${cls}`}>
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
            {filtered.length === 0 && (
              <p className="projects-empty-filtered">
                Nenhuma obra encontrada com esse filtro.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
