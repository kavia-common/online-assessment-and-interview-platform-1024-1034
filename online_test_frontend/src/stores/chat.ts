import { defineStore } from 'pinia'
import { WSClient } from '@/api/ws'
import { Endpoints } from '@/api/endpoints'

interface Message { id: string; sender: string; text: string; ts: number }

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    client: null as WSClient | null,
    connected: false,
  }),
  actions: {
    // PUBLIC_INTERFACE
    connect(roomId: string) {
      /** Connect to chat/monitor room. */
      const useMocks = (import.meta.env.VITE_USE_MOCKS || 'false') === 'true'
      this.client = new WSClient(Endpoints.ws.room(roomId), useMocks)
      this.client.on('open', () => (this.connected = true))
      this.client.on('close', () => (this.connected = false))
      this.client.on('message', (data) => {
        const msg: Message = { id: crypto.randomUUID(), sender: 'remote', text: typeof data === 'string' ? data : JSON.stringify(data), ts: Date.now() }
        this.messages.push(msg)
      })
      this.client.connect()
    },
    // PUBLIC_INTERFACE
    send(text: string) {
      /** Send chat message. */
      this.client?.send({ text })
      const msg: Message = { id: crypto.randomUUID(), sender: 'me', text, ts: Date.now() }
      this.messages.push(msg)
    },
    // PUBLIC_INTERFACE
    disconnect() {
      /** Disconnect from room. */
      this.client?.close()
      this.connected = false
    },
  },
})
