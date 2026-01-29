<template>
  <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
      <h2 class="text-2xl font-semibold mb-6">Change Password</h2>

      <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
        <p class="text-green-700 font-medium">{{ successMessage }}</p>
      </div>

      <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
        <p class="text-red-700 font-medium">{{ errorMessage }}</p>
      </div>

      <form @submit.prevent="submitPasswordChange" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input
            v-model="passwordForm.currentPassword"
            type="password"
            placeholder="Enter your current password"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
          <p v-if="errors.currentPassword" class="text-red-600 text-xs mt-1">
            {{ errors.currentPassword }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="Enter your new password"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
          <p v-if="errors.newPassword" class="text-red-600 text-xs mt-1">
            {{ errors.newPassword }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
          <p v-if="errors.confirmPassword" class="text-red-600 text-xs mt-1">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import type { ChangePasswordForm } from '@/../shared/interfaces'

const emit = defineEmits<{
  close: []
  save: [form: ChangePasswordForm]
}>()

const passwordForm = reactive<ChangePasswordForm>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const successMessage = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const resetForm = async () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  errors.currentPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''
  successMessage.value = ''
  errorMessage.value = ''
  await nextTick()
}

onMounted(() => {
  resetForm()
})

const validateForm = (): boolean => {
  errors.currentPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''

  if (!passwordForm.currentPassword) {
    errors.currentPassword = 'Current password is required'
  }

  if (!passwordForm.newPassword) {
    errors.newPassword = 'New password is required'
  } else if (passwordForm.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters'
  }

  if (!passwordForm.confirmPassword) {
    errors.confirmPassword = 'Password confirmation is required'
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  if (passwordForm.currentPassword === passwordForm.newPassword) {
    errors.newPassword = 'New password must be different from current password'
  }

  return !Object.values(errors).some((e) => e)
}

const submitPasswordChange = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    emit('save', { ...passwordForm })
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Failed to update password'
  } finally {
    isLoading.value = false
  }
}

const setError = (message: string) => {
  errorMessage.value = message
}

const showSuccess = (message: string = 'Password updated successfully!') => {
  successMessage.value = message
  setTimeout(async () => {
    await resetForm()
    emit('close')
  }, 1500)
}

defineExpose({ setError, showSuccess })
</script>
