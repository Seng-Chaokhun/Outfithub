<template>
  <!-- Backdrop to capture outside clicks -->
  <Transition
    enter-active-class="transition ease-out duration-150"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="open" class="fixed inset-0 z-40" @click="$emit('close')"></div>
  </Transition>

  <!-- Panel anchored to header bottom -->
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 -translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div v-if="open" class="absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <!-- Search input -->
        <div class="relative">
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Search"
            class="w-full px-4 py-3 pl-12 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            @keydown.enter.prevent="submit"
          />
          <svg
            class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            @click="$emit('close')"
            aria-label="Close search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Suggestions panel -->
        <div class="mt-3 bg-white border rounded-md shadow-sm overflow-hidden" role="listbox">
          <!-- Show categories when not searching -->
          <div v-if="trimmedQuery.length === 0" class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="section in sections" :key="section.title">
              <div class="text-[10px] tracking-widest text-gray-500 mb-2">{{ section.title }}</div>
              <ul class="space-y-2">
                <li v-for="item in section.items" :key="item.label">
                  <button
                    class="w-full text-left text-sm text-gray-700 hover:text-gray-900"
                    @click="navigate(item)"
                  >
                    {{ item.label }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Show search results when typing -->
          <div v-else>
            <div class="px-4 py-3 text-xs text-gray-500 bg-gray-50 border-b">
              Results for "{{ trimmedQuery }}"
            </div>
            <div v-if="filteredQuickLinks.length > 0" class="max-h-72 overflow-y-auto p-4">
              <div class="space-y-1">
                <button
                  v-for="r in filteredQuickLinks"
                  :key="r.label"
                  class="w-full text-left text-sm text-gray-700 hover:bg-gray-50 px-3 py-2 rounded transition-colors"
                  @click="navigate(r)"
                >
                  {{ r.label }}
                </button>
              </div>
            </div>
            <div v-else class="p-8 text-center text-sm text-gray-500">
              No results found for "{{ trimmedQuery }}"
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'search', q: string): void; (e: 'navigate', to: string): void }>()

const inputRef = ref<HTMLInputElement | null>(null)
const query = ref('')

const sections = [
  {
    title: 'NEW ARRIVALS',
    items: [
      { label: 'Men', to: '/collection/mens' },
      { label: 'Women', to: '/collection/womens' },
      { label: 'Accessories', to: '/collection/accessories' },
    ],
  },
  {
    title: 'MEN',
    items: [
      { label: 'Tops', to: '/collection/mens/tops' },
      { label: 'Bottoms', to: '/collection/mens/bottoms' },
      { label: 'Accessories', to: '/collection/accessories' },
    ],
  },
  {
    title: 'WOMEN',
    items: [
      { label: 'Tops', to: '/collection/womens/tops' },
      { label: 'Bottoms', to: '/collection/womens/bottoms' },
      { label: 'Accessories', to: '/collection/accessories' },
    ],
  },
  {
    title: 'SALE',
    items: [
      { label: 'All Sale', to: '/sale' },
      { label: "Men's Sale", to: '/collection/mens' },
      { label: "Women's Sale", to: '/collection/womens' },
    ],
  },
]

const quickLinks = [
  { label: 'Polo Shirt', to: '/search?q=polo' },
  { label: 'Slim Fit Jeans', to: '/search?q=jeans' },
  { label: 'Tank Top', to: '/search?q=tank' },
  { label: 'Gray Polo', to: '/search?q=gray%20polo' },
  { label: 'Black Jeans', to: '/search?q=black%20jeans' },
]

const trimmedQuery = computed(() => query.value.trim())
const filteredQuickLinks = computed(() =>
  quickLinks.filter((x) => x.label.toLowerCase().includes(trimmedQuery.value.toLowerCase()))
)

function submit() {
  if (trimmedQuery.value.length === 0) return
  emit('search', trimmedQuery.value)
}

function navigate(item: { to: string; label: string }) {
  emit('navigate', item.to)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  (val) => {
    if (val) {
      // small delay to ensure element is in DOM
      requestAnimationFrame(() => inputRef.value?.focus())
      document.addEventListener('keydown', onKeyDown)
    } else {
      document.removeEventListener('keydown', onKeyDown)
    }
  }
)

onMounted(() => {
  if (props.open) document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>

<style scoped></style>
