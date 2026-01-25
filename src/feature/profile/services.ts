import axios from 'axios'
import type { ApiResponse, Profile, ProfileUpdateForm } from '../../../shared/interfaces'

const API_URL = '/api/profile'

export async function getProfile(id: string): Promise<ApiResponse<Profile>> {
  const { data } = await axios.get<ApiResponse<Profile>>(`${API_URL}/${id}`)
  return data
}

export async function updateProfile(
  id: string,
  payload: ProfileUpdateForm,
): Promise<ApiResponse<Profile>> {
  const { data } = await axios.put<ApiResponse<Profile>>(`${API_URL}/${id}`, payload)
  return data
}
