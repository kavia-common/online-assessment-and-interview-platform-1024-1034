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
    <div class="card" style="padding:1rem;">{{ JSON.stringify(store.dashboard) }}</div>
  </div>
</template>
