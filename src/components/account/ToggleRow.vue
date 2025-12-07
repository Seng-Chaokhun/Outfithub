<template>
  <div class="flex items-center justify-between py-4">
    <div>
      <h4 class="font-medium text-gray-800">{{ label }}</h4>
      <p class="text-sm text-gray-500">{{ description }}</p>
    </div>

    <button
      @click="toggle"
      class="w-12 h-6 rounded-full transition relative cursor-pointer"
      :class="modelValue ? 'bg-blue-600' : 'bg-gray-300'"
    >
      <span
        class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow transition"
        :class="modelValue ? 'left-6' : 'left-1'"
      ></span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label: string
  description: string
}>()

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
