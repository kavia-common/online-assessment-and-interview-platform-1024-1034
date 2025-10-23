<script setup lang="ts">
defineOptions({ name: 'EmployeeChatView' })
import ChatPanel from '@/components/common/ChatPanel.vue'
</script>

<template>
  <ChatPanel room-id="general" />
</template>
