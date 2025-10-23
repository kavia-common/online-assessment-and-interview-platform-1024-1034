import { defineStore } from 'pinia'
import http from '@/api/http'
import { Endpoints } from '@/api/endpoints'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({ dashboard: null as Record<string, unknown> | null }),
  actions: {
    // PUBLIC_INTERFACE
    async loadDashboard() {
      /** Load employee dashboard. */
      const r = await http.get(Endpoints.employee.dashboard)
      this.dashboard = r.data
    },
  },
})
