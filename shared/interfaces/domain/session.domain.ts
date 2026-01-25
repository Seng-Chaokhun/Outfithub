export interface Session {
  userId: string
  accessToken: string
  refreshToken: string
  expiresAt?: number
}
