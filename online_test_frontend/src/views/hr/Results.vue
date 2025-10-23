<script setup lang="ts">
defineOptions({ name: 'HrResultsView' })
import { onMounted } from 'vue'
import { useHrStore } from '@/stores/hr'
import DataTable from '@/components/common/DataTable.vue'
const store = useHrStore()
onMounted(() => store.loadResults())
</script>

<template>
  <div>
    <div class="page-header"><h2>Results</h2></div>
    <DataTable :items="store.results" :columns="[{key:'candidate',label:'Candidate'},{key:'score',label:'Score'}]" />
  </div>
</template>
