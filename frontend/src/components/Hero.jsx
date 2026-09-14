import { useEffect, useState } from 'react'
import { whatsappLink } from '../whatsapp'
import { trackEvent } from '../analytics'
import imgSunset from '../assets/img1.webp'
import imgAerial from '../assets/img2.webp'
import imgRoof from '../assets/img3.webp'

function SavingsReadout() {
  const [prefersReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [value, setValue] = useState(() => (prefersReduced ? 95 : 0))

  useEffect(() => {
    if (prefersReduced) return
    const duration = 1800
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * 95))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [prefersReduced])

  return <>{value}</>
}

export default function Hero() {
  return (
    <section id="topo" className="hero">
      <div className="hero-text">
        <span className="hero-location">Recôncavo &amp; região — Bahia</span>
        <h1>
          Energia solar<br />
          feita para a<br />
          <em>realidade da Bahia.</em>
        </h1>
        <p className="hero-lede">
          Simule sua economia, entenda cada etapa da instalação e encontre o
          caminho de financiamento mais adequado para o seu projeto.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="#simular"
            onClick={() => trackEvent('simulator_cta_click', { location: 'hero' })}
          >
            Calcular minha economia
          </a>
          <a
            className="btn btn-ghost"
            href={whatsappLink('Olá! Gostaria de solicitar um orçamento de energia solar.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'hero' })}
          >
            Falar com especialista
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-mosaic">
          <div className="mosaic-item mosaic-photo">
            <img
              src={imgSunset}
              alt="Instalação de placas solares ao entardecer em Feira de Santana"
              loading="eager"
            />
            <div className="photo-tag">
              <span className="photo-tag-dot" />
              <span>Obra em Feira de Santana</span>
            </div>
          </div>

          <div className="mosaic-item mosaic-photo">
            <img
              src={imgAerial}
              alt="Vista aérea de sistema solar homologado em telhado residencial"
              loading="eager"
            />
            <div className="photo-tag">
              <span>Vista aérea homologada</span>
            </div>
          </div>

          <div className="mosaic-item mosaic-photo">
            <img
              src={imgRoof}
              alt="Módulos fotovoltaicos instalados em telhado colonial com sol poente"
              loading="eager"
            />
            <div className="photo-tag">
              <span>Painéis de alta eficiência</span>
            </div>
          </div>

          <div className="mosaic-item mosaic-stat">
            <span className="stat-card-badge">Economia comprovada</span>
            <div className="stat-card-number">
              <SavingsReadout /><small>%</small>
            </div>
            <p className="stat-card-text">
              de redução máxima na conta de luz dos nossos clientes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
