import axios, { AxiosError, type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'

/**
 * Axios HTTP client wrapper with auth token injection and error handling.
 * - Base URL comes from VITE_API_BASE_URL (falling back to '/api' for local proxy setups)
 * - Request interceptor injects Authorization: Bearer <token> when available
 * - Response interceptor logs out on 401 to reset state
 */
const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || '/api'
export const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 20000,
})

// Attach token
http.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth?.token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

// Handle errors globally
http.interceptors.response.use(
  (r) => r,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const auth = useAuthStore()
      auth.logout()
    }
    return Promise.reject(error)
  },
)

export default http
