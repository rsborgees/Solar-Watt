import { useEffect, useState } from 'react'
import { whatsappLink } from '../whatsapp'
import imgSunset from '../assets/img1.png'
import imgAerial from '../assets/img2.png'
import imgRoof from '../assets/img3.png'

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
        <span className="hero-location">Feira de Santana &amp; região — BA</span>
        <h1>
          Energia solar<br />
          que cabe no<br />
          <em>seu bolso.</em>
        </h1>
        <p className="hero-lede">
          Projetamos e instalamos sistemas fotovoltaicos para casas e
          empresas. Você começa a economizar no primeiro mês após a
          instalação.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href={whatsappLink('Olá! Gostaria de solicitar um orçamento de energia solar.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir orçamento gratuito
          </a>
          <a className="btn btn-text" href="#sobre">
            Conheça a empresa →
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
