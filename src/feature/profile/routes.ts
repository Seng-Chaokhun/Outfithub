import AccountView from './views/AccountView.vue'

export const profileRoutes = [
  { path: '/account/:id', name: 'Account', component: AccountView, props: true },
]
