<script setup lang="ts">
defineOptions({ name: 'AdminQuestionBankView' })
import { onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
const store = useAdminStore()
onMounted(() => store.loadQuestionBank())
</script>

<template>
  <div>
    <div class="page-header"><h2>Question Bank</h2></div>
    <div class="card" style="padding:1rem;">{{ JSON.stringify(store.questionBank) }}</div>
  </div>
</template>
