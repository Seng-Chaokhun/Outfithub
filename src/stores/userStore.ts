import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  return { user }
})


