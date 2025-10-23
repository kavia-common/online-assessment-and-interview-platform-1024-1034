<script setup lang="ts">
defineOptions({ name: 'CountDownTimer' })
import { onMounted, onUnmounted, ref, watch } from 'vue'
const props = defineProps<{ seconds: number }>()
const emit = defineEmits<{ (e:'tick', remaining: number): void; (e:'elapsed'): void }>()
const remaining = ref(props.seconds)
let handle: number | null = null

watch(() => props.seconds, (v) => remaining.value = v)

onMounted(() => {
  handle = window.setInterval(() => {
    remaining.value -= 1
    emit('tick', remaining.value)
    if (remaining.value <= 0) {
      if (handle) window.clearInterval(handle)
      emit('elapsed')
    }
  }, 1000)
})
onUnmounted(() => { if (handle) window.clearInterval(handle) })

function format(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}
</script>

<template>
  <div class="badge" :style="{background: remaining<60 ? 'rgba(239,68,68,.1)' : undefined, color: remaining<60 ? '#EF4444' : undefined}">
    ⏱️ {{ format(remaining) }}
  </div>
</template>
