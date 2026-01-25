<template>
  <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl space-y-6 animate-fadein">
      <h2 class="text-xl font-semibold text-gray-800">Edit Profile</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
          <input
            v-model="local.name"
            type="text"
            :disabled="isSaving"
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none disabled:opacity-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            v-model="local.email"
            type="email"
            :disabled="isSaving"
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none disabled:opacity-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            v-model="local.username"
            type="text"
            :disabled="isSaving"
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none disabled:opacity-50"
          />
        </div>
      </div>

      <div
        v-if="message"
        :class="['text-sm font-medium', isSuccess ? 'text-green-600' : 'text-red-600']"
      >
        {{ message }}
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button
          @click="$emit('close')"
          :disabled="isSaving"
          class="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          @click="save"
          :disabled="isSaving"
          class="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer disabled:opacity-50"
        >
          {{ isSaving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type * as I from '@/../shared/interfaces'

const props = defineProps<{
  profile: Partial<Pick<I.Profile, 'name' | 'email' | 'username'>>
}>()

const emit = defineEmits<{
  close: []
  save: [data: Partial<Pick<I.Profile, 'name' | 'email' | 'username'>>]
}>()

const local = ref<Partial<Pick<I.Profile, 'name' | 'email' | 'username'>>>({
  name: props.profile.name || '',
  email: props.profile.email || '',
  username: props.profile.username || '',
})

const isSaving = ref(false)
const message = ref('')
const isSuccess = ref(false)

watch(
  () => props.profile,
  (newProfile) => {
    local.value = {
      name: newProfile.name || '',
      email: newProfile.email || '',
      username: newProfile.username || '',
    }
  },
)

const save = async () => {
  isSaving.value = true
  message.value = ''
  try {
    emit('save', local.value)
    // Wait a bit to see the response from parent
    await new Promise((resolve) => setTimeout(resolve, 100))
  } catch (error) {
    console.error('Save error:', error)
    message.value = 'Failed to save profile'
    isSuccess.value = false
    isSaving.value = false
  }
}

const showSuccess = () => {
  message.value = 'Profile saved successfully!'
  isSuccess.value = true
  setTimeout(() => {
    emit('close')
  }, 1500)
}

const setError = (err: string) => {
  message.value = err
  isSuccess.value = false
  isSaving.value = false
}

defineExpose({ showSuccess, setError })
</script>

<style scoped>
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadein {
  animation: fadein 0.25s ease;
}
</style>
