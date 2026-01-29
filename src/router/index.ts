// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/feature/auth/routes'
import { profileRoutes } from '@/feature/profile/routes'

// Admin pages
const DashboardPage = () => import('@/pages/admin/DashboardPage.vue')
const NotificationPage = () => import('@/pages/admin/NotificationPage.vue')
const ProductManagement = () => import('@/pages/admin/ProductManagement.vue')
const StockManagement = () => import('@/pages/admin/StockManagement.vue')
const UserTablePage = () => import('@/pages/admin/UserTablePage.vue')

// Auth pages
// const LoginPage = () => import('@/pages/auth/LoginPage.vue')
// const RegisterPage = () => import('@/pages/auth/RegisterPage.vue')
// const ForgotPasswordPage = () => import('@/pages/auth/ForgotPasswordPage.vue')

// User pages
const MensCollection = () => import('@/pages/user/MensCollection.vue')
const WomensCollection = () => import('@/pages/user/WomensCollection.vue')
const AccessoriesCollection = () => import('@/pages/user/AccessoriesCollection.vue')
const MensTops = () => import('@/pages/user/MensTops.vue')
const MensBottoms = () => import('@/pages/user/MensBottoms.vue')
const WomensTops = () => import('@/pages/user/WomensTops.vue')
const WomensBottoms = () => import('@/pages/user/WomensBottoms.vue')
const AllSale = () => import('@/pages/user/AllSale.vue')
const ProductDetailPage = () => import('@/pages/user/ProductDetailPage.vue')
const SearchPage = () => import('@/pages/user/SearchPage.vue')
const CheckoutPage = () => import('@/pages/user/CheckoutPage.vue')

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
    path: '/collection/accessories',
    name: 'Accessories',
    component: AccessoriesCollection,
    meta: { nav: true },
  },
  {
    path: '/collection/mens/tops',
    name: "Men's Tops",
    component: MensTops,
  },
  {
    path: '/collection/mens/bottoms',
    name: "Men's Bottoms",
    component: MensBottoms,
  },
  {
    path: '/collection/womens/tops',
    name: "Women's Tops",
    component: WomensTops,
  },
  {
    path: '/collection/womens/bottoms',
    name: "Women's Bottoms",
    component: WomensBottoms,
  },
  {
    path: '/sale',
    name: 'All Sale',
    component: AllSale,
  },
  {
    path: '/product/:id',
    name: 'Product Detail',
    component: ProductDetailPage,
    props: true,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
  },
  // Auth routes
  // {
  //   path: '/auth/login',
  //   name: 'Login',
  //   component: LoginPage,
  //   meta: { nav: true },
  // },
  // {
  //   path: '/auth/register',
  //   name: 'Register',
  //   component: RegisterPage,
  //   meta: { nav: true },
  // },
  // {
  //   path: '/auth/forgot-password',
  //   name: 'ForgotPassword',
  //   component: ForgotPasswordPage,
  // },

  // Admin routes
  {
    path: '/admin',
    name: 'AdminPanel',
    component: DashboardPage,
    meta: { nav: true },
  },
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
  {
    path: '/admin/users',
    name: 'UserTable',
    component: UserTablePage,
    meta: { nav: true },
  },

  // Other pages
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: ErrorPage,
    props: { code: 404, title: 'Oops!', message: 'This page could not be found.' },
    meta: {
      title: 'Error - 404',
    },
  },

  // modular routes
  ...authRoutes,
  ...profileRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// title feature
router.afterEach((to) => {
  document.title = (to.meta.title as string) ?? (to.name as string) + ' | Outfithub'
})

export default router
