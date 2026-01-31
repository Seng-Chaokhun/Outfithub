import { pool } from './db.js';

/**
 * Fetch all users from the database (id, username, email, full_name, avatar_url, role, created_at)
 */
export async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, username, email, full_name, avatar_url, role, created_at, password_hash FROM users');
  return rows;
}
import bcrypt from 'bcryptjs'
import * as Users from './repository'
import * as I from '../shared/interfaces'

// Minimal auth service backed by MySQL

function makeSession(userId: string): I.Session {
  const oneHour = 60 * 60 * 1000
  return {
    userId: String(userId),
    accessToken: Math.random().toString(36).slice(2),
    refreshToken: Math.random().toString(36).slice(2),
    expiresAt: Date.now() + oneHour,
  }
}

function ok<T = null>(message: string, payload: T): I.ApiResponse<T> {
  return { success: true, message, payload: payload }
}

function error(message: string, code?: number): { body: I.ApiResponse; code?: number } {
  return { body: { success: false, message, payload: null }, ...(code && { code }) }
}

export function inferAction<T>(action: string, body: { action: string; data: T }) {
  let op = action
  if (!op || op === 'deliver') {
    if (typeof body?.username === 'string' && typeof body?.email === 'string') op = 'register'
    else if (typeof body?.currentPassword === 'string' && typeof body?.newPassword === 'string')
      op = 'changePassword'
    else if (typeof body?.userId === 'string' && typeof body?.refreshToken === 'string')
      op = 'refreshToken'
    else if (typeof body?.username === 'string' && typeof body?.password === 'string') op = 'login'
  }
  return op
}

export async function handle(op, body) {
  switch (op) {
    case 'register': {
      const { username, email, password, confirmPassword, name, avatar } = body || {}
      if (!username || !email || !password || !confirmPassword)
        return error('Missing registration fields')
      if (password !== confirmPassword) return error('Passwords do not match')
      if (await Users.isUsernameTaken(username)) return error('Username already exists', 409)
      if (await Users.isEmailTaken(email)) return error('Email already exists', 409)
      const passwordHash = await bcrypt.hash(password, 10)
      await Users.createUser({ username, email, passwordHash, fullName: name, avatar })
      return { body: ok('Registered successfully'), code: 201 }
    }
    case 'login': {
      const { username, password } = body || {}
      if (!username || !password) return error('Missing login fields')
      const user = await Users.findByUsername(username)
      if (!user) return error('Invalid credentials', 401)
      const match = await bcrypt.compare(password, user.password_hash)
      if (!match) return error('Invalid credentials', 401)
      const session = makeSession(user.id)
      return { body: ok('Login successful', session) }
    }
    case 'changePassword': {
      const { userId, currentPassword, newPassword } = body || {}
      if (!userId || !currentPassword || !newPassword) {
        return error('Missing password change fields')
      }
      const user = await Users.findById(Number(userId))
      if (!user) return error('User not found', 404)
      const match = await bcrypt.compare(currentPassword, user.password_hash)
      if (!match) return error('Current password is incorrect', 401)
      const passwordHash = await bcrypt.hash(newPassword, 10)
      await Users.updatePassword(Number(userId), passwordHash)
      return { body: ok('Password changed successfully') }
    }
    case 'refreshToken': {
      const { userId } = body || {}
      if (!userId) return error('Missing session fields')
      const user = await Users.findById(Number(userId))
      if (!user) return error('Invalid user', 404)
      const session = makeSession(user.id)
      return { body: ok('Token refreshed', session) }
    }
    default:
      return error('Unknown action')
  }
}

export default {
  inferAction,
  handle,
}
