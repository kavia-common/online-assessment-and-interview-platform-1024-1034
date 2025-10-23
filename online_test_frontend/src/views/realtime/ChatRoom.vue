<script setup lang="ts">
defineOptions({ name: 'RealtimeChatRoomView' })
import ChatPanel from '@/components/common/ChatPanel.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <ChatPanel :room-id="String(route.params.roomId)" />
</template>
