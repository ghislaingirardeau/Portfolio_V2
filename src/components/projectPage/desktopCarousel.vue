<template>
  <q-carousel
    swipeable
    animated
    v-model="slide"
    thumbnails
    transition-prev="jump-right"
    transition-next="jump-left"
    infinite
    class="px-2"
  >
    <q-carousel-slide
      v-for="(image, index) in projectImageUrl"
      :key="index"
      :name="index"
      :img-src="`/images/projectsPage/${image}`"
    />
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  projectImageUrl: {
    type: Array,
  },
})
const slide = ref(0)
</script>

<style scoped></style>
