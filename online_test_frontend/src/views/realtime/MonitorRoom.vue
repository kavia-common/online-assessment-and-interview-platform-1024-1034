<script setup lang="ts">
defineOptions({ name: 'RealtimeMonitorRoomView' })
import ChatPanel from '@/components/common/ChatPanel.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div style="display:grid; gap:1rem;">
    <div class="card" style="padding:1rem;">
      <h3>Monitoring Room: {{ route.params.roomId }}</h3>
      <p class="text-muted">Stream metrics would appear here.</p>
    </div>
    <ChatPanel :room-id="String(route.params.roomId)" />
  </div>
</template>
