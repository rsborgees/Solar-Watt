import logo from '../assets/logo.png'
import { whatsappLink } from '../whatsapp'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#contato', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Solar Eleven Watt" />
          <p>Energia solar fotovoltaica em Feira de Santana e região.</p>
        </div>

        <nav className="footer-nav" aria-label="Links do rodapé">
          <span className="footer-col-label">Navegação</span>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
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
          <a href="#contato">
            Av. Transnordestina, 3180 — Feira de Santana
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} Solar Eleven Watt. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
