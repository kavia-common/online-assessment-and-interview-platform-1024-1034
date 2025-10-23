import type { AxiosRequestConfig } from 'axios'

export function mockCandidate(config: AxiosRequestConfig) {
  const { url, method } = config
  if (method === 'get' && url?.endsWith('/candidate/tests')) {
    return [200, [{ id: 't1', title: 'Frontend Basics', duration: 45 }, { id: 't2', title: 'Algorithms', duration: 60 }]]
  }
  if (method === 'get' && url?.includes('/instructions/')) {
    return [200, { rules: ['No copy/paste', 'No tab switching'], duration: 60 }]
  }
  if (method === 'post' && url?.includes('/attempts') && !url?.includes('/submit')) {
    return [201, { attemptId: 'a1', startedAt: new Date().toISOString() }]
  }
  if (method === 'post' && url?.includes('/answer')) {
    return [200, { ok: true }]
  }
  if (method === 'post' && url?.includes('/submit')) {
    return [200, { score: 78, status: 'submitted' }]
  }
  if (method === 'get' && url?.includes('/summary/')) {
    return [200, { score: 78, correct: 15, total: 20 }]
  }
  return null
}
