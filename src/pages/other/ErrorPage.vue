<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div class="bg-white shadow-lg rounded-lg p-10 max-w-lg text-center">
      <h1 class="text-6xl font-bold text-red-500 mb-4">{{ code }}</h1>
      <h2 class="text-2xl font-semibold mb-2">{{ title }}</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <button
        @click="onRetry"
        class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
      >
        Retry
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props for dynamic error display
const props = defineProps<{
  code?: number
  title?: string
  message?: string
}>()

// Event emitter for parent to handle retry/back action
const emit = defineEmits<{
  (e: 'retry'): void
}>()

// Default values
const code = props.code ?? 404
const title = props.title ?? 'Page Not Found'
const message = props.message ?? 'Sorry, the page you are looking for does not exist.'

// Handle button click
const onRetry = () => {
  emit('retry')
}
</script>
