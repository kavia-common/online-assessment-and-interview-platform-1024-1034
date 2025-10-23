<script setup lang="ts">
defineOptions({ name: 'CandidateTestRunnerView' })
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Timer from '@/components/common/Timer.vue'
import FullScreenGuard from '@/components/common/FullScreenGuard.vue'
import ProctoringBanner from '@/components/common/ProctoringBanner.vue'
import MCQQuestion from '@/components/test/MCQQuestion.vue'
import TheoryQuestion from '@/components/test/TheoryQuestion.vue'
import CodeEditorQuestion from '@/components/test/CodeEditorQuestion.vue'
import QuestionPalette from '@/components/test/QuestionPalette.vue'
import TestControls from '@/components/test/TestControls.vue'
import { useTestsStore } from '@/stores/tests'
import { preventCopyPaste, trackTabSwitches } from '@/utils/antiCheat'
import { useRouter } from 'vue-router'

const store = useTestsStore()
const router = useRouter()

const warnings = ref(0)
type McqQ = { id: string; type: 'mcq'; text: string; options: string[] }
type TheoryQ = { id: string; type: 'theory'; text: string }
type CodeQ = { id: string; type: 'code'; text: string }
type AnyQ = McqQ | TheoryQ | CodeQ
const questions = ref<AnyQ[]>([
  { id: '1', type: 'mcq', text: '2 + 2 = ?', options: ['3','4','5'] },
  { id: '2', type: 'theory', text: 'Explain closures.' },
  { id: '3', type: 'code', text: 'Write a function to reverse a string.' },
])
const idx = ref(0)
const current = computed(() => questions.value[idx.value])
type AnswerValue = string
const answers = ref<Record<string, AnswerValue>>({})

function onAnswer(id: string, value: AnswerValue) {
  answers.value[id] = value
}

function prev() { if (idx.value > 0) idx.value-- }
function next() { if (idx.value < questions.value.length - 1) idx.value++ }

async function submit() {
  const summary = await store.submitAttempt()
  router.push({ name: 'candidate.summary', params: { attemptId: store.attemptId }, query: { score: String(summary?.score ?? 0) } })
}

onMounted(() => {
  preventCopyPaste()
  trackTabSwitches(() => warnings.value++)
  store.remainingSeconds = 60 * 5
})
onBeforeUnmount(() => {
  document.oncopy = null
  document.oncut = null
  document.onpaste = null
})
</script>

<template>
  <div class="grid" style="display:grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
    <div style="display:grid; gap:.75rem;">
      <FullScreenGuard />
      <ProctoringBanner :warnings="warnings" />
      <Timer :seconds="store.remainingSeconds" @elapsed="submit" />
      <MCQQuestion v-if="current.type==='mcq'" :q="current" :answer="answers[current.id]" @answer="onAnswer" />
      <TheoryQuestion v-else-if="current.type==='theory'" :q="current" :answer="answers[current.id]" @answer="onAnswer" />
      <CodeEditorQuestion v-else :q="current" :answer="answers[current.id]" @answer="onAnswer" />
      <TestControls @prev="prev" @next="next" @submit="submit" />
    </div>
    <div style="display:grid; gap:.75rem;">
      <QuestionPalette :questions="questions" :current-id="current.id" :answers="answers" @go="(id:string)=>{ idx = questions.findIndex(q=>q.id===id) }" />
      <div class="card" style="padding:.75rem;">
        <strong>Legend:</strong>
        <div class="text-muted">Blue = current, Light blue = answered</div>
      </div>
    </div>
  </div>
</template>
