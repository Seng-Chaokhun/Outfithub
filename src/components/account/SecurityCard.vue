<template>
  <div
    class="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm flex items-center justify-between"
  >
    <div>
      <h3 class="font-semibold text-gray-800 text-lg">{{ title }}</h3>
      <p class="text-gray-500 text-sm">{{ description }}</p>
    </div>

    <button class="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black cursor-pointer">
      {{ action }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  action: string
}>()
</script>
