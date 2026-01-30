<template>
  <div class="auth-container">
    <form @submit.prevent="handleLogin">
      <h1>Login</h1>
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" placeholder="Username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="message" :class="isSuccess ? 'success' : 'error'">{{ message }}</p>
      <p><router-link to="/register">Don't have an account? Register here</router-link></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const message = ref('')
const isSuccess = ref(false)

const handleLogin = async () => {
  try {
    await authStore.loginUser({ username: username.value, password: password.value })

    if (authStore.isAuthenticated) {
      message.value = 'Login successful! Redirecting...'
      isSuccess.value = true
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      message.value = 'Login failed. Please check your credentials.'
      isSuccess.value = false
    }
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'Login failed. Please try again.'
    isSuccess.value = false
    console.error('Login failed:', error)
  }
}
</script>

<style scoped lang="scss">
@use '../assets/auth.scss';

.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  div {
    margin-bottom: 1rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }

  button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  p {
    margin-top: 1rem;
    text-align: center;

    &.success {
      color: #28a745;
      font-weight: bold;
    }

    &.error {
      color: #dc3545;
      font-weight: bold;
    }

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
