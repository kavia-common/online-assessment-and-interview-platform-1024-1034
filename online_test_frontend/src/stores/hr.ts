import { defineStore } from 'pinia'
import http from '@/api/http'
import { Endpoints } from '@/api/endpoints'

export const useHrStore = defineStore('hr', {
  state: () => ({ dashboard: null as Record<string, unknown> | null, results: [] as Array<Record<string, unknown>> }),
  actions: {
    // PUBLIC_INTERFACE
    async loadDashboard() {
      /** Load HR dashboard stats. */
      const r = await http.get(Endpoints.hr.dashboard)
      this.dashboard = r.data
    },
    // PUBLIC_INTERFACE
    async loadResults() {
      /** Load results list. */
      const r = await http.get(Endpoints.hr.results)
      this.results = r.data
    },
  },
})
