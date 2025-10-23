type MessageData = unknown
type Listener = (data: MessageData) => void

/**
 * Lightweight WebSocket client with optional mock mode.
 * - Uses URL provided by Endpoints.ws.*
 * - When mock=true (VITE_USE_MOCKS), emits open and echoes messages back.
 */
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
    /**
     * Connect to websocket and setup message routing.
     * In mock mode, only emits 'open' and echoes any sent payloads as { echo }.
     */
    if (this.mock) {
      setTimeout(() => this.emit('open', {}), 10)
      return
    }
    try {
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
      // Ensure no unused parameter is declared here to satisfy ESLint
      this.ws.onerror = () => this.emit('error', {})
    } catch {
      // Fallback to mock behavior if browser blocks or URL invalid
      this.mock = true
      setTimeout(() => {
        this.emit('open', {})
        this.emit('message', { warning: 'WS connection failed; switched to mock mode' })
      }, 10)
    }
  }

  // PUBLIC_INTERFACE
  on(event: 'open'|'message'|'close'|'error', fn: Listener) {
    /** Subscribe to websocket events. */
    this.listeners[event].push(fn)
  }

  // PUBLIC_INTERFACE
  send(payload: unknown) {
    /**
     * Send data to server (JSON stringified).
     * In mock mode, loopback with a short delay.
     */
    if (this.mock) {
      setTimeout(() => this.emit('message', { echo: payload }), 50)
      return
    }
    this.ws?.send(JSON.stringify(payload))
  }

  // PUBLIC_INTERFACE
  close() {
    /** Close websocket connection. */
    if (this.mock) {
      this.emit('close', {})
      return
    }
    this.ws?.close()
  }

  private emit(event: 'open'|'message'|'close'|'error', data: MessageData) {
    this.listeners[event].forEach((fn) => fn(data))
  }
}
