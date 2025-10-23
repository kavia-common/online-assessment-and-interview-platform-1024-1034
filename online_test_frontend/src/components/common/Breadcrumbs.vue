<script setup lang="ts">
import { useRoute } from 'vue-router'
defineOptions({ name: 'AppBreadcrumbs' })
const route = useRoute()
</script>

<template>
  <div class="text-muted" style="font-size:.85rem;">
    You are here: {{ route.fullPath }}
  </div>
</template>
