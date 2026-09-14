import { useInView } from '../useInView'
import { whatsappLink } from '../whatsapp'
import { trackEvent } from '../analytics'
import BankCarousel from './BankCarousel'
import logoBNB from '../assets/banks/bnb.svg'

export default function Financing() {
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
            e minigeração distribuída de energia renovável, podendo incluir os
            componentes do sistema fotovoltaico e a instalação, conforme
            enquadramento e análise. Está sujeito a cadastro, documentação,
            garantias e aprovação do banco.
          </p>
          <div className="bnb-grid">
            <div className="bnb-grid-item">
              <span className="bnb-grid-label">Para quem pode fazer sentido</span>
              <p>Pessoa física, empresa e produtor rural, conforme perfil e enquadramento.</p>
            </div>
            <div className="bnb-grid-item">
              <span className="bnb-grid-label">O que pode entrar no projeto</span>
              <p>Sistema, componentes e instalação, conforme a linha aplicável.</p>
            </div>
            <div className="bnb-grid-item">
              <span className="bnb-grid-label">Como começar</span>
              <p>Simulação inicial, conferência da fatura, elaboração do projeto e orientação sobre documentos.</p>
            </div>
            <div className="bnb-grid-item">
              <span className="bnb-grid-label">O que depende do banco</span>
              <p>Taxa, prazo, carência, garantias, limite, aprovação e agência responsável.</p>
            </div>
          </div>
          <a
            className="btn btn-primary"
            href={whatsappLink(
              'Olá! Gostaria de entender o FNE Sol do Banco do Nordeste para o meu projeto de energia solar.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('financing_click', { institution: 'Banco do Nordeste' })}
          >
            Quero entender o FNE Sol para o meu projeto
          </a>
        </div>

        <div className={`financing-alternatives reveal reveal-3 ${cls}`}>
          <h3 className="financing-alt-title">Outras alternativas do mercado</h3>
          <p className="financing-alt-disclaimer">
            Nomes listados como alternativas de mercado — parceria não
            confirmada. Condições, elegibilidade e produtos variam por
            instituição e estão sujeitos à análise de cada agente financeiro.
          </p>
          <BankCarousel />
        </div>
      </div>
    </section>
  )
}
