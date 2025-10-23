/**
 * Centralized REST and WebSocket endpoint map.
 * Uses environment variables:
 * - VITE_API_BASE_URL for REST base (consumed by axios instance in http.ts)
 * - VITE_WS_URL for WebSocket base (consumed here)
 */
const WS_BASE = (import.meta.env.VITE_WS_URL as string) || 'ws://localhost:1234'

export const Endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  candidate: {
    dashboard: '/candidate/dashboard',
    tests: '/candidate/tests',
    instructions: (testId: string) => `/candidate/tests/${testId}/instructions`,
    startAttempt: (testId: string) => `/candidate/tests/${testId}/attempts`,
    submit: (attemptId: string) => `/candidate/attempts/${attemptId}/submit`,
    answer: (attemptId: string) => `/candidate/attempts/${attemptId}/answer`,
    summary: (attemptId: string) => `/candidate/attempts/${attemptId}/summary`,
    profile: '/candidate/profile',
    resume: '/candidate/resume',
    questionnaire: '/candidate/questionnaire',
    interview: '/candidate/interview',
  },
  admin: {
    dashboard: '/admin/dashboard',
    questionBank: '/admin/question-bank',
    users: '/admin/users',
    reports: '/admin/reports',
    templates: '/admin/test-templates',
    backupRestore: '/admin/backup-restore',
  },
  hr: {
    dashboard: '/hr/dashboard',
    testSetup: '/hr/test-setup',
    candidateImport: '/hr/candidate-import',
    monitoring: '/hr/monitoring',
    adjustTime: '/hr/adjust-time',
    reappear: '/hr/reappear',
    recordingManager: '/hr/recording-manager',
    results: '/hr/results',
    assignments: '/hr/assignments',
  },
  employee: {
    dashboard: '/employee/dashboard',
    reviews: '/employee/reviews',
    interviews: '/employee/interviews',
    chat: '/employee/chat',
  },
  ws: {
    base: WS_BASE,
    room: (roomId: string) => `${WS_BASE}/room/${roomId}`,
  },
}
