<template>
  <div class="min-h-screen bg-gray-50">
    <MainHeader />

    <!-- Page Header -->
    <section class="bg-white py-8 border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">All Sale Items</h1>
        <p class="mt-2 text-gray-600">Shop our best deals and discounts</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar -->
          <aside class="w-full lg:w-64 flex-shrink-0">
            <CategoryFilter />
          </aside>

          <!-- Products Grid -->
          <div class="flex-1">
            <div class="mb-4 flex justify-between items-center">
              <p class="text-sm text-gray-600">Showing {{ filteredProducts.length }} products</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
              />
            </div>

            <div v-if="filteredProducts.length === 0" class="text-center py-12">
              <p class="text-gray-500 text-lg">No sale items available</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MainHeader from '@/components/main/MainHeader.vue'
import MainFooter from '@/components/main/MainFooter.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import CategoryFilter from '@/components/user/CategoryFilter.vue'
import { useProductsStore } from '@/stores/productsStore'

const productsStore = useProductsStore()

const filteredProducts = computed(() => {
  return productsStore.allProducts.filter((product) => product.soldOut === false)
})
</script>
