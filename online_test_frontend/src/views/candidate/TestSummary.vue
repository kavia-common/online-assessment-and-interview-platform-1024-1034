<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="card" style="padding:1rem;">
    <h3>Test Submitted</h3>
    <p>Your score: <strong>{{ route.query.score || 'N/A' }}</strong></p>
    <router-link class="btn" :to="{name:'candidate.dashboard'}">Back to dashboard</router-link>
  </div>
</template>
