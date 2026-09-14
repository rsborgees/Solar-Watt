import { useInView } from '../useInView'

const BENEFITS = [
  {
    value: 'Até 95%',
    label: 'de redução',
    desc: 'na conta de luz, variando conforme consumo e dimensionamento',
  },
  {
    value: '25',
    label: 'anos de garantia',
    desc: 'de fábrica dos painéis fotovoltaicos, conforme fabricante',
  },
  {
    value: 'Valorização',
    label: 'do imóvel',
    desc: 'sistemas fotovoltaicos tendem a agregar valor, segundo o mercado',
  },
  {
    value: 'Zero',
    label: 'emissão de CO₂',
    desc: 'na geração de energia solar',
  },
]

export default function Benefits() {
  const [ref, inView] = useInView(0.15)
  const cls = inView ? 'in-view' : ''

  return (
    <section className="section-alt">
      <div className="section-inner" ref={ref}>
        <div className={`reveal ${cls}`}>
          <span className="section-label">Por que solar</span>
          <h2>Números que fazem sentido</h2>
        </div>
        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <div
              key={b.value}
              className={`benefit-item reveal reveal-${i + 1} ${cls}`}
            >
              <span className="benefit-value">{b.value}</span>
              <span className="benefit-label">{b.label}</span>
              <p className="benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
