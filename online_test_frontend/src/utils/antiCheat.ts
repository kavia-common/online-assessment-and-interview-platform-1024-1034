let tabSwitchHandler: ((this: Document, ev: Event) => void) | null = null

// PUBLIC_INTERFACE
export function preventCopyPaste() {
  /** Disable copy/paste/cut to reduce cheating. */
  document.oncopy = (e) => e.preventDefault()
  document.oncut = (e) => e.preventDefault()
  document.onpaste = (e) => e.preventDefault()
}

// PUBLIC_INTERFACE
export function trackTabSwitches(onWarn: () => void) {
  /** Count visibility changes as warnings. */
  tabSwitchHandler = () => {
    if (document.visibilityState === 'hidden') onWarn()
  }
  document.addEventListener('visibilitychange', tabSwitchHandler)
}

// PUBLIC_INTERFACE
export function cleanupAntiCheat() {
  /** Remove handlers. */
  if (tabSwitchHandler) document.removeEventListener('visibilitychange', tabSwitchHandler)
  document.oncopy = null
  document.oncut = null
  document.onpaste = null
}
