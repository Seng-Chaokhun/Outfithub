import * as Users from './repository.js'
import * as I from '../shared/interfaces'

function ok<T = null>(message: string, payload: T): { body: I.ApiResponse<T> } {
  return { body: { success: true, message, payload } }
}

function error(message: string, code?: number): { body: I.ApiResponse; code?: number } {
  return { body: { success: false, message, payload: null }, ...(code && { code }) }
}

function toProfile(user: I.DatabaseUser): I.Profile {
  return {
    id: String(user.id),
    name: user.full_name || user.username,
    email: user.email,
    username: user.username,
    avatar: user.avatar_url || '',
    joined: user.created_at ? new Date(user.created_at).toISOString().split('T')[0] : '',
  }
}

export async function getProfile(id: string | number) {
  const user = await Users.findById(id)
  if (!user) return error('Profile not found', 404)
  return ok('Profile fetched', toProfile(user))
}

export async function updateProfile(id: string | number, data: I.ProfileUpdateForm) {
  const user = await Users.findById(id)
  if (!user) return error('Profile not found', 404)

  if (data.username && (await Users.isUsernameTakenByOther(data.username, id)))
    return error('Username already exists', 409)
  if (data.email && (await Users.isEmailTakenByOther(data.email, id)))
    return error('Email already exists', 409)

  const updated = await Users.updateProfile(id, {
    username: data.username,
    email: data.email,
    fullName: data.name,
    avatar: data.avatar,
  })
  if (!updated) return error('Nothing to update')
  return ok('Profile updated', toProfile(updated))
}

export default { getProfile, updateProfile }
