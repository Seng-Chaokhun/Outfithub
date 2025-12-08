<template>
  <div class="sign">
    <h1>Product Detail - {{ id }}</h1>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ id: string }>()
const id = props.id
</script>

<style scoped></style>
