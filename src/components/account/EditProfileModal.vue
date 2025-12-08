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
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            v-model="local.email"
            type="email"
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            v-model="local.username"
            type="text"
            class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>

        <button
          @click="save"
          class="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
  profile: { name: string; email: string; username: string }
}>()

const emit = defineEmits(['close', 'save'])

const local = reactive({ ...props.profile })

const save = () => {
  emit('save', local)
}
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
