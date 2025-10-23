import { defineStore } from 'pinia'
import http from '@/api/http'
import { Endpoints } from '@/api/endpoints'
import type { TestCatalogItem, AttemptSummary } from '@/types/models'

interface State {
  catalog: TestCatalogItem[]
  attemptId: string | null
  remainingSeconds: number
}

export const useTestsStore = defineStore('tests', {
  state: (): State => ({
    catalog: [],
    attemptId: null,
    remainingSeconds: 0,
  }),
  actions: {
    // PUBLIC_INTERFACE
    async loadCatalog() {
      /** Load available tests for candidate. */
      const r = await http.get(Endpoints.candidate.tests)
      this.catalog = r.data
    },
    // PUBLIC_INTERFACE
    async startAttempt(testId: string) {
      /** Start a new attempt for a test. */
      const r = await http.post(Endpoints.candidate.startAttempt(testId), {})
      this.attemptId = r.data.attemptId
      return this.attemptId
    },
    // PUBLIC_INTERFACE
    async submitAttempt() {
      /** Submit attempt and return summary. */
      if (!this.attemptId) return null
      const r = await http.post(Endpoints.candidate.submit(this.attemptId), {})
      return r.data as AttemptSummary
    },
  },
})
