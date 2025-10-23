import http from '@/api/http'
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import { mockAuth } from './auth'
import { mockCandidate } from './candidate'
import { mockAdminHrEmployee } from './management'

type MockTuple = [status: number, data: unknown]
type MockHandler = (config: InternalAxiosRequestConfig) => MockTuple | null

const wrapHandlers = (handlers: Array<(c: InternalAxiosRequestConfig) => MockTuple | null>): MockHandler[] =>
  handlers.map((h) => (c: InternalAxiosRequestConfig) => {
    const res = h(c)
    if (!res) return null
    // ensure tuple
    const status = res[0] as number
    const data = res[1] as unknown
    return [status, data]
  })

const handlers: MockHandler[] = wrapHandlers([
  mockAuth as (c: InternalAxiosRequestConfig) => MockTuple | null,
  mockCandidate as (c: InternalAxiosRequestConfig) => MockTuple | null,
  mockAdminHrEmployee as (c: InternalAxiosRequestConfig) => MockTuple | null,
])

let enabled = false

// PUBLIC_INTERFACE
export function enableMocks() {
  /** Enable axios response mocking based on request matching. */
  if (enabled) return
  enabled = true

  // core adapter override
  const adapter: AxiosAdapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
    for (const h of handlers) {
      const result = h(config)
      if (result) {
        const [status, data] = result
        return {
          data,
          status,
          statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
          headers: {} as RawAxiosRequestHeaders,
          config,
        }
      }
    }
    // default 404 in mock mode
    return {
      data: { message: 'Mock not found' },
      status: 404,
      statusText: 'Not Found',
      headers: {} as RawAxiosRequestHeaders,
      config,
    }
  }
  // assign adapter
  ;(http.defaults as unknown as { adapter: AxiosAdapter }).adapter = adapter
}
