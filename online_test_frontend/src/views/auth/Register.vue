<script setup lang="ts">
defineOptions({ name: 'AuthRegisterView' })
</script>

<template>
  <div>
    <h2 style="margin-bottom:1rem;">Create account</h2>
    <div class="card" style="padding:1rem; display:grid; gap:.75rem;">
      <input class="input" placeholder="Name" />
      <input class="input" placeholder="Email" />
      <input class="input" type="password" placeholder="Password" />
      <button class="btn btn-primary">Register</button>
      <div class="text-muted">Already have an account? <router-link to="/">Login</router-link></div>
    </div>
  </div>
</template>
