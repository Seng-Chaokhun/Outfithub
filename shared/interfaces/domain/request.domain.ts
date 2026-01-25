export interface ApiRequest<T = null> {
  action: string
  payload: T
}
