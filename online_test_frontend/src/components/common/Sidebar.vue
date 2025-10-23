<script setup lang="ts">
defineOptions({ name: 'AppSidebar' })
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const route = useRoute()
const auth = useAuthStore()
const role = computed(() => auth.user?.role || 'candidate')

const itemsByRole: Record<string, { label: string; to: string }[]> = {
  candidate: [
    { label: 'Dashboard', to: '/candidate/dashboard' },
    { label: 'Catalog', to: '/candidate/catalog' },
    { label: 'Profile', to: '/candidate/profile' },
    { label: 'Interview', to: '/candidate/interview' },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'Question Bank', to: '/admin/question-bank' },
    { label: 'Users', to: '/admin/users' },
    { label: 'Templates', to: '/admin/test-templates' },
    { label: 'Backup/Restore', to: '/admin/backup-restore' },
  ],
  hr: [
    { label: 'Dashboard', to: '/hr/dashboard' },
    { label: 'Test Setup', to: '/hr/test-setup' },
    { label: 'Import Candidates', to: '/hr/candidate-import' },
    { label: 'Monitoring', to: '/hr/monitoring' },
    { label: 'Results', to: '/hr/results' },
    { label: 'Assignments', to: '/hr/assignments' },
  ],
  employee: [
    { label: 'Dashboard', to: '/employee/dashboard' },
    { label: 'Reviews', to: '/employee/reviews' },
    { label: 'Interviews', to: '/employee/interviews' },
    { label: 'Chat', to: '/employee/chat' },
  ],
}
</script>

<template>
  <aside style="padding: 1rem; border-right: 1px solid var(--ocean-border); background: var(--ocean-surface);">
    <div style="padding: .5rem 0 1rem; font-weight: 700; color: var(--ocean-primary);">
      {{ (role as any).value?.toUpperCase() }} Panel
    </div>
    <nav>
      <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:.25rem;">
        <li v-for="item in itemsByRole[(role as any).value]" :key="item.to">
          <router-link :to="item.to"
            :class="{'badge': route.path === item.to}"
            style="display:block; padding:.5rem .75rem; border-radius:.5rem; color: var(--ocean-text);">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
