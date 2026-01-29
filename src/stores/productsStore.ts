import { defineStore } from 'pinia'
import { computed } from 'vue'

export type Product = {
  id: number
  name: string
  price: number
  imageUrl: string
  soldOut?: boolean
  color: 'light-blue' | 'black' | 'charcoal'
  category: 'men' | 'women'
  description?: string
  sku?: string
}

export const useProductsStore = defineStore('products', () => {
  // Define women's products (edit these URLs to change images)
  const womenProducts = computed<Product[]>(() => [
    { id: 1001, name: 'Nike V-Neck Tee', price: 24.99, imageUrl: '/images/women/product-1.jpg', color: 'black', soldOut: false, category: 'women', sku: 'WMN-001', description: 'Classic Nike V-neck tee with breathable fabric. Perfect for workouts or casual wear.' },
    { id: 1002, name: 'Striped Oversized Top', price: 32.50, imageUrl: '/images/women/product-2.jpg', color: 'light-blue', soldOut: false, category: 'women', sku: 'WMN-002', description: 'Comfortable oversized top with stylish striped pattern. Made from soft, breathable fabric.' },
    { id: 1003, name: 'Pink Logo Tee', price: 28.99, imageUrl: '/images/women/product-3.jpg', color: 'light-blue', soldOut: false, category: 'women', sku: 'WMN-003', description: 'Stylish pink Nike tee with signature logo. Perfect for athletic activities or casual wear.' },
    { id: 1004, name: 'Black Logo Tee', price: 26.99, imageUrl: '/images/women/product-4.jpg', color: 'black', soldOut: false, category: 'women', sku: 'WMN-004', description: 'Minimalist black tee with subtle logo design. Versatile piece for any wardrobe.' },
    { id: 1005, name: 'Button Front Top', price: 34.99, imageUrl: '/images/women/product-5.jpg', color: 'light-blue', soldOut: true, category: 'women', sku: 'WMN-005', description: 'Elegant button-front top in soft beige. Perfect for office or casual settings.' },
    { id: 1006, name: 'Black Tee & Shorts Set', price: 45.99, imageUrl: '/images/women/product-6.jpg', color: 'black', soldOut: false, category: 'women', sku: 'WMN-006', description: 'Complete athletic set with matching tee and shorts. Ideal for workouts and active lifestyle.' },
    { id: 1007, name: 'Black Athletic Set', price: 45.99, imageUrl: '/images/women/product-7.jpg', color: 'black', soldOut: false, category: 'women', sku: 'WMN-007', description: 'Premium black athletic set with moisture-wicking fabric. Designed for performance.' },
    { id: 1008, name: 'Beige Button Top', price: 34.99, imageUrl: '/images/women/product-8.jpg', color: 'light-blue', soldOut: true, category: 'women', sku: 'WMN-008', description: 'Sophisticated button-front top in neutral beige. A wardrobe essential.' },
    { id: 1009, name: 'Adidas Sport Tee', price: 29.99, imageUrl: '/images/women/product-9.jpg', color: 'charcoal', soldOut: false, category: 'women', sku: 'WMN-009', description: 'Bold red Adidas sport tee with signature branding. Built for performance and style.' }
  ])

  // Define men's products (edit these URLs to change images)
  const menProducts = computed<Product[]>(() => [
    { id: 1, name: 'LAC MEN SLIM FIT BLACK JEANS', price: 21.05, imageUrl: '/images/men/black-jeans-1.png', color: 'black', soldOut: false, category: 'men', sku: '72836-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 2, name: 'LAC MEN SLIM FIT LIGHT BLUE JEANS', price: 25.05, imageUrl: '/images/men/light-blue-jeans-1.png', color: 'light-blue', soldOut: false, category: 'men', sku: '72837-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 3, name: 'LAC MEN SLIM FIT CHARCOAL JEANS', price: 24.09, imageUrl: '/images/men/charcoal-jeans-1.png', color: 'charcoal', soldOut: false, category: 'men', sku: '72838-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 4, name: 'LAC MEN SLIM FIT BLACK JEANS', price: 21.55, imageUrl: '/images/men/black-jeans-2.png', color: 'black', soldOut: false, category: 'men', sku: '72839-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 5, name: 'LAC MEN SLIM FIT LIGHT BLUE JEANS', price: 25.55, imageUrl: '/images/men/light-blue-jeans-2.png', color: 'light-blue', soldOut: false, category: 'men', sku: '72840-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 6, name: 'LAC MEN SLIM FIT CHARCOAL JEANS', price: 24.59, imageUrl: '/images/men/charcoal-jeans-2.png', color: 'charcoal', soldOut: false, category: 'men', sku: '72841-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 7, name: 'LAC MEN SLIM FIT BLACK JEANS', price: 22.05, imageUrl: '/images/men/black-jeans-3.png', color: 'black', soldOut: true, category: 'men', sku: '72842-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 8, name: 'LAC MEN SLIM FIT LIGHT BLUE JEANS', price: 26.05, imageUrl: '/images/men/light-blue-jeans-3.png', color: 'light-blue', soldOut: false, category: 'men', sku: '72843-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' },
    { id: 9, name: 'LAC MEN SLIM FIT CHARCOAL JEANS', price: 25.09, imageUrl: '/images/men/charcoal-jeans-3.png', color: 'charcoal', soldOut: false, category: 'men', sku: '72844-31', description: 'Premium quality slim fit jeans crafted from comfortable stretch denim. Perfect for everyday wear with a modern, tailored silhouette.' }
  ])

  const allProducts = computed(() => [...menProducts.value, ...womenProducts.value])

  function getProductById(id: number): Product | undefined {
    return allProducts.value.find(p => p.id === id)
  }

  return {
    menProducts,
    womenProducts,
    allProducts,
    products: allProducts, // Alias for compatibility
    getProductById
  }
})
