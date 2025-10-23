<script setup lang="ts">
defineOptions({ name: 'McqQuestion' })
defineProps<{ q: { id: string; text: string; options: string[] }; answer?: string }>()
const emit = defineEmits<{ (e:'answer', qid: string, value: string): void }>()
</script>

<template>
  <div class="card" style="padding: .75rem;">
    <div style="font-weight:600; margin-bottom:.5rem;">{{ q.text }}</div>
    <div style="display:grid; gap:.35rem;">
      <label v-for="opt in q.options" :key="opt" style="display:flex; gap:.5rem; align-items:center;">
        <input type="radio" :name="q.id" :value="opt" :checked="answer===opt" @change="emit('answer', q.id, opt)" />
        <span>{{ opt }}</span>
      </label>
    </div>
  </div>
</template>
