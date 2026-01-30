<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <MainHeader />

    <!-- Hero Section - Auto-Swapping Carousel -->
    <section class="relative bg-white py-8">
      <div class="content-container">
        <div class="relative h-[500px] overflow-hidden rounded-lg w-full">
          <!-- Carousel Container -->
          <div
            class="flex transition-transform duration-700 ease-in-out h-full w-full"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <!-- Slide 1 - NEW ARRIVAL & FASHION -->
            <div class="min-w-full shrink-0 w-full">
              <div
                class="relative h-[500px] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=600&fit=crop"
                  alt="New Arrival Fashion"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
                />
                <div class="absolute bottom-8 left-8 text-6xl font-bold text-white drop-shadow-lg">
                  NEW<br />ARRIVAL
                </div>
              </div>
            </div>

            <!-- Slide 2 - Single Full-Width Fashion Banner -->
            <div class="min-w-full shrink-0 w-full">
              <div
                class="relative h-[500px] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group w-full"
              >
                <img
                  src="@/assets/images/Winterwear_at_Flat_40.jpg"
                  alt="Winterwear Sale"
                  class="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <!-- Navigation Dots -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            <button
              v-for="index in 2"
              :key="index"
              @click="goToSlide(index - 1)"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                currentSlide === index - 1 ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75',
              ]"
              :aria-label="`Go to slide ${index}`"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Men's Collection Section -->
    <section class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Image -->
          <div class="relative h-96 rounded-lg overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=600&fit=crop"
              alt="Men's Fashion Collection"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <!-- Text Content -->
          <div class="space-y-4">
            <h3 class="text-3xl font-bold text-gray-900">Various types<br />men's outfit</h3>
            <p class="text-gray-600">
              Discover our curated collection of men's fashion. From casual streetwear to formal
              attire, find your perfect style.
            </p>
            <button
              @click="navigateToMen"
              class="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>Shop men</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Women's Collection Section -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Text Content -->
          <div class="space-y-4 order-2 md:order-1">
            <h3 class="text-3xl font-bold text-gray-900">Various types<br />women's outfit</h3>
            <p class="text-gray-600">
              Explore elegant and trendy women's fashion. From chic dresses to comfortable everyday
              wear, express your unique style.
            </p>
            <button
              @click="navigateToWomen"
              class="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>Shop women</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <!-- Image -->
          <div class="relative h-96 rounded-lg overflow-hidden order-1 md:order-2 group">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
              alt="Women's Fashion Collection"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="bg-white py-16">
      <FeaturedCollections />
    </section>

    <!-- Footer -->
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MainHeader from '@/components/main/MainHeader.vue'
import MainFooter from '@/components/main/MainFooter.vue'
import FeaturedCollections from '@/components/landing/FeaturedCollections.vue'

const router = useRouter()

// Carousel state
const currentSlide = ref(0)
let intervalId: number | null = null

// Auto-rotate slides every 5 seconds
const startAutoRotate = () => {
  intervalId = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 2
  }, 5000)
}

// Stop auto-rotation
const stopAutoRotate = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// Manual navigation
const goToSlide = (index: number) => {
  currentSlide.value = index
  stopAutoRotate()
  startAutoRotate()
}

// Lifecycle hooks
onMounted(() => {
  startAutoRotate()
})

onUnmounted(() => {
  stopAutoRotate()
})

const navigateToMen = () => {
  router.push('/collection/men')
}

const navigateToWomen = () => {
  router.push('/collection/women')
}
</script>

<style scoped>
/* Smooth continuous carousel - no refresh effect */
</style>
