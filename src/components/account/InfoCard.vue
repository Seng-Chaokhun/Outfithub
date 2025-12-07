<template>
  <div class="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm">
    <p class="text-sm text-gray-500 mb-1">{{ label }}</p>
    <p class="font-semibold text-gray-800 break-all">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>
