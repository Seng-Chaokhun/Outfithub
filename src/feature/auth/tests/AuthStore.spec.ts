import { beforeEach, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../store'

describe('AuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('started logged out', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.session).toBeNull()
  })

  const testForm = {
    username: 'Ang Panha',
    email: 'angpanha@gmail.com',
    password: 'ABC',
    confirmPassword: 'ABC',
  }
  it('registers correctly', () => {
    const store = useAuthStore()
    const message = store.registerUser(testForm)
    expect(message).toBe('Register Successful')
  })
  it("registration failed: password don't match", () => {
    const store = useAuthStore()
    const message = store.registerUser(testForm)
    expect(message).toBe('Password does not Match')
  })
  it('registration failed: username already exists', () => {
    const store = useAuthStore()
    const message = store.registerUser(testForm)
    expect(message).toBe('Username already Exists')
  })
})
