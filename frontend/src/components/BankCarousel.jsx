import { useEffect, useRef } from 'react'
import logoBB from '../assets/banks/bb.svg'
import logoBNDES from '../assets/banks/bndes.svg'
import logoBradesco from '../assets/banks/bradesco.svg'
import logoBTG from '../assets/banks/btg.svg'
import logoBV from '../assets/banks/bv.svg'
import logoCaixa from '../assets/banks/caixa.svg'
import logoItau from '../assets/banks/itau.svg'
import logoSantander from '../assets/banks/santander.svg'
import logoSicoob from '../assets/banks/sicoob.svg'
import logoSicredi from '../assets/banks/sicredi.svg'
import logoSolfacil from '../assets/banks/solfacil-white.svg'

const ALTERNATIVES = [
  { name: 'BNDES', category: 'Banco de desenvolvimento', logo: logoBNDES },
  { name: 'BTG Pactual', category: 'Banco', logo: logoBTG },
  { name: 'Banco Santander', category: 'Banco', logo: logoSantander },
  { name: 'Itaú', category: 'Banco', logo: logoItau },
  { name: 'Caixa Econômica Federal', category: 'Banco público', logo: logoCaixa },
  { name: 'Sicoob', category: 'Sistema cooperativo', logo: logoSicoob },
  { name: 'Sicredi', category: 'Sistema cooperativo', logo: logoSicredi },
  { name: 'BV', category: 'Banco / financiamento', logo: logoBV },
  { name: 'Solfácil', category: 'Plataforma de crédito especializada', logo: logoSolfacil, dark: true },
  { name: 'Bradesco', category: 'Banco', logo: logoBradesco },
  { name: 'Banco do Brasil', category: 'Banco público', logo: logoBB },
]

const SPEED_PX_PER_SEC = 40

function ArrowIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  )
}

function Card({ item, hidden }) {
  return (
    <div
      className={`bank-card ${item.dark ? 'bank-card-dark' : ''}`}
      aria-hidden={hidden || undefined}
    >
      <img
        src={item.logo}
        alt={hidden ? '' : item.name}
        className="bank-card-logo"
        loading="lazy"
      />
      <span className="bank-card-category">{item.category}</span>
    </div>
  )
}

export default function BankCarousel() {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame
    let last = performance.now()

    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now

      if (!pausedRef.current) {
        const halfWidth = track.scrollWidth / 2
        let next = track.scrollLeft + SPEED_PX_PER_SEC * dt
        if (next >= halfWidth) next -= halfWidth
        track.scrollLeft = next
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const pause = () => {
    pausedRef.current = true
  }
  const resume = () => {
    pausedRef.current = false
  }

  const scrollByAmount = (dir) => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.querySelector('.bank-card')?.offsetWidth || 200
    track.scrollBy({ left: dir * (cardWidth + 14) * 2, behavior: 'smooth' })
  }

  return (
    <div
      className="bank-carousel"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <button
        type="button"
        className="bank-carousel-arrow bank-carousel-arrow-left"
        onClick={() => scrollByAmount(-1)}
        aria-label="Ver instituições anteriores"
      >
        <ArrowIcon direction="left" />
      </button>

      <div className="bank-carousel-track" ref={trackRef}>
        {ALTERNATIVES.map((item) => (
          <Card key={item.name} item={item} />
        ))}
        {ALTERNATIVES.map((item) => (
          <Card key={`${item.name}-dup`} item={item} hidden />
        ))}
      </div>

      <button
        type="button"
        className="bank-carousel-arrow bank-carousel-arrow-right"
        onClick={() => scrollByAmount(1)}
        aria-label="Ver mais instituições"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  )
}
