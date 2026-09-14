import { Link } from 'react-router-dom'
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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Solar Eleven Watt" />
          <p>Energia solar fotovoltaica no Recôncavo, Feira de Santana e região da Bahia.</p>
        </div>

        <nav className="footer-nav" aria-label="Links do rodapé">
          <span className="footer-col-label">Navegação</span>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-contact">
          <span className="footer-col-label">Contato</span>
          <a
            href={whatsappLink(
              'Olá! Gostaria de solicitar um orçamento de energia solar.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
          >
            (75) 99958-3373
          </a>
          <a
            href="https://www.instagram.com/solarelevenwatt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @solarelevenwatt
          </a>
          <Link to="/#contato">Av. Transnordestina, 3180 — Feira de Santana</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} Solar Eleven Watt. Todos os direitos reservados.</p>
          <Link to="/portal" className="footer-portal-link">
            Área do cliente
          </Link>
        </div>
      </div>
    </footer>
  )
}
