import type { AxiosRequestConfig } from 'axios'

export function mockAdminHrEmployee(config: AxiosRequestConfig) {
  const { url, method } = config
  if (method === 'get' && /\/(admin|hr|employee)\/dashboard$/.test(url || '')) {
    return [200, { stats: { users: 120, tests: 34, attempts: 245 } }]
  }
  if (method === 'get' && url?.endsWith('/admin/question-bank')) {
    return [200, { mcq: 120, theory: 45 }]
  }
  if (method === 'get' && url?.endsWith('/hr/results')) {
    return [200, [{ candidate: 'Alice', score: 82 }, { candidate: 'Bob', score: 68 }]]
  }
  return null
}
