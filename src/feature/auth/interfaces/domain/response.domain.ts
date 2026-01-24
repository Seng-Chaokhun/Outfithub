export interface ApiResponse<T = null> {
  success: boolean
  message: string
  package: T
}
