export interface DatabaseUser {
  id: number
  username: string
  email: string
  full_name?: string
  avatar_url?: string
  password_hash: string
  role: string
  created_at: string
}
