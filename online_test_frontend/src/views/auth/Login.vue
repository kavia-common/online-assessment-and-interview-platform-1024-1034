<script setup lang="ts">
defineOptions({ name: 'AuthLoginView' })
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const email = ref('')
const password = ref('')
const err = ref('')
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const appName = import.meta.env.VITE_APP_NAME || 'Online Test'

async function submit() {
  try {
    await auth.login(email.value, password.value)
    const role = auth.user?.role || 'candidate'
    const redirect = (route.query.redirect as string) || `/${role}/dashboard`
    router.push(redirect)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Login failed'
    err.value = message
  }
}
</script>

<template>
  <div>
    <h2 style="margin-bottom:1rem;">Welcome to <span class="text-primary">{{ appName }}</span></h2>
    <div class="card" style="padding:1rem; display:grid; gap:.75rem;">
      <input class="input" v-model="email" placeholder="Email (try admin@example.com, hr@example.com, emp@example.com, user@example.com)" />
      <input class="input" type="password" v-model="password" placeholder="Password" />
      <button class="btn btn-primary" @click="submit">Sign In</button>
      <div class="text-muted" v-if="err">{{ err }}</div>
      <div class="text-muted">No account? <router-link to="/register">Register</router-link> • <router-link to="/forgot">Forgot password</router-link></div>
    </div>
  </div>
</template>
