export function requestFullscreen(el: Element): Promise<void> | void {
  if (el.requestFullscreen) return el.requestFullscreen()
  // @ts-expect-error webkit prefixed API for Safari
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen()
}

export function exitFullscreen(): Promise<void> | void {
  if (document.exitFullscreen) return document.exitFullscreen()
  // @ts-expect-error webkit prefixed API for Safari
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen()
}

export function isFullscreen(): boolean {
  // @ts-expect-error webkit prefixed API for Safari
  return !!(document.fullscreenElement || document.webkitFullscreenElement)
}
