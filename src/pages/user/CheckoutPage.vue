<template>
  <div class="min-h-screen bg-gray-50">
    <MainHeader />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Forms -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Delivery Method -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Delivery Method</h2>
            <div class="space-y-3">
              <label
                v-for="method in deliveryMethods"
                :key="method.id"
                class="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                :class="selectedDelivery === method.id ? 'border-black bg-gray-50' : 'border-gray-300'"
              >
                <div class="flex items-center">
                  <input
                    type="radio"
                    :value="method.id"
                    v-model="selectedDelivery"
                    class="w-4 h-4 text-black focus:ring-black"
                  />
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{{ method.name }}</p>
                    <p class="text-sm text-gray-500">{{ method.description }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span 
                    v-if="cartStore.totalPrice >= 50 && method.cost > 0" 
                    class="text-sm text-gray-400 line-through"
                  >
                    {{ method.price }}
                  </span>
                  <span class="text-sm font-medium text-gray-900">
                    {{ cartStore.totalPrice >= 50 ? 'Free' : method.price }}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    v-model="shippingAddress.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    v-model="shippingAddress.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  v-model="shippingAddress.address"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="123 Main St"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    v-model="shippingAddress.city"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    v-model="shippingAddress.postalCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div class="space-y-3">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="flex items-center p-4 border rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                :class="selectedPayment === method.id ? 'border-black bg-gray-50' : 'border-gray-300'"
              >
                <input
                  type="radio"
                  :value="method.id"
                  v-model="selectedPayment"
                  class="w-4 h-4 text-black focus:ring-black"
                />
                <div class="ml-3 flex items-center gap-2">
                  <component :is="method.icon" class="w-5 h-5" />
                  <span class="text-sm font-medium text-gray-900">{{ method.name }}</span>
                </div>
              </label>
            </div>

            <!-- Credit Card Form -->
            <div v-if="selectedPayment === 'card'" class="mt-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  v-model="cardDetails.number"
                  type="text"
                  maxlength="19"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    v-model="cardDetails.expiry"
                    type="text"
                    maxlength="5"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    v-model="cardDetails.cvv"
                    type="text"
                    maxlength="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-3 mb-4 max-h-64 overflow-y-auto">
              <div v-for="item in cartStore.items" :key="`${item.productId}-${item.size}`" class="flex gap-3">
                <img :src="item.imageUrl" :alt="item.name" class="w-16 h-16 object-cover rounded" />
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">Size: {{ item.size }}</p>
                  <p class="text-sm text-gray-900">${{ item.price.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Pricing -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">{{ deliveryPrice }}</span>
              </div>
              <div class="flex justify-between text-base font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${{ totalWithShipping.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="placeOrder"
              :disabled="!canPlaceOrder"
              class="w-full mt-6 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import MainHeader from '@/components/main/MainHeader.vue'
import { CreditCard, Wallet, Smartphone } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()

const deliveryMethods = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: '5-7 business days',
    price: 'Free',
    cost: 0
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: '2-3 business days',
    price: '$10.00',
    cost: 10
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    description: 'Next business day',
    price: '$25.00',
    cost: 25
  }
]

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: Wallet },
  { id: 'gpay', name: 'Google Pay', icon: Smartphone }
]

const selectedDelivery = ref('standard')
const selectedPayment = ref('card')

const shippingAddress = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: ''
})

const cardDetails = ref({
  number: '',
  expiry: '',
  cvv: ''
})

const deliveryPrice = computed(() => {
  const method = deliveryMethods.find(m => m.id === selectedDelivery.value)
  
  // Free shipping on orders over $50 (applies to all delivery methods)
  if (cartStore.totalPrice >= 50) {
    return 'Free'
  }
  
  return method?.price || 'Free'
})

const shippingCost = computed(() => {
  // Free shipping on orders over $50
  if (cartStore.totalPrice >= 50) {
    return 0
  }
  
  const method = deliveryMethods.find(m => m.id === selectedDelivery.value)
  return method?.cost || 0
})

const totalWithShipping = computed(() => {
  return cartStore.totalPrice + shippingCost.value
})

const canPlaceOrder = computed(() => {
  const hasAddress = shippingAddress.value.firstName && 
                     shippingAddress.value.lastName && 
                     shippingAddress.value.address && 
                     shippingAddress.value.city && 
                     shippingAddress.value.postalCode
  
  const hasPayment = selectedPayment.value !== 'card' || 
                     (cardDetails.value.number && cardDetails.value.expiry && cardDetails.value.cvv)
  
  return hasAddress && hasPayment && cartStore.items.length > 0
})

const placeOrder = () => {
  if (!canPlaceOrder.value) {
    alert('Please fill in all required fields')
    return
  }

  // Simulate order processing
  alert(`Order placed successfully!\n\nDelivery: ${deliveryMethods.find(m => m.id === selectedDelivery.value)?.name}\nPayment: ${paymentMethods.find(m => m.id === selectedPayment.value)?.name}\nTotal: $${totalWithShipping.value.toFixed(2)}`)
  
  // Clear cart and redirect
  cartStore.clearCart()
  router.push('/')
}
</script>

<style scoped>
input[type="radio"]:checked {
  background-color: black;
  border-color: black;
}
</style>
