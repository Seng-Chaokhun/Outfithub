<template>
  <div>
    <MainHeader />
    <div class="content-container">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <CategoryFilter @update:filters="onFiltersUpdate" />
          <div ref="sortRef" class="relative">
            <button
              @click="sortOpen = !sortOpen"
              class="flex items-center gap-2 border rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              SORT BY
              <ChevronDown class="w-4 h-4" />
            </button>
            <div v-if="sortOpen" class="absolute z-10 mt-2 w-44 bg-white border rounded-md shadow">
              <button
                class="w-full text-left text-sm px-3 py-2 hover:bg-gray-50"
                @click="changeSort('price-asc')"
              >
                Price: Low to High
              </button>
              <button
                class="w-full text-left text-sm px-3 py-2 hover:bg-gray-50"
                @click="changeSort('price-desc')"
              >
                Price: High to Low
              </button>
              <button
                class="w-full text-left text-sm px-3 py-2 hover:bg-gray-50"
                @click="changeSort('name')"
              >
                Name A-Z
              </button>
            </div>
          </div>
        </div>

        <SearchBar />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard v-for="p in displayProducts" :key="p.id" :product="p" />
      </div>

      <div class="mt-12 border-t pt-6 flex items-center gap-6">
        <Facebook class="w-6 h-6" />
        <Instagram class="w-6 h-6" />
        <Twitter class="w-6 h-6" />
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, Facebook, Instagram, Twitter } from 'lucide-vue-next'
import SearchBar from '@/components/user/SearchBar.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import CategoryFilter from '@/components/user/CategoryFilter.vue'
import MainHeader from '@/components/main/MainHeader.vue'
import MainFooter from '@/components/main/MainFooter.vue'
import { useProductsStore /* type Product */ } from '@/stores/productsStore'

const productsStore = useProductsStore()
const sortOpen = ref(false)
const sortBy = ref<'price-asc' | 'price-desc' | 'name'>('name')
const sortRef = ref<HTMLElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (sortRef.value && !sortRef.value.contains(event.target as Node)) {
    sortOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const allProducts = computed(() => productsStore.womenProducts)

type Filters = {
  sizes: Record<string, boolean>
  productTypes: Record<string, boolean>
  priceMax: number
  availability: 'all' | 'inStock' | 'outOfStock'
}

const activeFilters = ref<Filters>({
  sizes: {},
  productTypes: {},
  priceMax: 369,
  availability: 'all',
})

function onFiltersUpdate(f: Filters) {
  activeFilters.value = f
}

function changeSort(mode: 'price-asc' | 'price-desc' | 'name') {
  sortBy.value = mode
  sortOpen.value = false
}

const displayProducts = computed(() => {
  let items = [...allProducts.value]

  // Filter by price
  items = items.filter((p) => p.price <= activeFilters.value.priceMax)

  // Filter by availability
  if (activeFilters.value.availability === 'inStock') {
    items = items.filter((p) => !p.soldOut)
  } else if (activeFilters.value.availability === 'outOfStock') {
    items = items.filter((p) => p.soldOut)
  }

  // Filter by product type (if any selected)
  const selectedTypes = Object.entries(activeFilters.value.productTypes)
    .filter(([, selected]) => selected)
    .map(([type]) => type.toLowerCase())
  if (selectedTypes.length > 0) {
    items = items.filter((p) => selectedTypes.some((t) => p.name.toLowerCase().includes(t)))
  }

  if (sortBy.value === 'price-asc') items.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') items.sort((a, b) => b.price - a.price)
  else items.sort((a, b) => a.name.localeCompare(b.name))

  return items
})
</script>

<style scoped></style>
