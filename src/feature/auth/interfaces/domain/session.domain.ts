import type { AuthTokens } from './auth.domain'

export interface UserSession {
  userId: string
  name: string
  email: string
  tokens: AuthTokens
  expiresAt: number
}
