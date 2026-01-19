<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-600 mb-6">
        <router-link to="/" class="hover:text-gray-900">HOME</router-link>
        <span class="mx-2">/</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left: Product Images -->
        <div class="space-y-4">
          <div 
            v-for="(image, index) in productImages" 
            :key="index"
            class="relative overflow-hidden rounded-lg bg-gray-100"
          >
            <img 
              :src="image" 
              :alt="`${product.name} - Image ${index + 1}`"
              class="w-full h-auto object-cover"
            />
          </div>
        </div>

        <!-- Right: Product Details -->
        <div class="lg:sticky lg:top-8 h-fit">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
          <p class="text-2xl font-semibold text-gray-900 mb-4">${{ product.price.toFixed(2) }}</p>
          
          <!-- SKU -->
          <p class="text-sm text-gray-500 mb-6">{{ product.sku }}</p>

          <!-- Size Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">SIZE</label>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="size in sizes"
                :key="size"
                @click="selectedSize = size"
                :class="[
                  'px-4 py-2 border rounded-md text-sm font-medium transition-colors',
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Stock Warning -->
          <div v-if="product.stock && product.stock < 5" class="mb-6">
            <p class="text-sm text-red-600 font-medium">
              HURRY, ONLY {{ product.stock }} ITEMS LEFT IN STOCK!
            </p>
          </div>

          <!-- Add to Cart Button -->
          <button
            @click="handleAddToCart"
            :disabled="!selectedSize"
            class="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-6"
          >
            ADD TO CART
          </button>

          <!-- Details Accordion -->
          <div class="border-t border-b divide-y">
            <div class="py-4">
              <button
                @click="detailsOpen = !detailsOpen"
                class="flex items-center justify-between w-full text-left"
              >
                <span class="text-sm font-medium text-gray-900">DETAILS</span>
                <ChevronDown 
                  :class="['w-5 h-5 transition-transform', detailsOpen ? 'rotate-180' : '']"
                />
              </button>
              <div v-show="detailsOpen" class="mt-3 text-sm text-gray-600 space-y-2">
                <p>{{ product.description || 'Premium quality slim fit jeans with comfortable stretch fabric.' }}</p>
                <ul class="list-disc list-inside space-y-1 mt-3">
                  <li>98% Cotton, 2% Elastane</li>
                  <li>Slim fit design</li>
                  <li>Classic 5-pocket styling</li>
                  <li>Machine washable</li>
                  <li>Imported</li>
                </ul>
              </div>
            </div>

            <div class="py-4">
              <button
                @click="shippingOpen = !shippingOpen"
                class="flex items-center justify-between w-full text-left"
              >
                <span class="text-sm font-medium text-gray-900">SHIPPING AND RETURNS</span>
                <ChevronDown 
                  :class="['w-5 h-5 transition-transform', shippingOpen ? 'rotate-180' : '']"
                />
              </button>
              <div v-show="shippingOpen" class="mt-3 text-sm text-gray-600 space-y-2">
                <p><strong>Shipping:</strong> Free standard shipping on orders over $50</p>
                <p><strong>Delivery:</strong> 5-7 business days</p>
                <p><strong>Returns:</strong> 30-day return policy. Items must be unworn with tags attached.</p>
              </div>
            </div>
          </div>

          <!-- Share -->
          <div class="mt-6">
            <button class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Share2 class="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Social Icons -->
      <div class="mt-16 pt-8 border-t">
        <div class="flex items-center gap-6 mb-4">
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <Facebook class="w-6 h-6" />
          </a>
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <Instagram class="w-6 h-6" />
          </a>
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <Twitter class="w-6 h-6" />
          </a>
        </div>
        <p class="text-xs text-gray-500">© Outfithub, all rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronDown, Share2, Facebook, Instagram, Twitter } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps<{ id: string }>()
const router = useRouter()
const cartStore = useCartStore()

const selectedSize = ref('')
const detailsOpen = ref(false)
const shippingOpen = ref(false)

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']

// Load images dynamically
const imageModules = import.meta.glob('../../assets/images/men/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const allImages = computed(() => Object.values(imageModules))

// Mock product data - in real app, fetch from API
const product = ref({
  id: parseInt(props.id),
  name: 'LAC MEN SLIM FIT BLACK JEANS',
  price: 24.90,
  sku: '072836-31',
  stock: 2,
  color: 'black' as 'black' | 'light-blue' | 'charcoal',
  imageUrl: allImages.value[0] || '',
  description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.'
})

// Use multiple images for the product
const productImages = computed(() => {
  // In a real app, you'd fetch specific images for this product
  // For now, we'll use the first 3 available images or repeat the first one
  const images = allImages.value.filter(img => 
    img.toLowerCase().includes('black') || img.toLowerCase().includes('jeans')
  )
  if (images.length >= 3) {
    return images.slice(0, 3)
  } else if (images.length > 0) {
    // Repeat images if we don't have enough
    return [images[0], images[0], images[0]]
  }
  return allImages.value.slice(0, 3)
})

const handleAddToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size')
    return
  }

  cartStore.addItem({
    productId: product.value.id,
    name: product.value.name,
    price: product.value.price,
    imageUrl: product.value.imageUrl,
    size: selectedSize.value,
    color: product.value.color
  })

  alert(`${product.value.name} (Size: ${selectedSize.value}) added to cart!`)
}

// Simulate loading product data
onMounted(() => {
  // In a real app, you would fetch product data here
  // For now, we're using mock data
})
</script>

<style scoped></style>
