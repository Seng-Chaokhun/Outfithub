<template>
  <div
    class="flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white shadow-sm"
  >
    <div>
      <p class="font-medium text-gray-800">{{ device.device }}</p>
      <p class="text-sm text-gray-500">Location: {{ device.location }}</p>
      <p class="text-sm text-gray-500">Last active: {{ device.lastActive }}</p>
    </div>

    <button class="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer">
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  device: {
    id: number
    device: string
    location: string
    lastActive: string
  }
}>()
</script>
