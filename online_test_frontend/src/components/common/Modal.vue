<script setup lang="ts">
defineOptions({ name: 'AppModal' })
defineProps<{ open: boolean; title?: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div v-if="open" style="position:fixed; inset:0; background: rgba(0,0,0,.4); display:flex; align-items:center; justify-content:center; z-index:50;">
    <div class="card" style="width: 96%; max-width: 560px; padding: 1rem;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:.75rem;">
        <div style="font-weight:700;">{{ title }}</div>
        <button class="btn" @click="emit('close')">Close</button>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
