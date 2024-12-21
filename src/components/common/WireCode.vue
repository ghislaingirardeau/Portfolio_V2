<template>
  <code class="text-grey-5">{{ content }}</code>
</template>

<script setup lang="ts">
defineProps({
  content: String,
})
</script>

<style scoped></style>
