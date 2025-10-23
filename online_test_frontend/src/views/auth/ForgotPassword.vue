<script setup lang="ts">
</script>

<template>
  <div>
    <h2 style="margin-bottom:1rem;">Password recovery</h2>
    <div class="card" style="padding:1rem; display:grid; gap:.75rem;">
      <input class="input" placeholder="Email" />
      <button class="btn btn-primary">Send reset link</button>
      <div class="text-muted"><router-link to="/">Back to Login</router-link></div>
    </div>
  </div>
</template>
