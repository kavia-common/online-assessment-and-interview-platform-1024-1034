<script setup lang="ts">
defineOptions({ name: 'ProctoringStatusBanner' })
defineProps<{ warnings: number }>()
</script>

<template>
  <div class="card" style="padding:.5rem .75rem; border-left:4px solid var(--ocean-secondary);">
    <strong>Proctoring</strong> — Warnings: <span class="badge">{{ warnings }}</span>
  </div>
</template>
