export function required(v: string) { return !!v && v.trim().length > 0 }
export function isEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }
