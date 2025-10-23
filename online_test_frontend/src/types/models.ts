export type Role = 'candidate' | 'admin' | 'hr' | 'employee'

export interface User {
  id: string
  name: string
  email?: string
  role: Role
}

export interface TestCatalogItem {
  id: string
  title: string
  duration: number
}

export interface AttemptSummary {
  score: number
  correct?: number
  total?: number
}
