import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { whatsappLink } from '../whatsapp'
import { trackEvent } from '../analytics'

const NAV_LINKS = [
  { to: '/#simular', label: 'Simular' },
  { to: '/financiamento', label: 'Financiamento' },
  { to: '/#como-funciona', label: 'Como funciona' },
  { to: '/obras', label: 'Obras' },
  { to: '/#onde-atuamos', label: 'Onde atuamos' },
  { to: '/aprenda', label: 'Aprenda' },
  { to: '/#contato', label: 'Contato' },
]

// Ids that live on the home page, mapped to the nav link that should stay
// highlighted while the visitor scrolls through that part of the home page
// (several sections share one "chapter" of the nav, e.g. Serviços is still
// part of "Como funciona"). Financiamento, Obras and Aprenda are separate
// routes now, so they're matched against the current pathname instead.
const SECTION_TO_NAV = {
  simular: '/#simular',
  'como-funciona': '/#como-funciona',
  servicos: '/#como-funciona',
  sobre: '/#onde-atuamos',
  'onde-atuamos': '/#onde-atuamos',
  contato: '/#contato',
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrollActiveHref, setScrollActiveHref] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return
    if (typeof IntersectionObserver === 'undefined') return

    const sections = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting)
        if (intersecting.length === 0) return
        const topMost = intersecting.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setScrollActiveHref(SECTION_TO_NAV[topMost.target.id])
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isHome])

  const activeHref = isHome
    ? scrollActiveHref
    : (NAV_LINKS.find((link) => link.to === location.pathname)?.to ?? null)

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/#topo" className="brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="Solar Eleven Watt" />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={activeHref === link.to ? 'is-active' : ''}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            className="btn btn-primary nav-cta"
            href={whatsappLink('Olá! Gostaria de solicitar um orçamento de energia solar.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'header' })}
          >
            Fale no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
