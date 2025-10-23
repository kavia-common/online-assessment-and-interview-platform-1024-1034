<script setup lang="ts">
defineOptions({ name: 'HrDashboardView' })
import { onMounted } from 'vue'
import { useHrStore } from '@/stores/hr'
const store = useHrStore()
onMounted(() => store.loadDashboard())
</script>

<template>
  <div>
    <div class="page-header"><h2>HR Dashboard</h2></div>
    <div class="card" style="padding:1rem;">{{ JSON.stringify(store.dashboard) }}</div>
  </div>
</template>
