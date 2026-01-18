import type { LoginRequest, RegisterRequest } from '../interfaces/domain/requests.domain'
import type { LoginResponse } from '../interfaces/domain/responses.domain'
import type { UserSession } from '../interfaces/domain/session.domain'
import * as sessionService from './session.service'
import axios from 'axios'

const API_URL = '/api/auth'

export async function login(data: LoginRequest): Promise<UserSession> {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, data)
  return sessionService.createSession(response.data)
}

export async function register(data: RegisterRequest): Promise<void> {
  await axios.post(`${API_URL}/register`, data)
}

export function logout(): void {
  sessionService.clearSession()
}
