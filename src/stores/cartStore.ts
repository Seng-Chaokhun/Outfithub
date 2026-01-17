import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface CartItem {
  id: string
  productId: number
  name: string
  price: number
  imageUrl: string
  size: string
  color: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // Load from localStorage on init
  const savedCart = localStorage.getItem('cart')
  const items = ref<CartItem[]>(savedCart ? JSON.parse(savedCart) : [])

  // Computed
  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const freeShippingThreshold = 50
  const freeShippingRemaining = computed(() => {
    return Math.max(0, freeShippingThreshold - subtotal.value)
  })

  // Actions
  function addItem(item: Omit<CartItem, 'id' | 'quantity'>) {
    // Check if item already exists (same product, size, color)
    const existingItem = items.value.find(
      i => i.productId === item.productId && i.size === item.size && i.color === item.color
    )

    if (existingItem) {
      existingItem.quantity++
    } else {
      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${item.size}-${item.color}-${Date.now()}`,
        quantity: 1
      }
      items.value.push(newItem)
    }

    saveToLocalStorage()
  }

  function removeItem(id: string) {
    const index = items.value.findIndex(i => i.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  function updateQuantity(id: string, quantity: number) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveToLocalStorage()
    }
  }

  function incrementQuantity(id: string) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.quantity++
      saveToLocalStorage()
    }
  }

  function decrementQuantity(id: string) {
    const item = items.value.find(i => i.id === id)
    if (item && item.quantity > 1) {
      item.quantity--
      saveToLocalStorage()
    }
  }

  function clearCart() {
    items.value = []
    saveToLocalStorage()
  }

  function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  return {
    items,
    subtotal,
    itemCount,
    freeShippingRemaining,
    freeShippingThreshold,
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart
  }
})
