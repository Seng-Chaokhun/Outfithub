<template>
  <header class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Menu -->
        <div class="flex items-center">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            <router-link to="/" class="text-green-500 font-bold text-2xl">Outfithub</router-link>
          </button>
        </div>

        <!-- Center Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/new-arrivals"
            class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            active-class="text-gray-900"
          >
            NEW ARRIVALS
          </router-link>
          <router-link
            to="/men"
            class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            active-class="text-gray-900"
          >
            MEN
          </router-link>
          <router-link
            to="/women"
            class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            active-class="text-gray-900"
          >
            WOMEN
          </router-link>
        </nav>

        <!-- Right Icons -->
        <div class="flex items-center space-x-6">
          <!-- Search -->
          <button
            @click="toggleSearch"
            class="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <!-- Cart -->
          <button
            class="text-gray-700 hover:text-gray-900 relative transition-colors"
            aria-label="Shopping cart"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>

          <!-- User -->
          <button
            @click="handleUserClick"
            class="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="User account"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="showMobileMenu" class="md:hidden border-t bg-white">
        <nav class="px-4 py-4 space-y-2">
          <router-link
            to="/new-arrivals"
            @click="showMobileMenu = false"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            NEW ARRIVALS
          </router-link>
          <router-link
            to="/men"
            @click="showMobileMenu = false"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            MEN
          </router-link>
          <router-link
            to="/women"
            @click="showMobileMenu = false"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            WOMEN
          </router-link>
        </nav>
      </div>
    </Transition>

    <!-- Search Overlay -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showSearch" class="absolute top-full left-0 right-0 bg-white border-b shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for products..."
              class="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <svg
              class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <button
              @click="toggleSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showSearch = ref(false)
const showMobileMenu = ref(false)
const searchQuery = ref('')

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleUserClick = () => {
  router.push({ name: 'Account', params: { id: 123 } })
}
</script>

<style scoped></style>
