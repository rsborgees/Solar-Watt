import { porteDoProjeto } from '../projects'

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-photo">
        {project.fotos?.[0] && (
          <img
            src={project.fotos[0]}
            alt={`Sistema fotovoltaico instalado em ${project.cidade}`}
            loading="lazy"
          />
        )}
        <span className="project-card-tag">{porteDoProjeto(project.potenciaKwp)}</span>
      </div>
      <div className="project-card-body">
        <span className="project-card-city">
          {project.cidade} — {project.uf}
        </span>
        <span className="project-card-type">
          {project.tipoProjeto} · {project.potenciaKwp} kWp
        </span>
        {project.resultado && <p className="project-card-result">{project.resultado}</p>}
        {project.depoimento && (
          <blockquote className="project-card-quote">
            "{project.depoimento}"
            {project.clienteNome && <cite>— {project.clienteNome}</cite>}
          </blockquote>
        )}
      </div>
    </article>
  )
}
