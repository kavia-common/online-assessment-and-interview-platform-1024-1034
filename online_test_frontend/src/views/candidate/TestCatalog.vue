<script setup lang="ts">
defineOptions({ name: 'CandidateTestCatalogView' })
import { onMounted } from 'vue'
import { useTestsStore } from '@/stores/tests'
import DataTable from '@/components/common/DataTable.vue'
import { useRouter } from 'vue-router'

const store = useTestsStore()
const router = useRouter()
onMounted(() => store.loadCatalog())

import type { TestCatalogItem } from '@/types/models'
function go(t: TestCatalogItem) {
  router.push({ name: 'candidate.instructions', params: { testId: t.id } })
}
</script>

<template>
  <div>
    <div class="page-header"><h2>Available Tests</h2></div>
    <DataTable :items="store.catalog" :columns="[{key:'id',label:'ID'},{key:'title',label:'Title'},{key:'duration',label:'Duration (min)'}]" />
    <div style="margin-top:.75rem;">
      <button class="btn btn-primary" v-for="t in store.catalog" :key="t.id" @click="go(t)">Start {{ t.title }}</button>
    </div>
  </div>
</template>
