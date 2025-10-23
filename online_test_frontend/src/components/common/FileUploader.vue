<script setup lang="ts">
const emit = defineEmits<{ (e: 'selected', file: File): void }>()
function onChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) emit('selected', file)
}
</script>

<template>
  <label class="btn">
    <input type="file" style="display:none" @change="onChange" />
    Upload
  </label>
</template>
