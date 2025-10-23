export function secondsToHms(total: number) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return [h, m, s].map((x) => String(x).padStart(2, '0')).join(':')
}
