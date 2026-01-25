#!/usr/bin/env node

/**
 * Simple Authentication API Test Script
 * Run this after starting the server: npm run server
 * Then run: node api-test.js
 */

import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'
const testUsername = `testuser_${Date.now()}`
const testEmail = `test_${Date.now()}@example.com`
const testPassword = 'TestPassword123!'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

async function test(name, fn) {
  try {
    console.log(`\n🧪 Testing: ${name}`)
    await fn()
    console.log(`✅ ${name} passed`)
  } catch (error) {
    console.error(`❌ ${name} failed:`, error.message)
    if (error.response?.data) {
      console.error('Response:', error.response.data)
    }
  }
}

async function runTests() {
  console.log('🚀 Starting Authentication API Tests')
  console.log(`📍 API URL: ${API_URL}`)

  // Test 1: Server connectivity
  await test('Server is running', async () => {
    const response = await api.get('/')
    if (response.data !== 'auth route connected') {
      throw new Error('Unexpected response from server')
    }
  })

  // Test 2: Register new user
  let session = null
  await test('Register new user', async () => {
    const response = await api.post('/', {
      action: 'register',
      data: {
        username: testUsername,
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      },
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
  })

  // Test 3: Register with duplicate username
  await test('Reject duplicate username', async () => {
    try {
      const response = await api.post('/', {
        action: 'register',
        data: {
          username: testUsername,
          email: `another_${Date.now()}@example.com`,
          password: testPassword,
          confirmPassword: testPassword,
        },
      })
      if (response.status === 200) {
        throw new Error('Should have rejected duplicate username')
      }
    } catch (error) {
      if (error.response?.status === 409) {
        // Expected
        return
      }
      throw error
    }
  })

  // Test 4: Register with mismatched passwords
  await test('Reject mismatched passwords', async () => {
    try {
      const response = await api.post('/', {
        action: 'register',
        data: {
          username: `another_${Date.now()}`,
          email: `another_${Date.now()}@example.com`,
          password: testPassword,
          confirmPassword: 'DifferentPassword123!',
        },
      })
      if (response.data.success) {
        throw new Error('Should have rejected mismatched passwords')
      }
    } catch (error) {
      if (error.response?.data?.message.includes('do not match')) {
        // Expected
        return
      }
      throw error
    }
  })

  // Test 5: Login with correct credentials
  await test('Login with correct credentials', async () => {
    const response = await api.post('/', {
      action: 'login',
      data: {
        username: testUsername,
        password: testPassword,
      },
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    session = response.data.payload
    if (!session?.userId || !session?.accessToken || !session?.refreshToken) {
      throw new Error('Invalid session payload')
    }
  })

  // Test 6: Login with incorrect password
  await test('Reject incorrect password', async () => {
    try {
      const response = await api.post('/', {
        action: 'login',
        data: {
          username: testUsername,
          password: 'WrongPassword123!',
        },
      })
      if (response.data.success) {
        throw new Error('Should have rejected wrong password')
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Expected
        return
      }
      throw error
    }
  })

  // Test 7: Login with non-existent user
  await test('Reject non-existent user', async () => {
    try {
      const response = await api.post('/', {
        action: 'login',
        data: {
          username: 'nonexistent_user',
          password: testPassword,
        },
      })
      if (response.data.success) {
        throw new Error('Should have rejected non-existent user')
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Expected
        return
      }
      throw error
    }
  })

  // Test 8: Refresh token
  if (session) {
    await test('Refresh token', async () => {
      const response = await api.post('/', {
        action: 'refreshToken',
        data: {
          userId: session.userId,
          refreshToken: session.refreshToken,
        },
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const newSession = response.data.payload
      if (!newSession?.userId || !newSession?.accessToken) {
        throw new Error('Invalid refreshed session')
      }
    })
  }

  console.log('\n✨ All tests completed!')
}

runTests().catch((error) => {
  console.error('Test suite failed:', error)
  process.exit(1)
})
