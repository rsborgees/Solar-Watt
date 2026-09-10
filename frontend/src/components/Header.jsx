import { useState } from 'react'
import logo from '../assets/logo.png'
import { whatsappLink } from '../whatsapp'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#topo" className="brand">
          <img src={logo} alt="Solar Eleven Watt" />
        </a>

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
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            className="btn btn-primary nav-cta"
            href={whatsappLink('Olá! Gostaria de solicitar um orçamento de energia solar.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
