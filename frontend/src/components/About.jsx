import { useInView } from '../useInView'

export default function About() {
  const [ref, inView] = useInView(0.15)
  const cls = inView ? 'in-view' : ''

  return (
    <section id="sobre" className="section">
      <div className="about" ref={ref}>
        <div className={`about-left reveal-left ${cls}`}>
          <span className="section-label">Sobre a empresa</span>
          <h2>Quem cuida da sua energia solar</h2>
        </div>

        <div className={`about-right reveal-right ${cls}`}>
          <p className="about-lead">
            Somos especializados em sistemas fotovoltaicos para residências e
            empresas em Feira de Santana e região. Cuidamos de tudo: projeto,
            instalação e homologação junto à concessionária.
          </p>
          <ul className="about-facts">
            <li>
              <span className="fact-key">Equipamentos</span>
              <span className="fact-val">
                Painéis e inversores de marcas certificadas, com garantia de
                fábrica incluída
              </span>
            </li>
            <li>
              <span className="fact-key">Projeto</span>
              <span className="fact-val">
                Dimensionado conforme seu consumo real, sem
                superdimensionamento, sem desperdício
              </span>
            </li>
            <li>
              <span className="fact-key">Suporte</span>
              <span className="fact-val">
                Instalação, homologação na concessionária e pós-venda
                completos
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
