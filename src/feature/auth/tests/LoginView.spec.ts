import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '../views/LoginView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

describe('LoginView', () => {
  // test rendering
  it('renders', () => {
    const wrapper = mount(LoginView)
    expect(wrapper.exists()).toBe(true)
  })
  // test routing
  it('renders with router to /login', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/login', component: LoginView }],
    })
    router.push('/login')
    await router.isReady()

    const wrapper = mount(LoginView, {
      global: { plugins: [router] },
    })
    expect(wrapper.text()).toContain('Login')
  })
})
