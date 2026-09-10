import { useInView } from '../useInView'

const BENEFITS = [
  {
    value: '95%',
    label: 'de redução',
    desc: 'na conta de luz dos nossos clientes',
  },
  {
    value: '25',
    label: 'anos de garantia',
    desc: 'dos painéis fotovoltaicos instalados',
  },
  {
    value: '+8%',
    label: 'valorização',
    desc: 'do imóvel com sistema fotovoltaico',
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
