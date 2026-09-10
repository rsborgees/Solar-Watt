import { useInView } from '../useInView'
import { whatsappLink } from '../whatsapp'

export default function Contact() {
  const [ref, inView] = useInView(0.15)
  const cls = inView ? 'in-view' : ''

  return (
    <section id="contato" className="section">
      <div className="contact" ref={ref}>
        <div className={`contact-left reveal-left ${cls}`}>
          <span className="section-label">Contato</span>
          <h2>Pronto para economizar?</h2>
          <p>
            Fale com nosso time pelo WhatsApp. A visita técnica e o orçamento
            são completamente gratuitos e sem compromisso.
          </p>
          <a
            className="btn btn-primary btn-large"
            href={whatsappLink(
              'Olá! Gostaria de solicitar um orçamento de energia solar.',
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>

        <div className={`contact-right reveal-right ${cls}`}>
          <div className="contact-detail">
            <span className="contact-detail-label">WhatsApp</span>
            <a
              href={whatsappLink(
                'Olá! Gostaria de solicitar um orçamento de energia solar.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              (75) 99958-3373
            </a>
          </div>
          <div className="contact-detail">
            <span className="contact-detail-label">Instagram</span>
            <a
              href="https://www.instagram.com/solarelevenwatt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @solarelevenwatt
            </a>
          </div>
          <div className="contact-detail">
            <span className="contact-detail-label">Endereço</span>
            <address>
              Av. Transnordestina, 3180<br />
              Parque Ipê, Feira de Santana — BA<br />
              CEP 44054-008
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}
