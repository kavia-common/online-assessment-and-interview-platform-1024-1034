import { defineStore } from 'pinia'
import http from '@/api/http'
import { Endpoints } from '@/api/endpoints'
import type { User } from '@/types/models'

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    // PUBLIC_INTERFACE
    async login(email: string, password: string) {
      /** Authenticate and load current user profile. */
      const resp = await http.post(Endpoints.auth.login, { email, password })
      this.token = resp.data.token
      this.user = resp.data.user
      return true
    },
    // PUBLIC_INTERFACE
    async fetchMe() {
      /** Fetch current user profile. */
      const resp = await http.get(Endpoints.auth.me)
      this.user = resp.data
    },
    // PUBLIC_INTERFACE
    logout() {
      /** Clear auth state. */
      this.token = null
      this.user = null
    },
  },
})
