<template>
  <q-carousel
    swipeable
    animated
    v-model="slide"
    thumbnails
    transition-prev="jump-right"
    transition-next="jump-left"
    infinite
    :height="imageHeight"
    :class="imageClass"
    :style="imageStyle"
  >
    <q-carousel-slide
      v-for="(image, index) in props.projectImageUrl"
      :key="index"
      :name="index"
      :img-src="`/images/projectsPage/${image}`"
    />
  </q-carousel>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  projectImageUrl: {
    type: Array,
  },
  typeDesktop: {
    type: Boolean,
  },
})
const slide = ref(0)

const imageHeight = computed(() => {
  return props.typeDesktop ? '300px' : '450px'
})
const imageClass = computed(() => {
  return props.typeDesktop ? 'px-2' : 'px-10'
})
const imageStyle = computed(() => {
  return props.typeDesktop ? 'backgroundSize: 450px 240px' : 'backgroundSize: 240px 450px'
})
</script>

<style scoped lang="scss">
.q-carousel__slide {
  border-radius: 10px;
}
</style>
