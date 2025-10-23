<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="ocean-app" class="min-h-screen bg-app">
    <RouterView />
  </div>
</template>

<style scoped>
/* Minimal app shell using Ocean Professional theme variables */
#ocean-app {
  background: var(--ocean-bg);
  color: var(--ocean-text);
}
</style>
