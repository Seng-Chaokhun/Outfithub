<template>
  <form @submit.prevent="handleChangePassword">
    <h1>Change Password</h1>
    <input v-model="currentPassword" type="password" placeholder="Current Password" required />
    <input v-model="newPassword" type="password" placeholder="New Password" required />
    <input v-model="confirmPassword" type="password" placeholder="Confirm New Password" required />
    <button type="submit">Change Password</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store'

const authStore = useAuthStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const handleChangePassword = async () => {
  try {
    await authStore.changeUserPassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    })
    // Redirect or show success message
  } catch (error) {
    // Handle change password error
    console.error('Change password failed:', error)
  }
}
</script>

<style scoped lang="scss">
@use '../assets/auth.scss';

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
}
</style>
