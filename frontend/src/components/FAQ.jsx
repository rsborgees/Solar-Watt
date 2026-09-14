import { useState } from 'react'
import { useInView } from '../useInView'
import { trackEvent } from '../analytics'

const FAQS = [
  {
    q: 'Como funciona um sistema fotovoltaico conectado à rede?',
    a: 'Os módulos captam luz solar e geram energia elétrica, convertida pelo inversor para uso na sua instalação. O excedente é injetado na rede da distribuidora e vira crédito de energia, dentro das regras do Sistema de Compensação de Energia Elétrica.',
  },
  {
    q: 'O que observar na conta de luz antes de pedir um orçamento?',
    a: 'Consumo médio em kWh dos últimos meses, tipo de ligação (mono, bi ou trifásica), modalidade tarifária e valores de custo de disponibilidade. Esses dados são o ponto de partida do dimensionamento.',
  },
  {
    q: 'O que é regra nacional e o que depende da distribuidora local?',
    a: 'A Lei nº 14.300/2022 e as resoluções da ANEEL definem as regras gerais de micro e minigeração distribuída em todo o país. Procedimentos de acesso, documentos, canais e prazos operacionais podem variar conforme a distribuidora responsável pelo seu endereço — na Bahia, a referência operacional é a Neoenergia Coelba nas áreas sob sua concessão.',
  },
  {
    q: 'Por que dois imóveis com a mesma conta podem precisar de sistemas diferentes?',
    a: 'O dimensionamento considera consumo, tipo de telhado, orientação solar, sombreamento e padrão de entrada de energia. Dois imóveis com consumo parecido podem ter condições técnicas bem diferentes.',
  },
  {
    q: 'Como comparar uma linha de financiamento sem olhar só a parcela?',
    a: 'Compare taxa efetiva, prazo, carência, garantias exigidas e o que está incluso no valor financiado (equipamentos, instalação, projeto). A parcela mais baixa nem sempre é a condição mais vantajosa no total.',
  },
  {
    q: 'Quanto tempo leva cada etapa e o que pode causar atraso?',
    a: 'O prazo varia por projeto, disponibilidade de equipamentos e principalmente pelo tempo de análise da distribuidora na homologação. Documentação incompleta é a causa mais comum de atraso.',
  },
]

const LAST_UPDATED = 'setembro de 2026'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''

  return (
    <section id="faq" className="section-alt">
      <div className="services-header" ref={ref}>
        <div className={`reveal-left ${cls}`}>
          <span className="section-label">Perguntas frequentes</span>
          <h2>Antes de contratar, entenda como funciona</h2>
        </div>
        <p className={`services-desc reveal-right ${cls}`}>
          Conteúdo educativo, atualizado em {LAST_UPDATED} e sujeito a revisão
          técnica sempre que houver mudança regulatória ou de procedimento da
          distribuidora.
        </p>
      </div>

      <div className="services-list">
        {FAQS.map((item, index) => {
          const isOpen = index === openIndex
          return (
            <div
              key={item.q}
              className={`service-item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                type="button"
                className="service-trigger"
                aria-expanded={isOpen}
                onClick={() => {
                  const next = isOpen ? -1 : index
                  setOpenIndex(next)
                  if (next !== -1) trackEvent('faq_open', { question: item.q })
                }}
              >
                <span>{item.q}</span>
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
                <p>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
