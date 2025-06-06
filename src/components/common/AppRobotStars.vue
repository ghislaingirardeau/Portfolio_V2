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
import { computed, onUpdated } from 'vue'
import { useTemplateRefsList, useWindowSize } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { gsap } from 'src/boot/gsap'
import { useIsMobileLandscape, useIsMobileTall } from 'src/utils/useDeviceInfo'
import { onMounted } from 'vue'
import { useStarSettings } from 'src/utils/useStarSettings'

const starToLeft = useTemplateRefsList()
const starToTop = useTemplateRefsList()

const { height, width } = useWindowSize()
const { radientColorEnd, radientColorStart } = useStarSettings()

const $q = useQuasar()

const starNumber = 20

const tl = gsap.timeline()

let starsMounted = false

onMounted(() => {
  setTimeout(() => {
    startAnim()
    starsMounted = true
  }, 4000)
})

/* Dark mode toogle - if the component is mounted, change stars colors */
onUpdated(() => {
  if (starsMounted) {
    tl.clear()
    startAnim()
  }
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
          '0%': { x: 0, opacity: 0 },
          '10%': { x: 0, y: 10, opacity: 0.7 },
          '15%': { x: -20, opacity: 1 },
          '40%': {
            backgroundImage: radientColorStart.value,
          },

          '45%': {
            backgroundImage: radientColorEnd.value,
            opacity: 0.8,
            scale: 0.8,
          },
          '60%': { x: randomX, y: randomY },
          '95%': { opacity: 0.7 },
          '100%': {
            x: -width.value / 2 + 92,
            y: -heightSize.value + (useIsMobileTall() ? 350 : 300),
            scale: 0.5,
            opacity: 0,
          },
        },
        duration: getRandomArbitrary(15, 20),
      },
      getRandomArbitrary(0.4, 10),
    ).to(
      starToTopElement,
      {
        keyframes: {
          '0%': { x: 0, opacity: 0 },
          '10%': { x: 0, y: 10, opacity: 0.7 },
          '15%': { x: 20, opacity: 1 },
          '40%': {
            backgroundImage: radientColorStart.value,
          },

          '45%': {
            backgroundImage: radientColorEnd.value,
            scale: 0.8,
            opacity: 0.8,
          },
          '60%': { x: randomXBis, y: randomYBis },
          '95%': { opacity: 0.5 },
          '100%': {
            x: -width.value / 2 + 28,
            y: -heightSize.value + (useIsMobileTall() ? 350 : 300),
            scale: 0.5,
            opacity: 0,
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
  width: 6px;
  height: 6px;
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
