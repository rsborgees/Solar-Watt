import { useEffect, useRef, useState } from 'react'
import { useInView } from '../useInView'

const STEPS = [
  {
    n: '1',
    title: 'Diagnóstico',
    text: 'Você envia sua conta de luz. Entendemos seu consumo e o tipo de imóvel para preparar a proposta.',
  },
  {
    n: '2',
    title: 'Proposta e contrato',
    text: 'Apresentamos escopo, equipamentos, investimento e condições. O contrato formaliza as responsabilidades de cada parte.',
  },
  {
    n: '3',
    title: 'Projeto técnico',
    text: 'Dimensionamos o sistema e preparamos a documentação, incluindo o registro de responsabilidade técnica quando aplicável.',
  },
  {
    n: '4',
    title: 'Solicitação dos equipamentos',
    text: 'Fazemos o pedido, acompanhamos a logística e conferimos o kit antes da entrega.',
  },
  {
    n: '5',
    title: 'Homologação',
    text: 'Protocolamos o projeto junto à distribuidora responsável pelo seu endereço e acompanhamos a análise.',
  },
  {
    n: '6',
    title: 'Entrega',
    text: 'Os equipamentos chegam ao local da obra, prontos para a instalação.',
  },
  {
    n: '7',
    title: 'Instalação',
    text: 'Montagem dos módulos, inversor, estrutura e conexões elétricas por nossa equipe técnica.',
  },
  {
    n: '8',
    title: 'Vistoria e ativação',
    text: 'Solicitamos a vistoria e cuidamos dos ajustes necessários até a liberação pela distribuidora.',
  },
  {
    n: '9',
    title: 'Pós-venda',
    text: 'Orientação, acompanhamento da geração e suporte contínuo depois que o sistema entra em operação.',
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''
  const stepRefs = useRef([])
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number(entry.target.dataset.index))
        if (intersecting.length > 0) {
          setActiveStep(Math.min(...intersecting))
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="como-funciona" className="section">
      <div className="how-it-works" ref={ref}>
        <div className={`how-it-works-left reveal-left ${cls}`}>
          <span className="section-label">Como funciona</span>
          <h2>Do diagnóstico à energia gerada</h2>
          <p>
            Um exemplo do fluxo das nossas obras. Os prazos variam conforme o
            projeto e a distribuidora responsável pelo seu endereço.
          </p>

          <div className="how-it-works-progress">
            <span className="how-it-works-progress-label">
              Etapa {activeStep + 1} de {STEPS.length} — {STEPS[activeStep].title}
            </span>
            <div className="how-it-works-progress-track">
              <div
                className="how-it-works-progress-fill"
                style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="steps">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              ref={(el) => (stepRefs.current[i] = el)}
              data-index={i}
              className={`step reveal reveal-${(i % 4) + 1} ${cls}`}
            >
              <span className="step-n">{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
