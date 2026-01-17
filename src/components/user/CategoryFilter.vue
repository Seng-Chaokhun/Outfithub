<template>
	<div ref="filterRef" class="relative inline-block">
		<button
			@click="open = !open"
			class="flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm cursor-pointer hover:opacity-90"
		>
			FILTER BY
			<Plus class="w-4 h-4" />
		</button>

		<Transition
			enter-active-class="transition ease-out duration-200"
			enter-from-class="opacity-0 translate-y-1"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition ease-in duration-150"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-if="open"
				class="absolute top-full left-0 mt-2 z-20 w-[600px] p-6 border rounded-md bg-white shadow-lg"
			>
				<div class="grid grid-cols-4 gap-6 border-b pb-4 mb-4">
					<!-- Size Section -->
					<div>
						<h4 class="text-sm font-semibold mb-3">Size</h4>
						<div class="space-y-2">
							<label v-for="size in sizes" :key="size" class="flex items-center gap-2 text-sm text-gray-700">
								<input type="checkbox" v-model="localFilters.sizes[size]" />
								{{ size }}
							</label>
						</div>
					</div>

					<!-- Product Type Section -->
					<div>
						<h4 class="text-sm font-semibold mb-3">Product type</h4>
						<div class="space-y-2">
							<label v-for="type in productTypes" :key="type" class="flex items-center gap-2 text-sm text-gray-700">
								<input type="checkbox" v-model="localFilters.productTypes[type]" />
								{{ type }}
							</label>
						</div>
					</div>

					<!-- Price Section -->
					<div>
						<h4 class="text-sm font-semibold mb-3">Price</h4>
						<div class="space-y-3">
							<input
								type="range"
								v-model="localFilters.priceMax"
								min="0"
								max="369"
								class="w-full"
							/>
							<p class="text-xs text-gray-600">Price $0- ${{ localFilters.priceMax }}</p>
						</div>
					</div>

					<!-- Availability Section -->
					<div>
						<h4 class="text-sm font-semibold mb-3">Availability</h4>
						<div class="space-y-2">
							<label class="flex items-center gap-2 text-sm text-gray-700">
								<input type="radio" v-model="localFilters.availability" value="all" />
								All
							</label>
							<label class="flex items-center gap-2 text-sm text-gray-700">
								<input type="radio" v-model="localFilters.availability" value="inStock" />
								In Stock
							</label>
							<label class="flex items-center gap-2 text-sm text-gray-700">
								<input type="radio" v-model="localFilters.availability" value="outOfStock" />
								Out of stock
							</label>
						</div>
					</div>
				</div>

				<div class="flex gap-3">
					<button
						@click="apply"
						class="px-6 py-2 text-sm rounded-full bg-black text-white hover:opacity-90 cursor-pointer"
					>
						APPLY
					</button>
					<button
						@click="clear"
						class="px-6 py-2 text-sm rounded-full border hover:bg-gray-50 cursor-pointer"
					>
						Reset
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Plus } from 'lucide-vue-next'

type Filters = {
	sizes: Record<string, boolean>
	productTypes: Record<string, boolean>
	priceMax: number
	availability: 'all' | 'inStock' | 'outOfStock'
}

const open = ref(false)
const filterRef = ref<HTMLElement | null>(null)

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const productTypes = ['Backpack', 'Bag', 'Belt', 'Boxer', 'Bumbag', 'Clutch bag', 'Hoodie', 'Jacket', 'Jeans', 'Joggers']

const defaultFilters = (): Filters => ({
	sizes: Object.fromEntries(sizes.map(s => [s, false])),
	productTypes: Object.fromEntries(productTypes.map(t => [t, false])),
	priceMax: 369,
	availability: 'all'
})

const localFilters = ref<Filters>(defaultFilters())

const emit = defineEmits<{ (e: 'update:filters', value: Filters): void }>()

function handleClickOutside(event: MouseEvent) {
	if (filterRef.value && !filterRef.value.contains(event.target as Node)) {
		open.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})

function apply() {
	emit('update:filters', localFilters.value)
	open.value = false
}

function clear() {
	localFilters.value = defaultFilters()
	emit('update:filters', localFilters.value)
}
</script>

<style scoped></style>

