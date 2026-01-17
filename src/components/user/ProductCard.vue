<template>
	<div class="space-y-3 group cursor-pointer">
		<div class="relative overflow-hidden rounded-md bg-gray-100">
			<img
				:src="product.imageUrl"
				:alt="product.name"
				class="w-full h-[360px] object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div
				v-if="product.soldOut"
				class="absolute bottom-3 left-3 right-3 text-center"
			>
				<span class="inline-block rounded-full bg-gray-800/90 text-white text-xs tracking-widest px-5 py-2">
					SOLD OUT
				</span>
			</div>
			<button
				v-else
				@click.stop="handleAddToCart"
				class="absolute bottom-3 left-3 right-3 bg-black text-white text-sm py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800"
			>
				Add to Cart
			</button>
		</div>

		<div class="space-y-1">
			<h3 class="text-sm font-semibold text-gray-800">{{ product.name }}</h3>
			<p class="text-sm text-gray-700">{{ displayPrice }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

interface Product {
	id: number
	name: string
	price: number
	imageUrl: string
	soldOut?: boolean
	color?: 'light-blue' | 'black' | 'charcoal'
}

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()

const displayPrice = computed(() => `${props.product.price.toFixed(2)}$`)

function handleAddToCart() {
	// Default size - in a real app, you'd show a size selector modal
	const defaultSize = 'M'
	
	cartStore.addItem({
		productId: props.product.id,
		name: props.product.name,
		price: props.product.price,
		imageUrl: props.product.imageUrl,
		size: defaultSize,
		color: props.product.color || 'black'
	})

	// Optional: show a brief success message
	alert(`${props.product.name} added to cart!`)
}
</script>

<style scoped></style>

