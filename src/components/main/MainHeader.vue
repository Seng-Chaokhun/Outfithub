<template>
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
</template>

<script setup lang="ts">
import router from '@/router/index.ts'
const navLinks = router.options.routes.filter((r) => r.meta?.nav)
</script>

<style scoped></style>
