<template>
  <div class="space-y-3 group cursor-pointer" @click="viewDetails">
    <div class="relative overflow-hidden rounded-md bg-gray-100">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-[360px] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div v-if="product.soldOut" class="absolute bottom-3 left-3 right-3 text-center">
        <span
          class="inline-block rounded-full bg-gray-800/90 text-white text-xs tracking-widest px-5 py-2"
        >
          SOLD OUT
        </span>
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="text-sm font-semibold text-gray-800">{{ product.name }}</h3>
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-700">{{ displayPrice }}</p>
        <button
          @click.stop="viewDetails"
          class="text-xs text-gray-600 hover:text-gray-900 underline transition-colors"
        >
          View Details →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  soldOut?: boolean
  color?: 'light-blue' | 'black' | 'charcoal'
}

const props = defineProps<{ product: Product }>()
const router = useRouter()

const displayPrice = computed(() => `${props.product.price.toFixed(2)}$`)

function viewDetails() {
  router.push(`/product/${props.product.id}`)
}
</script>

<style scoped></style>
