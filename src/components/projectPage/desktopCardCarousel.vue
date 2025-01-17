<template>
  <WireCode
    ref="imageSkeleton"
    content="&lt;img&gt;Image About me&lt;/img&gt;"
    class="flex flex-center w-full border-2 border-solid border-gray-300 bg-grey-3 absolute"
    :class="imageClass"
    :style="{ height: imageHeight }"
  />
  <q-carousel
    ref="carousel"
    animated
    v-model="slide"
    thumbnails
    transition-prev="jump-right"
    transition-next="jump-left"
    infinite
    class="opacity-0"
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
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import WireCode from '../common/WireCode.vue'
import { gsap } from 'src/boot/gsap'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'

const animationSettings = useAnimationSettings()
const { pageMounted } = storeToRefs(animationSettings)

const props = defineProps({
  projectImageUrl: {
    type: String,
  },
  typeDesktop: {
    type: Boolean,
  },
})

const tl = gsap.timeline({ delay: 2.5 })

const slide = ref(0)
const imageSkeleton = useTemplateRef('imageSkeleton')
const carousel = useTemplateRef('carousel')

const imageHeight = computed(() => {
  return props.typeDesktop ? '300px' : '450px'
})
const imageClass = computed(() => {
  return props.typeDesktop ? 'px-2' : 'px-10'
})
const imageStyle = computed(() => {
  return props.typeDesktop ? 'backgroundSize: 450px 240px' : 'backgroundSize: 240px 450px'
})

onMounted(() => {
  pageMounted.value = false

  animationImage()
})

function animationImage() {
  tl.to(imageSkeleton.value!.$el, {
    duration: 0.3,
    opacity: 0,
  }).to(carousel.value!.$el, {
    duration: 0.5,
    delay: 0.3,
    opacity: 1,
  })
  tl.call(() => {
    pageMounted.value = true
  })
}
</script>

<style scoped lang="scss">
.q-carousel__slide {
  border-radius: 10px;
}
</style>
