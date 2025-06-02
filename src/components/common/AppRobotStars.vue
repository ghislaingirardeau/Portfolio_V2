<template>
  <div>
    <!-- <q-btn color="primary" class="z-20" @click="startAnim">Start</q-btn>
    <q-btn color="primary" class="z-20" @click="stopAnim">Stop</q-btn>
    <q-btn color="primary" class="z-20" @click="reverseAnim">reverse</q-btn>
    <q-btn color="primary" class="z-20" @click="resumeAnim">resume</q-btn> -->

    <div
      v-for="index in starNumber"
      :key="index"
      class="star leg-left"
      :class="{ 'star-dark': $q.dark.mode }"
      ref="starToLeft"
    ></div>
    <div
      v-for="index in starNumber"
      :key="index"
      class="star leg-right"
      :class="{ 'star-dark': $q.dark.mode }"
      ref="starToTop"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTemplateRefsList, useWindowSize } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { gsap } from 'src/boot/gsap'
import { useIsMobileLandscape, useIsMobileTall } from 'src/utils/useDeviceInfo'
import { onMounted } from 'vue'

const starToLeft = useTemplateRefsList()
const starToTop = useTemplateRefsList()

const { height, width } = useWindowSize()

const $q = useQuasar()

const starNumber = 20

const tl = gsap.timeline()

onMounted(() => {
  setTimeout(() => {
    startAnim()
  }, 4000)
})

const heightSize = computed(() => {
  // si mobile + lanscape: height de la page est défini en css à 670px + 100px to add pour header et footer
  return useIsMobileLandscape.value ? 770 : height.value
})

function startAnim() {
  starToLeft.value.forEach((el, index) => {
    const randomY = -heightSize.value + 130 + getRandomArbitrary(0, heightSize.value - 120)
    const randomX = -width.value + 97
    const randomYBis = -heightSize.value + 75
    const randomXBis = -width.value + 35 + getRandomArbitrary(0, width.value - 15)
    const starToTopElement = starToTop.value[index] as HTMLElement
    tl.to(
      el,

      {
        keyframes: {
          scale: [1, 1.2, 2, 1.2, 1, 1.4, 1.2, 1.4, 1.2, 1],
          opacity: [0.8, 0.7, 1, 0.7, 1, 0.9, 0.7, 1, 0.7, 0],
          '0%': { x: 0 },
          '10%': { x: 0, y: 10 },
          '15%': { x: -20 },
          '60%': { x: randomX, y: randomY },
          '100%': {
            x: -width.value / 2 + 92,
            y: -heightSize.value + (useIsMobileTall() ? 350 : 300),
          },
        },
        duration: getRandomArbitrary(15, 20),
      },
      getRandomArbitrary(0.4, 10),
    ).to(
      starToTopElement,
      {
        keyframes: {
          scale: [1, 1.2, 2, 1.2, 1, 1.4, 1.2, 1.4, 1.2, 1],
          opacity: [0.8, 0.7, 1, 0.7, 1, 0.9, 0.7, 1, 0.7, 0],
          '0%': { x: 0 },
          '10%': { x: 0, y: 10 },
          '15%': { x: 20 },
          '60%': { x: randomXBis, y: randomYBis },
          '100%': {
            x: -width.value / 2 + 28,
            y: -heightSize.value + (useIsMobileTall() ? 350 : 300),
          },
        },
        duration: getRandomArbitrary(15, 20),
      },
      getRandomArbitrary(0.4, 10),
    )
  })
  tl.call(() => {
    tl.repeat(-1)
  })
}

// function stopAnim() {
//   tl.pause()
// }
// function reverseAnim() {
//   tl.reverse()
// }

// function resumeAnim() {
//   tl.play()
// }

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}
</script>

<style scoped lang="scss">
.star {
  display: block;
  position: absolute;
  width: 4px;
  height: 4px;
  bottom: 65px;
  opacity: 0;
  background: radial-gradient(hsl(6, 94%, 35%), hsl(10, 89%, 55%) 10%, hsla(180, 100%, 80%, 0) 56%);
}

.star-dark {
  background: radial-gradient(hsl(6, 79%, 66%), hsl(10, 92%, 67%) 10%, hsla(180, 100%, 80%, 0) 56%);
}

.leg-left {
  right: 92px;
}

.leg-right {
  right: 28px;
}
</style>
