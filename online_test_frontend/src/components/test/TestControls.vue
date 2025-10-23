<script setup lang="ts">
const emit = defineEmits<{ (e:'prev'): void; (e:'next'): void; (e:'submit'): void }>()
</script>

<template>
  <div style="display:flex; justify-content:space-between; gap:.5rem;">
    <button class="btn" @click="emit('prev')">Previous</button>
    <div style="flex:1"></div>
    <button class="btn" @click="emit('next')">Next</button>
    <button class="btn btn-secondary" @click="emit('submit')">Submit</button>
  </div>
</template>
