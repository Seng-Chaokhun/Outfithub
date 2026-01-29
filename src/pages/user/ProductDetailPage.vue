<template>
  <div class="min-h-screen bg-white">
    <MainHeader />
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

          <!-- Quantity Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">QUANTITY</label>
            <div class="flex items-center gap-3">
              <button
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
                class="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:border-gray-400 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
              >
                <span class="text-lg font-medium">−</span>
              </button>
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                class="w-16 h-10 border border-gray-300 rounded-md text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                @click="increaseQuantity"
                class="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
              >
                <span class="text-lg font-medium">+</span>
              </button>
            </div>
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
    <MainFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { ChevronDown, Share2, Facebook, Instagram, Twitter } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cartStore'
import { useProductsStore } from '@/stores/productsStore'
import MainHeader from '@/components/main/MainHeader.vue'
import MainFooter from '@/components/main/MainFooter.vue'

const props = defineProps<{ id: string }>()
const cartStore = useCartStore()
const productsStore = useProductsStore()

const selectedSize = ref('')
const quantity = ref(1)
const detailsOpen = ref(false)
const shippingOpen = ref(false)

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']

// Get product data from store
const product = computed(() => {
  const prod = productsStore.getProductById(parseInt(props.id))
  if (!prod) {
    // Fallback product if not found
    return {
      id: parseInt(props.id),
      name: 'Product Not Found',
      price: 0,
      sku: 'N/A',
      color: 'black' as const,
      imageUrl: '',
      description: 'This product could not be found.',
      category: 'men' as const
    }
  }
  return prod
})

const productImageOverrides: Record<number, string[]> = {
  1: [
    new URL('../../assets/images/men/LAC Men Slim Fit Black Jeans 24.90.png', import.meta.url).href,
    new URL('../../assets/images/men/Container (1).png', import.meta.url).href,
    new URL('../../assets/images/men/LAC Men Slim Fit Black Jeans 24.90.png', import.meta.url).href,
  ],
}

// Get all images for the product's category to show different angles
const allCategoryImages = computed(() => {
  if (product.value.category === 'men') {
    return productsStore.menProducts.map(p => p.imageUrl)
  } else {
    return productsStore.womenProducts.map(p => p.imageUrl)
  }
})

// Show 3 different product images (different angles/views)
const productImages = computed(() => {
  const categoryImgs = allCategoryImages.value
  const currentProduct = product.value
  const productId = currentProduct.id

  const overrideImages = productImageOverrides[productId]
  if (overrideImages && overrideImages.length > 0) {
    return overrideImages
  }

  console.log('Product ID:', productId)
  console.log('Category images:', categoryImgs)
  console.log('Total category images:', categoryImgs.length)

  if (currentProduct.category === 'men' && categoryImgs.length >= 6) {
    // Product 4 (Light Blue Jeans) - use first 3 images (image 3, image 6, image 7)
    if (productId === 4) {
      console.log('Using first 3 images for product 4')
      return [categoryImgs[0], categoryImgs[1], categoryImgs[2]]
    }
    // Other men's products - use last 3 images (screenshots - black jeans angles)
    else {
      console.log('Using last 3 images for product', productId)
      const angleImages = categoryImgs.slice(-3)
      return angleImages
    }
  } else if (currentProduct.category === 'women') {
    // For women's products, show the main product image 3 times
    const mainImg = currentProduct.imageUrl
    return [mainImg, mainImg, mainImg]
  } else {
    // Fallback
    const mainImg = currentProduct.imageUrl
    return [mainImg, mainImg, mainImg]
  }
})

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleAddToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size')
    return
  }

  const prod = product.value
  if (!prod || prod.price === 0) {
    alert('Product not available')
    return
  }

  // Add items to cart based on quantity
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem({
      productId: prod.id,
      name: prod.name,
      price: prod.price,
      imageUrl: prod.imageUrl,
      size: selectedSize.value,
      color: prod.color
    })
  }

  alert(`${quantity.value} × ${prod.name} (Size: ${selectedSize.value}) added to cart!`)
  quantity.value = 1 // Reset quantity after adding to cart
}

// Simulate loading product data
onMounted(() => {
  // In a real app, you would fetch product data here
  // For now, we're using mock data
})
</script>

<style scoped></style>
