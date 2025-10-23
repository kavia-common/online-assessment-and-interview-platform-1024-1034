<script setup lang="ts">
defineOptions({ name: 'CandidateProfileView' })
import AvatarUploader from '@/components/common/AvatarUploader.vue'
</script>

<template>
  <div>
    <div class="page-header"><h2>Profile</h2></div>
    <div class="card" style="padding:1rem; display:grid; gap:.75rem;">
      <AvatarUploader />
      <input class="input" placeholder="Full name" />
      <input class="input" placeholder="Email" />
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</template>
