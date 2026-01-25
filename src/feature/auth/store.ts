import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  ChangePasswordForm,
  LoginForm,
  RegisterForm,
  ApiResponse,
  Session,
} from '../../../shared/interfaces'
import * as service from './services'

export const useAuthStore = defineStore('auth', () => {
  // states
  const session = ref<Session | null>(null)
  const isAuthenticated = computed(() => !!session.value)

  // mutations
  function setSession(form: Session | null): void {
    session.value = form
  }

  function clearSession(): void {
    session.value = null
  }

  async function registerUser(form: RegisterForm): Promise<ApiResponse | null> {
    const response = await service.register(form)
    if (!response?.success) {
      throw new Error(response?.message || 'Registration failed')
    }
    return response
  }

  // service-driven actions : auth
  async function loginUser(form: LoginForm): Promise<void> {
    const response = await service.login(form)
    if (response?.success && response.payload) {
      setSession(response.payload)
    } else {
      throw new Error(response?.message || 'Login failed')
    }
  }

  async function logoutUser(): Promise<void> {
    service.logout()
    clearSession()
  }

  async function changeUserPassword(form: ChangePasswordForm): Promise<ApiResponse | null> {
    if (!session.value) return null
    return await service.changePassword(form)
  }

  async function refreshUserToken(): Promise<void> {
    if (!session.value) return
    const response = await service.refreshToken(session.value)
    if (response?.success && response.payload) {
      setSession(response.payload)
    }
  }

  async function loadSession(): Promise<void> {
    const sessionData = await service.loadSessionAndValidate()
    if (sessionData) {
      setSession(sessionData)
    }
  }

  return {
    session,
    isAuthenticated,
    setSession,
    loadSession,
    clearSession,
    registerUser,
    loginUser,
    logoutUser,
    changeUserPassword,
    refreshUserToken,
  }
})
