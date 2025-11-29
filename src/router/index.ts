// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// Admin pages
const DashboardPage = () => import('@/pages/admin/DashboardPage.vue');
const NotificationPage = () => import('@/pages/admin/NotificationPage.vue');
const ProductManagement = () => import('@/pages/admin/ProductManagement.vue');
const StockManagement = () => import('@/pages/admin/StockManagement.vue');

// Auth pages
const LoginPage = () => import('@/pages/auth/LoginPage.vue');
const RegisterPage = () => import('@/pages/auth/RegisterPage.vue');
const ForgotPasswordPage = () => import('@/pages/auth/ForgotPasswordPage.vue');

// User pages
const HomePage = () => import('@/pages/user/HomePage.vue');
const MensCollection = () => import('@/pages/user/MensCollection.vue');
const WomensCollection = () => import('@/pages/user/WomensCollection.vue');
const ProductDetailPage = () => import('@/pages/user/ProductDetailPage.vue');
const SearchPage = () => import('@/pages/user/SearchPage.vue');

// Landing page
const LandingPage = () => import('@/pages/LandingPage.vue');

const routes = [
  // Landing page
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },

  // Auth routes
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage,
  },

  // User routes
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/collection/mens',
    name: 'MensCollection',
    component: MensCollection,
  },
  {
    path: '/collection/womens',
    name: 'WomensCollection',
    component: WomensCollection,
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

  // Admin routes
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
