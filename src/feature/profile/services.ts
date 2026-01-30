import { axiosInstance } from '@/api/axiosInstance'
import type { ApiResponse, Profile, ProfileUpdateForm } from '../../../shared/interfaces'

const API_URL = '/profile'

export async function getProfile(id: string): Promise<ApiResponse<Profile>> {
  const { data } = await axiosInstance.get<ApiResponse<Profile>>(`${API_URL}/${id}`)
  return data
}

export async function updateProfile(
  id: string,
  payload: ProfileUpdateForm,
): Promise<ApiResponse<Profile>> {
  const { data } = await axiosInstance.put<ApiResponse<Profile>>(`${API_URL}/${id}`, payload)
  return data
}
