const AdminProfilePage = () => import('@/pages/admin/AdminProfilePage.vue')
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/feature/auth/routes'
import { profileRoutes } from '@/feature/profile/routes'
import { useAuthStore } from '@/feature/auth/store'

// Admin pages
const DashboardPage = () => import('@/pages/admin/DashboardPage.vue')
const NotificationPage = () => import('@/pages/admin/NotificationPage.vue')
const ProductManagement = () => import('@/pages/admin/ProductManagement.vue')
const StockManagement = () => import('@/pages/admin/StockManagement.vue')
const StockPage = () => import('@/pages/admin/StockPage.vue')
const UserTablePage = () => import('@/pages/admin/UserTablePage.vue')

const ProductSalePage = () => import('@/pages/admin/ProductSalePage.vue')

// User pages
const menCollection = () => import('@/pages/user/MenCollection.vue')
const WomenCollection = () => import('@/pages/user/WomenCollection.vue')
const AccessoriesCollection = () => import('@/pages/user/AccessoriesCollection.vue')
const menTops = () => import('@/pages/user/MenTops.vue')
const menBottoms = () => import('@/pages/user/MenBottoms.vue')
const WomenTops = () => import('@/pages/user/WomenTops.vue')
const WomenBottoms = () => import('@/pages/user/WomenBottoms.vue')
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
    path: '/collection/men',
    name: "Men's Collection",
    component: menCollection,
    meta: { nav: true },
  },
  {
    path: '/collection/women',
    name: "Women's Collection",
    component: WomenCollection,
    meta: { nav: true },
  },
  {
    path: '/collection/accessories',
    name: 'Accessories',
    component: AccessoriesCollection,
    meta: { nav: true },
  },
  {
    path: '/collection/men/tops',
    name: "Men's Tops",
    component: menTops,
  },
  {
    path: '/collection/men/bottoms',
    name: "Men's Bottoms",
    component: menBottoms,
  },
  {
    path: '/collection/women/tops',
    name: "Women's Tops",
    component: WomenTops,
  },
  {
    path: '/collection/women/bottoms',
    name: "Women's Bottoms",
    component: WomenBottoms,
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
    meta: { requiresAuth: true },
  },

  // Admin routes
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { nav: true },
  },
  {
    path: '/admin/products',
    name: 'ProductManagement',
    component: ProductManagement,
  },
  {
    path: '/admin/stock',
    name: 'StockPage',
    component: StockPage,
    meta: { nav: true },
  },

  {
    path: '/admin/users',
    name: 'UserTable',
    component: UserTablePage,
    meta: { nav: true },
  },

  {
    path: '/admin/table',
    name: 'AdminProfile',
    component: AdminProfilePage,
    meta: { nav: true },
  },
  {
    path: '/admin/sale',
    name: 'ProductSale',
    component: ProductSalePage,
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

// authentication guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.name === 'Account') {
    // Profile route protection
    if (!authStore.isAuthenticated) {
      next('/')
    } else if (to.params.id !== authStore.session?.userId) {
      // Redirect to own profile if trying to view someone else's
      next({ name: 'Account', params: { id: authStore.session?.userId } })
    } else {
      next()
    }
  } else {
    next()
  }
})

// title feature
router.afterEach((to) => {
  document.title = (to.meta.title as string) ?? (to.name as string) + ' | Outfithub'
})

export default router
