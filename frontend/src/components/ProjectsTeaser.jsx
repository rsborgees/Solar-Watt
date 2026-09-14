import { Link } from 'react-router-dom'
import { useInView } from '../useInView'
import { whatsappLink } from '../whatsapp'
import { trackEvent } from '../analytics'
import { PROJECTS } from '../projects'
import ProjectCard from './ProjectCard'

export default function ProjectsTeaser() {
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''
  const highlight = PROJECTS.slice(0, 3)

  return (
    <section id="obras" className="section">
      <div ref={ref}>
        <div className={`reveal ${cls}`}>
          <span className="section-label">Obras</span>
          <h2>Projetos reais na Bahia</h2>
        </div>

        {highlight.length === 0 ? (
          <div className={`projects-empty reveal reveal-2 ${cls}`}>
            <p>
              Estamos organizando o portfólio de obras com fotos e
              depoimentos autorizados pelos clientes.
            </p>
            <a
              className="btn btn-ghost"
              href={whatsappLink(
                'Olá! Gostaria de ver fotos de obras já feitas na minha região.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'projects_teaser_empty' })}
            >
              Peça fotos de obras na sua região
            </a>
          </div>
        ) : (
          <div className={`projects-grid reveal reveal-3 ${cls}`}>
            {highlight.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}

        <div className={`projects-teaser-cta reveal reveal-4 ${cls}`}>
          <Link
            className="btn btn-primary"
            to="/obras"
            onClick={() => trackEvent('projects_teaser_click')}
          >
            Ver todas as obras
          </Link>
        </div>
      </div>
    </section>
  )
}
