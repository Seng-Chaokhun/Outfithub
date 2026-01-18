import type { User } from '../interfaces/domain/user.domain'
import type { ChangePasswordRequest } from '../interfaces/domain/requests.domain'
import axios from 'axios'

const API_BASE = '/api/users'

export async function fetchUser(userId: string): Promise<User> {
  const { data } = await axios.get<User>(`${API_BASE}/${userId}`)
  return data
}

export async function updateUser(userId: string, payload: Partial<User>): Promise<User> {
  const { data } = await axios.put<User>(`${API_BASE}/${userId}`, payload)
  return data
}

export async function changePassword(payload: ChangePasswordRequest): Promise<void> {
  await axios.post(`${API_BASE}/change-password`, payload)
}
