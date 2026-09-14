import { useMemo, useState } from 'react'
import { useInView } from '../useInView'
import { whatsappLink } from '../whatsapp'
import { trackEvent } from '../analytics'

const MY_MAPS_EMBED_SRC =
  'https://www.google.com/maps/d/u/0/embed?mid=1E4rwmEliV0ptGr9-1i9VyzypKiKUSEw&ehbc=2E312F&noprof=1'

const AREAS = [
  { name: 'Recôncavo Baiano', type: 'Região', tag: 'Sede' },
  { name: 'Feira de Santana', type: 'Cidade', tag: 'Base operacional' },
  { name: 'Valença', type: 'Cidade', tag: 'Atuação confirmada' },
  { name: 'Cruz das Almas', type: 'Cidade', tag: 'Atuação confirmada' },
  { name: 'Itabuna', type: 'Cidade', tag: 'Atuação confirmada' },
  { name: 'Salvador', type: 'Cidade', tag: 'Atuação confirmada' },
  { name: 'Linha Verde', type: 'Região', tag: 'Atuação confirmada' },
]

function PinIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  )
}

export default function ServiceAreas() {
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return AREAS
    return AREAS.filter((a) => a.name.toLowerCase().includes(q))
  }, [query])

  const selectCity = (name) => {
    setActive(name)
    setQuery(name)
    trackEvent('service_area_card_click', { city: name })
  }

  return (
    <section id="onde-atuamos" className="section">
      <div ref={ref}>
        <div className={`reveal ${cls}`}>
          <span className="section-label">Onde atuamos</span>
          <h2>Presença com raízes na Bahia</h2>
          <p className="areas-desc">
            Nossa base fica no Recôncavo Baiano, com atuação confirmada nas
            regiões abaixo. A Bahia tem 417 municípios — atendemos com
            prioridade onde já temos obras ou capacidade operacional
            confirmada, e avaliamos novos pedidos caso a caso.
          </p>
        </div>

        <div className={`areas-stack reveal reveal-2 ${cls}`}>
          <div className="areas-map-visual">
            <div className="areas-gmap-crop">
              <iframe
                className="areas-gmap"
                title="Mapa das áreas de atuação"
                src={MY_MAPS_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="areas-list-panel">
            <div className="areas-filter">
              <input
                type="text"
                placeholder="Buscar cidade ou região..."
                value={query}
                onChange={(e) => {
                  setActive(null)
                  setQuery(e.target.value)
                  trackEvent('service_area_filter', { query: e.target.value })
                }}
                aria-label="Buscar cidade ou região"
              />
            </div>

            <div className="areas-grid">
              {filtered.map((area) => (
                <button
                  type="button"
                  key={area.name}
                  className={`area-card ${active === area.name ? 'is-active' : ''}`}
                  onClick={() => selectCity(area.name)}
                >
                  <PinIcon className="area-pin" />
                  <div>
                    <span className="area-name">{area.name}</span>
                    <span className="area-type">{area.type}</span>
                  </div>
                  <span className="area-tag">{area.tag}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="areas-empty">
                  Nenhuma região encontrada para "{query}".
                </p>
              )}
            </div>

            <div className="areas-cta">
              <p>Sua cidade não está na lista?</p>
              <a
                className="btn btn-ghost"
                href={whatsappLink(
                  'Olá! Gostaria de saber se vocês atendem a minha cidade.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'service_areas' })}
              >
                Fale com a gente pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
