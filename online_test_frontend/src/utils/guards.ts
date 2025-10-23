import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// PUBLIC_INTERFACE
export function requireAuth(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  /** Basic route guard (not used directly; router has inline guard). */
  const auth = useAuthStore()
  if (!auth.isAuthenticated) return next({ name: 'login' })
  next()
}
