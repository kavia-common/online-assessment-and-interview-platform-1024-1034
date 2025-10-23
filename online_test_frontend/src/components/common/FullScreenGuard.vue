<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { requestFullscreen, exitFullscreen, isFullscreen } from '@/utils/fullscreen'

const enabled = ref(false)

function toggle() {
  if (!isFullscreen()) {
    requestFullscreen(document.documentElement)
  } else {
    exitFullscreen()
  }
}

function onChange() {
  enabled.value = isFullscreen()
}
onMounted(() => {
  document.addEventListener('fullscreenchange', onChange)
  onChange()
})
onUnmounted(() => document.removeEventListener('fullscreenchange', onChange))
</script>

<template>
  <div class="card" style="padding: .75rem; display:flex; align-items:center; justify-content:space-between;">
    <div>
      <strong>Full Screen:</strong>
      <span :class="['badge']">{{ enabled ? 'Enabled' : 'Disabled' }}</span>
    </div>
    <button class="btn btn-primary" @click="toggle">{{ enabled ? 'Exit' : 'Enter' }} Fullscreen</button>
  </div>
</template>
