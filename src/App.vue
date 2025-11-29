<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-100 border-b border-gray-300 px-6 py-4">
      <nav class="flex items-center justify-between">
        <div class="text-xl font-bold text-green-600">Outfithub</div>
        <ul class="flex space-x-4">
          <li v-for="link in navLinks" :key="link.name">
            <router-link
              :to="link.path"
              class="text-gray-700 hover:text-green-600 font-medium"
              active-class="text-green-700"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main -->
    <main class="flex-1 p-6 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
const navLinks = [
  { name: 'Landing', path: '/' },
  { name: 'Home', path: '/home' },
  { name: "Men's", path: '/collection/mens' },
  { name: "Women's", path: '/collection/womens' },
  { name: 'Search', path: '/search' },
  { name: 'Login', path: '/auth/login' },
  { name: 'Register', path: '/auth/register' },
  { name: 'Admin', path: '/admin/dashboard' },
];
</script>
