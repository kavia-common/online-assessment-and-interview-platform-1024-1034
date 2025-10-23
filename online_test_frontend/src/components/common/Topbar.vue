<script setup lang="ts">
defineOptions({ name: 'AppTopbar' })
import NotificationBell from './NotificationBell.vue'
const appName = import.meta.env.VITE_APP_NAME || 'Online Test'
</script>

<template>
  <header class="card" style="padding:.6rem .9rem; display:flex; align-items:center; justify-content:space-between;">
    <div style="font-weight:700; color: var(--ocean-primary);">{{ appName }}</div>
    <div style="display:flex; align-items:center; gap:.5rem;">
      <NotificationBell />
      <router-link class="btn" to="/">Logout</router-link>
    </div>
  </header>
</template>
