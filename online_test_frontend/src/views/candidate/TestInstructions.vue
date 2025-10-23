<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/api/http'
import { Endpoints } from '@/api/endpoints'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const info = ref<{ rules: string[]; duration: number } | null>(null)

onMounted(async () => {
  const r = await http.get(Endpoints.candidate.instructions(route.params.testId as string))
  info.value = r.data
})

async function start() {
  router.push({ name: 'candidate.run', params: { attemptId: 'a1' } })
}
</script>

<template>
  <div>
    <div class="page-header"><h2>Instructions</h2></div>
    <div class="card" style="padding:1rem;" v-if="info">
      <p><strong>Duration:</strong> {{ info.duration }} minutes</p>
      <ul style="padding-left:1.25rem;">
        <li v-for="r in info.rules" :key="r">{{ r }}</li>
      </ul>
      <div style="margin-top:1rem;">
        <button class="btn btn-primary" @click="start">I agree, Start Test</button>
      </div>
    </div>
  </div>
</template>
