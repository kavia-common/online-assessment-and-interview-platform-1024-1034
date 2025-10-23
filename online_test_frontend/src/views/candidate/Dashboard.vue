<script setup lang="ts">
defineOptions({ name: 'CandidateDashboardView' })
</script>

<template>
  <div>
    <div class="page-header">
      <h2>Candidate Dashboard</h2>
    </div>
    <div class="card" style="padding:1rem;">
      Welcome! Use the sidebar to access catalog, profile, and interviews.
      <div style="margin-top:.75rem; display:flex; gap:.5rem; flex-wrap: wrap;">
        <router-link class="btn btn-primary" :to="{ name: 'candidate.catalog' }">Browse Tests</router-link>
        <router-link class="btn" :to="{ name: 'candidate.profile' }">Edit Profile</router-link>
      </div>
    </div>
  </div>
</template>
