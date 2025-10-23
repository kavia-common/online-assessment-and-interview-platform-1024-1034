<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
const props = defineProps<{ roomId: string }>()
const chat = useChatStore()
const input = ref('')

function connect() {
  chat.connect(props.roomId)
}
function send() {
  if (input.value.trim().length === 0) return
  chat.send(input.value.trim())
  input.value = ''
}
</script>

<template>
  <div class="card" style="padding:.75rem; display:grid; grid-template-rows:auto 1fr auto; gap:.5rem; height:380px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div><strong>Room:</strong> {{ roomId }}</div>
      <button class="btn btn-primary" v-if="!chat.connected" @click="connect">Connect</button>
      <span v-else class="badge">Connected</span>
    </div>
    <div style="overflow:auto; border:1px solid var(--ocean-border); border-radius:.5rem; padding:.5rem;">
      <div v-for="m in chat.messages" :key="m.id" :style="{textAlign: m.sender==='me' ? 'right' : 'left', margin:'.25rem 0'}">
        <span class="badge">{{ m.sender }}</span>
        <div>{{ m.text }}</div>
      </div>
    </div>
    <div style="display:flex; gap:.5rem;">
      <input class="input" v-model="input" placeholder="Type a message..." @keyup.enter="send" />
      <button class="btn btn-secondary" @click="send">Send</button>
    </div>
  </div>
</template>
