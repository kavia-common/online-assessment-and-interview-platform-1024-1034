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
    <div class="card" style="padding:1rem;">
      {{ JSON.stringify(store.dashboard) }}
      <div style="margin-top:.75rem; display:flex; gap:.5rem; flex-wrap: wrap;">
        <router-link class="btn" :to="{ name: 'employee.reviews' }">Reviews</router-link>
        <router-link class="btn" :to="{ name: 'employee.interviews' }">Interviews</router-link>
        <router-link class="btn" :to="{ name: 'employee.chat' }">Chat</router-link>
      </div>
    </div>
  </div>
</template>
