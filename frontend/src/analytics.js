// Camada de eventos agnóstica de provedor: empurra para window.dataLayer (padrão GTM/GA4).
// Sem tag de analytics configurada ainda — os eventos ficam prontos para quando houver.
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })

  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, params)
  }
}
