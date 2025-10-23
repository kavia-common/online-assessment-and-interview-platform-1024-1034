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
    <div class="card" style="padding:1rem;">
      {{ JSON.stringify(store.dashboard) }}
      <div style="margin-top:.75rem; display:flex; gap:.5rem; flex-wrap: wrap;">
        <router-link class="btn" :to="{ name: 'hr.testSetup' }">Test Setup</router-link>
        <router-link class="btn" :to="{ name: 'hr.monitoring' }">Monitoring</router-link>
        <router-link class="btn" :to="{ name: 'hr.results' }">Results</router-link>
      </div>
    </div>
  </div>
</template>
