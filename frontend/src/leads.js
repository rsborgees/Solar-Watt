// Persistência de leads do simulador.
//
// Todo lead é salvo no localStorage do visitante como rede de segurança —
// nunca é perdido silenciosamente mesmo se a rede falhar. Mas isso sozinho
// NÃO entrega o lead pra equipe: cada navegador só guarda o que aconteceu
// nele mesmo. Pra o lead chegar de fato na empresa, configure UM destino
// (checados nesta ordem de prioridade):
//
//   VITE_LEAD_ENDPOINT=https://sua-api.com/leads
//     Qualquer endpoint próprio (Google Apps Script, Airtable, backend
//     custom) que aceite POST JSON. Prioridade sobre os outros dois.
//
//   VITE_LEAD_WEB3FORMS_KEY=sua-chave
//     Usa https://web3forms.com — pegue a chave grátis no site deles (só
//     informar um e-mail, a chave chega na hora, sem link de ativação
//     frágil). Recomendado por ser mais estável que o formsubmit.co.
//
//   VITE_LEAD_EMAIL=contato@empresa.com
//     Usa https://formsubmit.co (grátis, sem cadastro prévio, mas exige
//     clicar num link de ativação por e-mail na primeira vez — esse link
//     às vezes retorna erro 500 do lado deles).
//
// Sem nenhuma das três, o simulador continua funcionando normalmente (o
// WhatsApp não depende disso) — só não há como a equipe ver o lead.
const STORAGE_KEY = 'solarwatt_leads'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

function saveLocally(lead) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    existing.push(lead)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch {
    // localStorage indisponível (aba anônima, quota cheia) — segue o jogo.
  }
}

function resolveRequest(payload) {
  const custom = import.meta.env.VITE_LEAD_ENDPOINT
  if (custom) return { url: custom, body: payload }

  const web3formsKey = import.meta.env.VITE_LEAD_WEB3FORMS_KEY
  if (web3formsKey) {
    return { url: WEB3FORMS_ENDPOINT, body: { access_key: web3formsKey, ...payload } }
  }

  const email = import.meta.env.VITE_LEAD_EMAIL
  if (email) {
    return { url: `https://formsubmit.co/ajax/${encodeURIComponent(email)}`, body: payload }
  }

  return null
}

export async function submitLead(lead) {
  const payload = {
    'Enviado em': new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
    Origem: 'Simulador do site',
    ...lead,
  }
  saveLocally(payload)

  const request = resolveRequest(payload)
  if (!request) return

  try {
    await fetch(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request.body),
    })
  } catch {
    // Falha de rede — o lead já está salvo localmente e o fluxo de
    // WhatsApp, que é a conversão principal, não depende disso.
  }
}

export function listLocalLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}
