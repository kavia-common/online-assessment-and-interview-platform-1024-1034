import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'login', component: () => import('@/views/auth/Login.vue'), meta: { public: true } },
      { path: 'register', name: 'register', component: () => import('@/views/auth/Register.vue'), meta: { public: true } },
      { path: 'forgot', name: 'forgot', component: () => import('@/views/auth/ForgotPassword.vue'), meta: { public: true } },
    ],
  },
  {
    path: '/candidate',
    component: DashboardLayout,
    meta: { role: 'candidate' },
    children: [
      { path: 'dashboard', name: 'candidate.dashboard', component: () => import('@/views/candidate/Dashboard.vue') },
      { path: 'catalog', name: 'candidate.catalog', component: () => import('@/views/candidate/TestCatalog.vue') },
      { path: 'instructions/:testId', name: 'candidate.instructions', component: () => import('@/views/candidate/TestInstructions.vue') },
      { path: 'run/:attemptId', name: 'candidate.run', component: () => import('@/views/candidate/TestRunner.vue'), meta: { fullscreen: true } },
      { path: 'summary/:attemptId', name: 'candidate.summary', component: () => import('@/views/candidate/TestSummary.vue') },
      { path: 'profile', name: 'candidate.profile', component: () => import('@/views/candidate/Profile.vue') },
      { path: 'resume', name: 'candidate.resume', component: () => import('@/views/candidate/ResumeUpload.vue') },
      { path: 'questionnaire', name: 'candidate.questionnaire', component: () => import('@/views/candidate/Questionnaire.vue') },
      { path: 'interview', name: 'candidate.interview', component: () => import('@/views/candidate/InterviewDetails.vue') },
    ],
  },
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { role: 'admin' },
    children: [
      { path: 'dashboard', name: 'admin.dashboard', component: () => import('@/views/admin/Dashboard.vue') },
      { path: 'question-bank', name: 'admin.questionBank', component: () => import('@/views/admin/QuestionBank.vue') },
      { path: 'users', name: 'admin.users', component: () => import('@/views/admin/Users.vue') },
      { path: 'reports', name: 'admin.reports', component: () => import('@/views/admin/Reports.vue') },
      { path: 'test-templates', name: 'admin.testTemplates', component: () => import('@/views/admin/TestTemplates.vue') },
      { path: 'backup-restore', name: 'admin.backupRestore', component: () => import('@/views/admin/BackupRestore.vue') },
    ],
  },
  {
    path: '/hr',
    component: DashboardLayout,
    meta: { role: 'hr' },
    children: [
      { path: 'dashboard', name: 'hr.dashboard', component: () => import('@/views/hr/Dashboard.vue') },
      { path: 'test-setup', name: 'hr.testSetup', component: () => import('@/views/hr/TestSetup.vue') },
      { path: 'candidate-import', name: 'hr.candidateImport', component: () => import('@/views/hr/CandidateImport.vue') },
      { path: 'monitoring', name: 'hr.monitoring', component: () => import('@/views/hr/Monitoring.vue') },
      { path: 'adjust-time', name: 'hr.adjustTime', component: () => import('@/views/hr/AdjustTime.vue') },
      { path: 'reappear', name: 'hr.reappear', component: () => import('@/views/hr/Reappear.vue') },
      { path: 'recording-manager', name: 'hr.recordingManager', component: () => import('@/views/hr/RecordingManager.vue') },
      { path: 'results', name: 'hr.results', component: () => import('@/views/hr/Results.vue') },
      { path: 'assignments', name: 'hr.assignments', component: () => import('@/views/hr/Assignments.vue') },
    ],
  },
  {
    path: '/employee',
    component: DashboardLayout,
    meta: { role: 'employee' },
    children: [
      { path: 'dashboard', name: 'employee.dashboard', component: () => import('@/views/employee/Dashboard.vue') },
      { path: 'reviews', name: 'employee.reviews', component: () => import('@/views/employee/Reviews.vue') },
      { path: 'interviews', name: 'employee.interviews', component: () => import('@/views/employee/Interviews.vue') },
      { path: 'chat', name: 'employee.chat', component: () => import('@/views/employee/Chat.vue') },
    ],
  },
  {
    path: '/realtime',
    component: DashboardLayout,
    meta: { role: ['admin','hr','employee'] },
    children: [
      { path: 'monitor/:roomId', name: 'realtime.monitor', component: () => import('@/views/realtime/MonitorRoom.vue') },
      { path: 'chat/:roomId', name: 'realtime.chat', component: () => import('@/views/realtime/ChatRoom.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  const isPublic = to.meta.public === true
  if (isPublic) return next()

  if (!auth.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  const requiredRole = to.meta.role
  if (!requiredRole) return next()

  const userRole = auth.user?.role
  const match = Array.isArray(requiredRole)
    ? requiredRole.includes(userRole as string)
    : requiredRole === userRole

  if (!match) {
    // redirect to user's dashboard
    const role = userRole || 'candidate'
    return next({ name: `${role}.dashboard` })
  }
  next()
})

export default router
