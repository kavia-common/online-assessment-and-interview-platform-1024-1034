<script setup lang="ts">
defineOptions({ name: 'EmployeeDashboardView' })
import { onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
const store = useEmployeeStore()
onMounted(() => store.loadDashboard())
</script>

<template>
  <div>
    <div class="page-header"><h2>Employee Dashboard</h2></div>
    <div class="card" style="padding:1rem;">{{ JSON.stringify(store.dashboard) }}</div>
  </div>
</template>
