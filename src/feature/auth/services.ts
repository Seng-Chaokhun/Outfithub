import axios, { type AxiosResponse } from 'axios'
import * as I from '../../../shared/interfaces'

const API_URL = '/api/auth'
const SESSION_KEY = 'session'

// remote calls / api requests (RPC model)
export async function register(form: I.RegisterForm): Promise<I.ApiResponse> {
  return deliver<I.RegisterForm>(form)
}

export async function login(form: I.LoginForm): Promise<I.ApiResponse<I.Session | null>> {
  const response = await deliver<I.LoginForm, I.Session | null>(form)
  if (response.success) save(SESSION_KEY, response.payload)
  return response
}

export async function refreshToken(session: I.Session): Promise<I.ApiResponse<I.Session>> {
  return deliver<I.Session, I.Session>(session)
}

export async function changePassword(form: I.ChangePasswordForm): Promise<I.ApiResponse> {
  const session = loadSession()
  return deliver<I.ChangePasswordForm & { userId: string }>({
    ...form,
    userId: session?.userId || '',
  })
}

// local calls (LPC model)
export function logout(): void {
  localStorage.removeItem(SESSION_KEY)
}

// hybrid calls (LPC + occasional RPC)
export async function loadSessionAndValidate(): Promise<I.Session | null> {
  const session = loadSession()

  // edge case: loaded no session
  if (!session) return null
  // edge case: loaded expired session -> refresh
  if (isExpired(session)) return (await refreshToken(session)).payload
  // normal case: loaded valid session
  return session
}

// composables
async function deliver<TPayload, TPromise = null>(
  data: TPayload,
): Promise<I.ApiResponse<TPromise>> {
  const response: AxiosResponse<I.ApiResponse<TPromise>, I.ApiRequest<TPayload>> = await axios.post<
    I.ApiResponse<TPromise>
  >(API_URL, {
    action: deliver.name,
    data,
  })

  return response.data
}

function save<T = null>(name: string, data: T): void {
  localStorage.setItem(name, JSON.stringify(data))
}

function isExpired(session: I.Session): boolean {
  return Date.now() > new Date(session.expiresAt ?? 0).getTime()
}

/**
 * DON'T USE THIS. this is only a precursor for loadSessionAndValidate()
 * just to keep loading and validation separate.
 * use loadSessionAndValidate() instead.
 */
function loadSession(): I.Session | null {
  const session: I.Session | null = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  return session
}
