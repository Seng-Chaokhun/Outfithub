export interface Profile {
  id?: string
  name: string
  email: string
  username: string
  avatar?: string
  joined?: string
}

export interface ProfileUpdateForm {
  name?: string
  email?: string
  username?: string
  avatar?: string
}
