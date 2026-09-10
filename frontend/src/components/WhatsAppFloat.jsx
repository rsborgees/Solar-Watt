import { whatsappLink } from '../whatsapp'

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink('Olá! Gostaria de solicitar um orçamento de energia solar.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <span className="whatsapp-ping" aria-hidden="true" />
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2C8.3 2 2 8.3 2 16c0 2.6.7 5.1 2 7.3L2 30l6.9-1.8c2.1 1.2 4.5 1.8 7.1 1.8 7.7 0 14-6.3 14-14S23.7 2 16 2zm0 25.3c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.1 1.1 1.1-4-.3-.5C4.6 20 4 18 4 16 4 9.4 9.4 4 16 4s12 5.4 12 12-5.4 11.3-12 11.3zm6.4-8.4c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.6 5.8 5.1.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  )
}
