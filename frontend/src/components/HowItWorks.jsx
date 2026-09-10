import { useInView } from '../useInView'

const STEPS = [
  {
    n: '1',
    title: 'Você nos conta sobre o consumo',
    text: 'Fale com nosso time pelo WhatsApp. Em poucos minutos já temos as informações para elaborar seu projeto.',
  },
  {
    n: '2',
    title: 'Fazemos o projeto sob medida',
    text: 'Dimensionamos o sistema ideal para a sua casa ou empresa, com memorial descritivo e orçamento detalhado — sem compromisso.',
  },
  {
    n: '3',
    title: 'Nossa equipe instala e homologa',
    text: 'Cuidamos de tudo: painéis, inversores, parte elétrica e o processo de homologação junto à concessionária.',
  },
  {
    n: '4',
    title: 'Você passa a gerar sua própria energia',
    text: 'O sistema entra em operação e você começa a economizar. O retorno costuma acontecer entre 3 e 5 anos — e o sistema dura 25.',
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''

  return (
    <section id="como-funciona" className="section">
      <div className="how-it-works" ref={ref}>
        <div className={`how-it-works-left reveal-left ${cls}`}>
          <span className="section-label">Como funciona</span>
          <h2>Do orçamento à economia, sem complicação</h2>
          <p>
            Cuidamos de cada etapa para que você não precise se preocupar com
            nada.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`step reveal reveal-${i + 1} ${cls}`}
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
