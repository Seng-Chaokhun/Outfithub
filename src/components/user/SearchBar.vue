<template>
  <div class="flex relative">
    <input
      class="h-fit px-10 py-2 rounded-full w-72 focus:outline-0 ring ring-gray-300 text-gray-700"
      type="text"
      id="search"
      placeholder="search"
      autocomplete="off"
    />
    <Search class="absolute left-2 top-2 text-gray-400" />
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
</script>

<style scoped></style>
