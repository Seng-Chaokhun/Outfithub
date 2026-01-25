import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './feature/auth/store'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Load session from localStorage on app startup
const authStore = useAuthStore()
await authStore.loadSession()

app.mount('#app')
