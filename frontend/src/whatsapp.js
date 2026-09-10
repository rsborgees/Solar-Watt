const PHONE = '5575999583373'

export function whatsappLink(message) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}
