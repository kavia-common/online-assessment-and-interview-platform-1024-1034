<script setup lang="ts">
type AnswerMap = Record<string, unknown>
defineProps<{ questions: { id: string }[], currentId: string, answers: AnswerMap }>()
const emit = defineEmits<{ (e:'go', id: string): void }>()
</script>

<template>
  <div class="card" style="padding:.5rem; display:grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap:.35rem;">
    <button v-for="q in questions" :key="q.id" class="btn"
      :style="{ background: q.id===currentId ? 'var(--ocean-primary)' : (answers[q.id] ? 'rgba(37,99,235,.1)' : undefined),
                color: q.id===currentId ? 'white' : undefined }"
      @click="emit('go', q.id)">{{ q.id }}</button>
  </div>
</template>
