<template>
	<Transition
		enter-active-class="transition ease-out duration-300"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition ease-in duration-200"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div
			v-if="isOpen"
			class="fixed inset-0 bg-black/50 z-50"
			@click="$emit('close')"
		></div>
	</Transition>

	<Transition
		enter-active-class="transition ease-out duration-300 transform"
		enter-from-class="translate-x-full"
		enter-to-class="translate-x-0"
		leave-active-class="transition ease-in duration-200 transform"
		leave-from-class="translate-x-0"
		leave-to-class="translate-x-full"
	>
		<div
			v-if="isOpen"
			class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
		>
			<!-- Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b">
				<h2 class="text-lg font-semibold">CART</h2>
				<button
					@click="$emit('close')"
					class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
				>
					×
				</button>
			</div>

			<!-- Free shipping banner -->
			<div v-if="cartStore.freeShippingRemaining > 0" class="px-6 py-3 bg-gray-50 text-sm">
				Spend ${{ cartStore.freeShippingRemaining.toFixed(2) }} more to reach free shipping
			</div>
			<div v-else class="px-6 py-3 bg-green-50 text-sm text-green-700">
				🎉 You've qualified for free shipping!
			</div>

			<!-- Cart items -->
			<div class="flex-1 overflow-y-auto px-6 py-4">
				<div v-if="cartStore.items.length === 0" class="text-center text-gray-500 py-12">
					Your cart is empty
				</div>

				<div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 mb-4 pb-4 border-b">
					<img :src="item.imageUrl" :alt="item.name" class="w-20 h-28 object-cover rounded" />
					
					<div class="flex-1">
						<h3 class="text-sm font-medium mb-1">{{ item.name }}</h3>
						<p class="text-xs text-gray-600 mb-1">Size: {{ item.size }}</p>
						<div class="flex items-center gap-2 mb-2">
							<span
								class="w-3 h-3 rounded-full border"
								:style="{ backgroundColor: getColorHex(item.color) }"
							></span>
						</div>
						
						<div class="flex items-center gap-3">
							<div class="flex items-center border rounded">
								<button
									@click="cartStore.decrementQuantity(item.id)"
									class="px-2 py-1 hover:bg-gray-100"
								>
									-
								</button>
								<span class="px-3 py-1 text-sm">{{ item.quantity }}</span>
								<button
									@click="cartStore.incrementQuantity(item.id)"
									class="px-2 py-1 hover:bg-gray-100"
								>
									+
								</button>
							</div>
							<button
								@click="cartStore.removeItem(item.id)"
								class="text-xs text-red-600 hover:text-red-700"
							>
								Remove
							</button>
						</div>
					</div>

					<div class="text-right">
						<p class="font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</p>
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div class="border-t px-6 py-4">
				<div class="mb-3">
					<label class="block text-sm font-medium text-gray-700 mb-2">Note</label>
					<input
						type="text"
						v-model="note"
						class="w-full border rounded px-3 py-2 text-sm"
						placeholder="Add a note to your order"
					/>
				</div>

				<div class="flex justify-between items-center mb-4">
					<span class="font-medium">Subtotal</span>
					<span class="text-xl font-bold">${{ cartStore.subtotal.toFixed(2) }}</span>
				</div>

				<button
					class="w-full bg-black text-white py-3 rounded-full font-medium hover:opacity-90 cursor-pointer"
					@click="checkout"
				>
					CHECK OUT
				</button>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'

defineProps<{
	isOpen: boolean
}>()

defineEmits<{
	(e: 'close'): void
}>()

const cartStore = useCartStore()
const note = ref('')

function getColorHex(color: string): string {
	const colorMap: Record<string, string> = {
		blue: '#4A90E2',
		black: '#000000',
		charcoal: '#36454F',
		'light-blue': '#87CEEB'
	}
	return colorMap[color] || '#cccccc'
}

function checkout() {
	if (cartStore.items.length === 0) {
		alert('Your cart is empty')
		return
	}
	alert(`Proceeding to checkout...\nSubtotal: $${cartStore.subtotal.toFixed(2)}`)
}
</script>

<style scoped></style>
