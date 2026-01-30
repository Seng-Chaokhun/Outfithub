import axios, { AxiosError } from 'axios'
import type { Session } from '../../shared/interfaces'

const API_URL = '/api'
const SESSION_KEY = 'session'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Request interceptor - add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const session = loadSessionFromStorage()
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - handle token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && originalRequest && !originalRequest.headers['X-Retry']) {
      originalRequest.headers['X-Retry'] = 'true'

      try {
        const session = loadSessionFromStorage()
        if (!session?.refreshToken) {
          clearSessionFromStorage()
          return Promise.reject(error)
        }

        // Call refresh token endpoint
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: session.refreshToken,
        })

        if (response.data.success && response.data.payload) {
          // Save new session
          saveSessionToStorage(response.data.payload)

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.payload.accessToken}`
          }
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, clear session
        clearSessionFromStorage()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

// Helper functions
function loadSessionFromStorage(): Session | null {
  const session = sessionStorage.getItem(SESSION_KEY)
  return session ? JSON.parse(session) : null
}

function saveSessionToStorage(session: Session): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

function clearSessionFromStorage(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export {
  axiosInstance,
  SESSION_KEY,
  loadSessionFromStorage,
  saveSessionToStorage,
  clearSessionFromStorage,
}
