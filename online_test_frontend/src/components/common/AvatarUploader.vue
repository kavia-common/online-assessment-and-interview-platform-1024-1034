<script setup lang="ts">
import { ref } from 'vue'
const preview = ref<string | null>(null)
const emit = defineEmits<{ (e:'selected', file: File): void }>()
function onChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    preview.value = URL.createObjectURL(file)
    emit('selected', file)
  }
}
</script>

<template>
  <div style="display:flex; align-items:center; gap: .75rem;">
    <img :src="preview || 'https://via.placeholder.com/64'" alt="avatar" style="width:64px;height:64px;border-radius:50%; border:1px solid var(--ocean-border);" />
    <label class="btn">
      <input type="file" style="display:none" accept="image/*" @change="onChange" />
      Change
    </label>
  </div>
</template>
