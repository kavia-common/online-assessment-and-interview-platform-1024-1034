import { defineStore } from 'pinia'
import http from '@/api/http'
import { Endpoints } from '@/api/endpoints'

export const useAdminStore = defineStore('admin', {
  state: () => ({ dashboard: null as Record<string, unknown> | null, questionBank: null as Record<string, unknown> | null }),
  actions: {
    // PUBLIC_INTERFACE
    async loadDashboard() {
      /** Load admin dashboard stats. */
      const r = await http.get(Endpoints.admin.dashboard)
      this.dashboard = r.data
    },
    // PUBLIC_INTERFACE
    async loadQuestionBank() {
      /** Load question bank summary. */
      const r = await http.get(Endpoints.admin.questionBank)
      this.questionBank = r.data
    },
  },
})
