<template>
  <div class="min-h-screen flex flex-col">
    <!-- header -->
    <MainHeader />

    <!-- Main -->
    <main class="flex-1 p-6 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from './components/main/MainHeader.vue'
</script>
