<script setup lang="ts">
defineOptions({ name: 'CodeEditorQuestion' })
defineProps<{ q: { id: string; text: string }; answer?: string }>()
const emit = defineEmits<{ (e:'answer', qid: string, value: string): void }>()
</script>

<template>
  <div class="card" style="padding:.75rem;">
    <div style="font-weight:600; margin-bottom:.5rem;">{{ q.text }}</div>
    <textarea class="input" rows="10" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;"
      :value="answer" @input="(e:any)=>emit('answer', q.id, e.target.value)" placeholder="// Write your code here"></textarea>
  </div>
</template>
