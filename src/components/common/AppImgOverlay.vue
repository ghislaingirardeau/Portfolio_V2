<template>
  <div ref="imageOverlay" class="w-full h-full bg-gray-5 opacity-0 flex flex-center">
    <q-icon
      v-if="tap"
      ref="imageOverlayIcon"
      :name="mdiGestureTap"
      :color="chatBg"
      size="xl"
      class=""
    ></q-icon>
    <q-icon
      v-else
      ref="imageOverlayIcon"
      :name="mdiGestureSwipe"
      :color="chatBg"
      size="xl"
      class=""
    ></q-icon>
  </div>
</template>

<script setup lang="ts">
import { mdiGestureSwipe, mdiGestureTap } from '@quasar/extras/mdi-v7'
import { computed, onMounted, ref } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useQuasar } from 'quasar'

const animationSettings = useAnimationSettings()
const $q = useQuasar()

const props = defineProps({
  tap: {
    type: Boolean,
    default: false,
  },
})

const imageOverlay = ref()
const imageOverlayIcon = ref()

const tl = gsap.timeline()

const chatBg = computed(() => {
  return $q.dark.mode ? 'white' : 'primary'
})

onMounted(() => {
  if (props.tap) {
    tapAnimation()
  } else {
    swipeAnimation()
  }
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
}

function swipeAnimation() {
  tl.to(imageOverlay.value, {
    duration: 0.3,
    opacity: 0.9,
  })
    .to(imageOverlayIcon.value.$el, {
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
      onComplete() {
        animationSettings.resetRobotAction()
      },
    })
    .to(imageOverlay.value, {
      duration: 0.5,
      opacity: 0,
    })
}
</script>

<style scoped></style>
