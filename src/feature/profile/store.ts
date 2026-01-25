import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiResponse, Profile, ProfileUpdateForm } from '../../../shared/interfaces'
import * as service from './services'

const PROFILE_CACHE_KEY = 'profile_cache'

function saveProfileCache(profile: Profile): void {
  localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile))
}

function loadProfileCache(): Profile | null {
  const cached = localStorage.getItem(PROFILE_CACHE_KEY)
  return cached ? JSON.parse(cached) : null
}

function clearProfileCache(): void {
  localStorage.removeItem(PROFILE_CACHE_KEY)
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(loadProfileCache())
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentUserId = ref<string | null>(profile.value?.id || null)

  async function fetchProfile(id: string): Promise<void> {
    // If we already have this profile loaded, skip the fetch entirely
    if (currentUserId.value === id && profile.value) {
      return
    }

    loading.value = true
    error.value = null
    currentUserId.value = id

    try {
      const response = await service.getProfile(id)
      if (response.success) {
        profile.value = response.payload
        saveProfileCache(response.payload)
      } else {
        error.value = response.message
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load profile'
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(
    id: string,
    data: ProfileUpdateForm,
  ): Promise<ApiResponse<Profile> | null> {
    loading.value = true
    error.value = null
    try {
      const response = await service.updateProfile(id, data)
      if (response.success) {
        profile.value = response.payload
        currentUserId.value = id
        saveProfileCache(response.payload)
      } else {
        error.value = response.message
      }
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update profile'
      return null
    } finally {
      loading.value = false
    }
  }

  function clearProfile() {
    profile.value = null
    currentUserId.value = null
    error.value = null
    clearProfileCache()
  }

  return { profile, loading, error, fetchProfile, updateProfile, clearProfile }
})
