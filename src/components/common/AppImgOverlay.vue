<template>
  <div ref="imageOverlay" class="w-full h-full bg-gray-5 opacity-90 flex flex-center">
    <q-icon
      ref="imageOverlayIcon"
      :name="mdiGestureSwipe"
      color="primary"
      size="xl"
      class=""
    ></q-icon>
  </div>
</template>

<script setup lang="ts">
import { mdiGestureSwipe } from '@quasar/extras/mdi-v7'
import { onMounted, ref } from 'vue'
import { gsap } from 'src/boot/gsap'

const imageOverlay = ref()
const imageOverlayIcon = ref()

const tl = gsap.timeline({ delay: 1.3 })

onMounted(() => {
  tl.to(imageOverlayIcon.value.$el, {
    duration: 0.3,
    rotate: 25,
    x: 15,
  })
    .to(imageOverlayIcon.value.$el, {
      duration: 0.3,
      rotate: -25,
      x: -15,
    })
    .to(imageOverlayIcon.value.$el, {
      duration: 0.3,
      rotate: 0,
      x: 0,
    })
    .to(imageOverlay.value, {
      duration: 1,
      opacity: 0,
    })
})
</script>

<style scoped></style>
