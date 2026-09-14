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
            Somos especializados em sistemas fotovoltaicos com sede no
            Recôncavo Baiano e atuação em Feira de Santana e outras cidades da
            Bahia onde temos capacidade operacional confirmada. Cuidamos de
            tudo: projeto, instalação e homologação junto à distribuidora.
          </p>
          <p className="about-lead">
            A Bahia tem 417 municípios — tratamos isso como o tamanho do
            mercado que enxergamos, não como uma promessa de atendimento
            imediato em todo o estado. Priorizamos as regiões onde já temos
            obras ou capacidade operacional confirmada.
          </p>
          <ul className="about-facts">
            <li>
              <span className="fact-key">Experiência</span>
              <span className="fact-val">
                Mais de 800 sistemas acompanhados ao longo da nossa trajetória,
                sujeito à confirmação do inventário comercial
              </span>
            </li>
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
                Instalação, homologação junto à distribuidora e pós-venda
                completos
              </span>
            </li>
          </ul>

          <div className="about-aside">
            <strong>Nossa sede e a energia que praticamos.</strong> Estamos
            transformando nossa própria sede em um espaço que reflete o que
            instalamos para os nossos clientes — preferimos mostrar o processo
            real a antecipar uma obra que ainda não está concluída.
          </div>
        </div>
      </div>
    </section>
  )
}
