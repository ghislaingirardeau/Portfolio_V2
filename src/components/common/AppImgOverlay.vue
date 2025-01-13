<template>
  <div ref="imageOverlay" class="w-full h-full bg-gray-5 opacity-0 flex flex-center">
    <q-icon
      v-if="tap"
      ref="imageOverlayIcon"
      :name="mdiGestureTap"
      color="primary"
      size="xl"
      class=""
    ></q-icon>
    <q-icon
      v-else
      ref="imageOverlayIcon"
      :name="mdiGestureSwipe"
      color="primary"
      size="xl"
      class=""
    ></q-icon>
  </div>
</template>

<script setup lang="ts">
import { mdiGestureSwipe, mdiGestureTap } from '@quasar/extras/mdi-v7'
import { onMounted, ref } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'

const animationSettings = useAnimationSettings()
const { pageMounted, isRobotProcessing } = storeToRefs(animationSettings)

const props = defineProps({
  tap: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 1.3,
  },
})

const imageOverlay = ref()
const imageOverlayIcon = ref()

const tl = gsap.timeline({ delay: props.delay })

onMounted(() => {
  props.tap ? tapAnimation() : swipeAnimation()
})

function tapAnimation() {
  tl.to(imageOverlay.value, {
    duration: 0.3,
    opacity: 0.9,
  })
    .to(imageOverlayIcon.value.$el, {
      duration: 0.3,
      y: -10,
      rotateX: 30,
      scale: 0.9,
    })
    .to(imageOverlayIcon.value.$el, {
      duration: 0.3,
      y: 0,
      rotateX: 0,
      scale: 1,
      onComplete() {
        animationSettings.resetRobotAction()
      },
    })
    .to(imageOverlay.value, {
      duration: 0.5,
      opacity: 0,
    })
  tl.call(() => {
    pageMounted.value = true
  })
}

function swipeAnimation() {
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
  tl.call(() => {
    pageMounted.value = true
    animationSettings.resetRobotAction()
  })
}
</script>

<style scoped></style>
