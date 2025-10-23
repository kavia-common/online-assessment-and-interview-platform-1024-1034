<script setup lang="ts">
defineOptions({ name: 'TheoryQuestion' })
defineProps<{ q: { id: string; text: string }; answer?: string }>()
const emit = defineEmits<{ (e:'answer', qid: string, value: string): void }>()
</script>

<template>
  <div class="card" style="padding: .75rem;">
    <div style="font-weight:600; margin-bottom:.5rem;">{{ q.text }}</div>
    <textarea class="input" rows="6" :value="answer" @input="(e:any)=>emit('answer', q.id, e.target.value)" placeholder="Type your answer..."></textarea>
  </div>
</template>
