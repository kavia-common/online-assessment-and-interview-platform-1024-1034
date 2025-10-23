<script setup lang="ts">
import FileUploader from '@/components/common/FileUploader.vue'

function onSelected(file: File) {
  // Use global alert without referencing window/globalThis in template context
  alert(`Selected ${file.name}`)
}
</script>

<template>
  <div>
    <div class="page-header"><h2>Resume Upload</h2></div>
    <div class="card" style="padding:1rem;">
      <FileUploader @selected="onSelected" />
    </div>
  </div>
</template>
