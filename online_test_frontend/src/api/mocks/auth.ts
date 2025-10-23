import type { AxiosRequestConfig } from 'axios'

export function mockAuth(config: AxiosRequestConfig) {
  const { url, method, data } = config
  if (method === 'post' && url?.endsWith('/auth/login')) {
    const body = typeof data === 'string' ? JSON.parse(data) : data
    const role = body?.email?.includes('admin')
      ? 'admin'
      : body?.email?.includes('hr')
      ? 'hr'
      : body?.email?.includes('emp')
      ? 'employee'
      : 'candidate'
    return [200, { token: 'mock-token', user: { id: 'u1', name: 'Mock User', role } }]
  }
  if (method === 'get' && url?.endsWith('/auth/me')) {
    return [200, { id: 'u1', name: 'Mock User', role: 'candidate', email: 'mock@example.com' }]
  }
  if (method === 'post' && url?.endsWith('/auth/register')) {
    return [201, { id: 'u2', message: 'Registered' }]
  }
  return null
}
