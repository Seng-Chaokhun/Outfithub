// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// Admin pages
const DashboardPage = () => import('@/pages/admin/DashboardPage.vue')
const NotificationPage = () => import('@/pages/admin/NotificationPage.vue')
const ProductManagement = () => import('@/pages/admin/ProductManagement.vue')
const StockManagement = () => import('@/pages/admin/StockManagement.vue')

// Auth pages
const LoginPage = () => import('@/pages/auth/LoginPage.vue')
const RegisterPage = () => import('@/pages/auth/RegisterPage.vue')
const ForgotPasswordPage = () => import('@/pages/auth/ForgotPasswordPage.vue')

// User pages
const MensCollection = () => import('@/pages/user/MensCollection.vue')
const WomensCollection = () => import('@/pages/user/WomensCollection.vue')
const ProductDetailPage = () => import('@/pages/user/ProductDetailPage.vue')
const SearchPage = () => import('@/pages/user/SearchPage.vue')
const AccountPage = () => import('@/pages/user/AccountPage.vue')

// Landing page
const LandingPage = () => import('@/pages/LandingPage.vue')

// Other pages
const ErrorPage = () => import('@/pages/other/ErrorPage.vue')

const routes = [
  // Landing page
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },

  // User routes
  {
    path: '/collection/mens',
    name: "Men's Collection",
    component: MensCollection,
    meta: { nav: true },
  },
  {
    path: '/collection/womens',
    name: "Women's Collection",
    component: WomensCollection,
    meta: { nav: true },
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    props: true,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
  {
    path: '/account/:id',
    name: 'Account',
    component: AccountPage,
    props: true,
  },

  // Auth routes
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginPage,
    meta: { nav: true },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: RegisterPage,
    meta: { nav: true },
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage,
  },

  // Admin routes
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { nav: true },
  },
  {
    path: '/admin/notifications',
    name: 'Notifications',
    component: NotificationPage,
  },
  {
    path: '/admin/products',
    name: 'ProductManagement',
    component: ProductManagement,
  },
  {
    path: '/admin/stock',
    name: 'StockManagement',
    component: StockManagement,
  },

  // Other pages
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: ErrorPage,
    props: { code: 404, title: 'Oops!', message: 'This page could not be found.' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
