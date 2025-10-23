<script setup lang="ts">
defineOptions({ name: 'AdminDashboardView' })
import { onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
const store = useAdminStore()
onMounted(() => store.loadDashboard())
</script>

<template>
  <div>
    <div class="page-header"><h2>Admin Dashboard</h2></div>
    <div class="card" style="padding:1rem;">
      {{ JSON.stringify(store.dashboard) }}
      <div style="margin-top:.75rem; display:flex; gap:.5rem; flex-wrap: wrap;">
        <router-link class="btn" :to="{ name: 'admin.users' }">Manage Users</router-link>
        <router-link class="btn" :to="{ name: 'admin.questionBank' }">Question Bank</router-link>
        <router-link class="btn" :to="{ name: 'admin.reports' }">Reports</router-link>
      </div>
    </div>
  </div>
</template>
