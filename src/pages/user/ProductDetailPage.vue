<template>
  <div class="product-detail-page">
    <h1>Product Detail - {{ id }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{ id: string }>();
const id = props.id;
</script>

<style scoped>
.product-detail-page { text-align: center; padding: 50px; }
</style>
