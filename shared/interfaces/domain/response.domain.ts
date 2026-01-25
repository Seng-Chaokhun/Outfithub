export interface ApiResponse<T = null> {
  success: boolean
  message: string
  payload: T
}
