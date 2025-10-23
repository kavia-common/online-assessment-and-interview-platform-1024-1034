import { defineStore } from 'pinia'
import type { User } from '@/types/models'

export const useUserStore = defineStore('user', {
  state: (): { profile: User | null } => ({ profile: null }),
  actions: {
    // PUBLIC_INTERFACE
    setProfile(u: User) {
      /** Set current user profile in store. */
      this.profile = u
    },
  },
})
