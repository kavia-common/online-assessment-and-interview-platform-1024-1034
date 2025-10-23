<script setup lang="ts">
defineOptions({ name: 'AppNotificationBell' })
import { ref } from 'vue'
const count = ref(2)
</script>

<template>
  <div class="badge" title="Notifications">
    🔔 {{ count }}
  </div>
</template>
