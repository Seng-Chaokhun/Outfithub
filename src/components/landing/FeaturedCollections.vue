<template>
  <section class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of trending styles
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Product 1 -->
        <div class="group cursor-pointer" @click="viewProduct('1')">
          <div class="relative h-80 rounded-lg overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop"
              alt="Classic White T-Shirt"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </div>
          </div>
          <h4 class="font-semibold text-gray-900 mb-1">Classic White T-Shirt</h4>
          <p class="text-sm text-gray-600 mb-2">Essential Basics</p>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-gray-900">$29.99</span>
            <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
              View Details →
            </button>
          </div>
        </div>

        <!-- Product 2 -->
        <div class="group cursor-pointer" @click="viewProduct('2')">
          <div class="relative h-80 rounded-lg overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop"
              alt="Denim Jacket"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
              -30%
            </div>
          </div>
          <h4 class="font-semibold text-gray-900 mb-1">Vintage Denim Jacket</h4>
          <p class="text-sm text-gray-600 mb-2">Outerwear</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-lg font-bold text-gray-900">$69.99</span>
              <span class="text-sm text-gray-400 line-through">$99.99</span>
            </div>
            <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
              View Details →
            </button>
          </div>
        </div>

        <!-- Product 3 -->
        <div class="group cursor-pointer" @click="viewProduct('3')">
          <div class="relative h-80 rounded-lg overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"
              alt="Summer Dress"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h4 class="font-semibold text-gray-900 mb-1">Floral Summer Dress</h4>
          <p class="text-sm text-gray-600 mb-2">Women's Dresses</p>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-gray-900">$89.99</span>
            <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
              View Details →
            </button>
          </div>
        </div>

        <!-- Product 4 -->
        <div class="group cursor-pointer" @click="viewProduct('4')">
          <div class="relative h-80 rounded-lg overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop"
              alt="Leather Sneakers"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              HOT
            </div>
          </div>
          <h4 class="font-semibold text-gray-900 mb-1">Premium Leather Sneakers</h4>
          <p class="text-sm text-gray-600 mb-2">Footwear</p>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-gray-900">$129.99</span>
            <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Products (Expandable) -->
      <transition name="expand">
        <div v-show="showMoreProducts" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <!-- Product 5 -->
          <div class="group cursor-pointer" @click="viewProduct('5')">
            <div class="relative h-80 rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop"
                alt="Running Shoes"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Sport Running Shoes</h4>
            <p class="text-sm text-gray-600 mb-2">Footwear</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">$79.99</span>
              <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
                View Details →
              </button>
            </div>
          </div>

          <!-- Product 6 -->
          <div class="group cursor-pointer" @click="viewProduct('6')">
            <div class="relative h-80 rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop"
                alt="Black Hoodie"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                NEW
              </div>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Premium Black Hoodie</h4>
            <p class="text-sm text-gray-600 mb-2">Streetwear</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">$59.99</span>
              <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
                View Details →
              </button>
            </div>
          </div>

          <!-- Product 7 -->
          <div class="group cursor-pointer" @click="viewProduct('7')">
            <div class="relative h-80 rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop"
                alt="Classic Watch"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Luxury Classic Watch</h4>
            <p class="text-sm text-gray-600 mb-2">Accessories</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">$199.99</span>
              <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
                View Details →
              </button>
            </div>
          </div>

          <!-- Product 8 -->
          <div class="group cursor-pointer" @click="viewProduct('8')">
            <div class="relative h-80 rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop"
                alt="Casual Sneakers"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                -20%
              </div>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Casual Canvas Sneakers</h4>
            <p class="text-sm text-gray-600 mb-2">Footwear</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-lg font-bold text-gray-900">$49.99</span>
                <span class="text-sm text-gray-400 line-through">$62.99</span>
              </div>
              <button class="text-sm text-gray-900 hover:text-gray-600 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <button
          @click="toggleMoreProducts"
          class="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 cursor-pointer"
        >
          <span>{{ showMoreProducts ? 'Show Less' : 'View All Products' }}</span>
          <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': showMoreProducts }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMoreProducts = ref(false)

const viewProduct = (id: string) => {
  router.push(`/product/${id}`)
}

const toggleMoreProducts = () => {
  showMoreProducts.value = !showMoreProducts.value
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease;
  max-height: 2000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
