const API_URL = import.meta.env.VITE_PORTAL_API_URL
const TOKEN_KEY = 'solarwatt_portal_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  if (!API_URL) {
    throw new Error(
      'Área do cliente ainda não está conectada a um servidor (VITE_PORTAL_API_URL não configurada).',
    )
  }

  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(data?.error || `Erro ${res.status} ao falar com o servidor.`)
  }
  return data
}

export const portalApi = {
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password }, auth: false }),
  me: () => request('/api/me'),
  myProjects: () => request('/api/me/projects'),
  adminListClients: () => request('/api/admin/clients'),
  adminCreateClient: (payload) => request('/api/admin/clients', { method: 'POST', body: payload }),
  adminUpdateProjectStep: (projectId, currentStep) =>
    request(`/api/admin/projects/${projectId}`, { method: 'PATCH', body: { currentStep } }),
}
