<script setup lang="ts">
import FileUploader from '@/components/common/FileUploader.vue'
</script>

<template>
  <div>
    <div class="page-header"><h2>Resume Upload</h2></div>
    <div class="card" style="padding:1rem;">
      <FileUploader @selected="(f)=>window.alert('Selected '+ f.name)" />
    </div>
  </div>
</template>
