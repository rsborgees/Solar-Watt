import { useState } from 'react'
import { useInView } from '../useInView'

const SERVICES = [
  {
    title: 'Energia solar residencial',
    text: 'Sistemas para casas e apartamentos. Reduz sua conta todo mês — o retorno do investimento costuma acontecer entre 3 e 5 anos, e o sistema dura 25 anos.',
  },
  {
    title: 'Energia solar comercial e industrial',
    text: 'Projetos de maior porte para empresas e indústrias que buscam reduzir custos operacionais com energia limpa e previsível.',
  },
  {
    title: 'Manutenção e monitoramento',
    text: 'Acompanhamento da geração do sistema e manutenção preventiva para garantir que seu investimento continue rendendo ao longo do tempo.',
  },
  {
    title: 'Expansão de sistema existente',
    text: 'Ampliação de instalações já existentes para acompanhar o crescimento do consumo ou aumentar a capacidade de geração.',
  },
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0)
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''

  return (
    <section id="servicos" className="section-alt">
      <div className="services-header" ref={ref}>
        <div className={`reveal-left ${cls}`}>
          <span className="section-label">Serviços</span>
          <h2>Soluções para todo tipo de projeto</h2>
        </div>
        <p className={`services-desc reveal-right ${cls}`}>
          Do residencial ao industrial, dimensionamos o sistema certo para o
          seu consumo.
        </p>
      </div>

      <div className="services-list">
        {SERVICES.map((service, index) => {
          const isOpen = index === openIndex
          return (
            <div
              key={service.title}
              className={`service-item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                type="button"
                className="service-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{service.title}</span>
                <svg
                  className="service-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <div className="service-panel">
                <p>{service.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
