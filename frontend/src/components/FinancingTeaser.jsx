import { Link } from 'react-router-dom'
import { useInView } from '../useInView'
import { whatsappLink } from '../whatsapp'
import { trackEvent } from '../analytics'
import logoBNB from '../assets/banks/bnb.svg'

export default function FinancingTeaser() {
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''

  return (
    <section id="financiamento" className="section">
      <div ref={ref}>
        <div className={`reveal ${cls}`}>
          <span className="section-label">Financiamento</span>
          <h2>Encontre o caminho certo para pagar o seu projeto</h2>
        </div>

        <div className={`bnb-card reveal reveal-2 ${cls}`}>
          <div className="bnb-card-header">
            <img src={logoBNB} alt="Banco do Nordeste" className="bnb-logo" />
            <span className="bnb-badge">Destaque regional</span>
          </div>
          <h3>Banco do Nordeste — FNE Sol</h3>
          <p>
            O FNE Sol é uma linha do Banco do Nordeste para projetos de micro
            e minigeração distribuída de energia renovável, sujeita a
            cadastro, documentação, garantias e aprovação do banco. Veja
            também outras alternativas do mercado, como BNDES, cooperativas
            de crédito e bancos privados.
          </p>
          <div className="bnb-card-actions">
            <Link
              className="btn btn-primary"
              to="/financiamento"
              onClick={() => trackEvent('financing_teaser_click')}
            >
              Ver financiamento completo
            </Link>
            <a
              className="btn btn-ghost"
              href={whatsappLink(
                'Olá! Gostaria de entender o FNE Sol do Banco do Nordeste para o meu projeto de energia solar.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'financing_teaser' })}
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
