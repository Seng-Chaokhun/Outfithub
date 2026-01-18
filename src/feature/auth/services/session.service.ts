import type { UserSession } from '../interfaces/domain/session.domain'
import type { AuthTokens } from '../interfaces/domain/auth.domain'
import axios from 'axios'

const STORAGE_KEY = 'user_session'

export function createSession(data: {
  tokens: AuthTokens
  userId: string
  name: string
  email: string
}): UserSession {
  const session: UserSession = {
    userId: data.userId,
    name: data.name,
    email: data.email,
    tokens: data.tokens,
    expiresAt: Date.now() + 1000 * 60 * 15,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  return session
}

export function getSession(): UserSession | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export async function refreshToken(): Promise<void> {
  try {
    await axios.post('/api/auth/refresh-token')
  } catch {
    clearSession()
  }
}
