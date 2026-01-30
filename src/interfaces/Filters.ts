export type Filters = {
  sizes: Record<string, boolean>
  productTypes: Record<string, boolean>
  priceMax: number
  availability: 'all' | 'inStock' | 'outOfStock'
}
