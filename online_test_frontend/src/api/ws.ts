type MessageData = unknown
type Listener = (data: MessageData) => void

export class WSClient {
  private ws?: WebSocket
  private listeners: Record<'open' | 'message' | 'close' | 'error', Listener[]> = {
    open: [],
    message: [],
    close: [],
    error: [],
  }
  private url: string
  private mock: boolean

  constructor(url: string, mock = false) {
    this.url = url
    this.mock = mock
  }

  // PUBLIC_INTERFACE
  connect() {
    /** Connect to websocket and setup message routing. */
    if (this.mock) {
      // simple mock: emit connected and echo
      setTimeout(() => this.emit('open', {}), 10)
      return
    }
    this.ws = new WebSocket(this.url)
    this.ws.onopen = () => this.emit('open', {})
    this.ws.onmessage = (ev: MessageEvent) => {
      try {
        const data = JSON.parse(String(ev.data)) as MessageData
        this.emit('message', data)
      } catch {
        this.emit('message', ev.data as MessageData)
      }
    }
    this.ws.onclose = () => this.emit('close', {})
    this.ws.onerror = (e: Event) => this.emit('error', e)
  }

  // PUBLIC_INTERFACE
  on(event: 'open'|'message'|'close'|'error', fn: Listener) {
    /** Subscribe to websocket events. */
    this.listeners[event].push(fn)
  }

  // PUBLIC_INTERFACE
  send(payload: unknown) {
    /** Send data to server (JSON stringified). In mock mode, loopback. */
    if (this.mock) {
      setTimeout(() => this.emit('message', { echo: payload }), 50)
      return
    }
    this.ws?.send(JSON.stringify(payload))
  }

  // PUBLIC_INTERFACE
  close() {
    /** Close websocket connection. */
    this.ws?.close()
  }

  private emit(event: 'open'|'message'|'close'|'error', data: MessageData) {
    this.listeners[event].forEach((fn) => fn(data))
  }
}
