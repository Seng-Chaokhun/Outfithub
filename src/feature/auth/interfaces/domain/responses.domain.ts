import type { AuthTokens } from './auth.domain'

export interface LoginResponse {
  userId: string
  name: string
  email: string
  tokens: AuthTokens
}

export interface RegisterResponse {
  userId: string
  name: string
  email: string
}

export interface ChangePasswordResponse {
  success: boolean
  message?: string
}
