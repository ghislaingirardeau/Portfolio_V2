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
import { useTemplateRefsList, useWindowSize } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { gsap } from 'src/boot/gsap'
import { computed, onMounted } from 'vue'

const starToLeft = useTemplateRefsList()
const starToTop = useTemplateRefsList()

const { height, width } = useWindowSize()

const $q = useQuasar()

const starNumber = 80

const tl = gsap.timeline()

onMounted(() => {
  setTimeout(() => {
    startAnim()
  }, 400)
})

// watch(
//   () => route,
//   (newValue) => {
//     console.log(tl.reversed())
//     if (tl.reversed()) {
//       tl.play()
//     } else {
//       tl.reverse()
//     }
//   },
//   { deep: true },
// )

const radientColorStart = computed(() => {
  return $q.dark.isActive
    ? `radial-gradient(
      hsl(27, 91%, 61%),
      hsl(11, 100%, 58%) 10%,
      hsla(180, 100%, 80%, 0) 40%
    )`
    : `radial-gradient(
      hsl(52, 98%, 53%),
      hsl(36, 100%, 58%) 10%,
      hsla(180, 100%, 80%, 0) 40%
    )`
})

const radientColorEnd = computed(() => {
  return $q.dark.isActive
    ? `radial-gradient(
      hsl(186, 89%, 86%),
      hsl(186, 89%, 86%) 10%,
      hsla(180, 100%, 80%, 0) 56%
    )`
    : `radial-gradient(
      hsl(191, 100%, 20%),
      hsl(191, 100%, 20%) 10%,
      hsla(180, 100%, 80%, 0) 40%
    )`
})

function startAnim() {
  starToLeft.value.forEach((el, index) => {
    const randomY = -height.value + 130 + getRandomArbitrary(0, height.value - 120)
    const randomX = -width.value + 97
    const randomYBis = -height.value + 75
    const randomXBis = -width.value + 35 + getRandomArbitrary(250, width.value - 15)
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
          '50%': {
            backgroundImage: radientColorStart.value,
          },

          '55%': {
            backgroundImage: radientColorEnd.value,
          },
          '100%': { x: randomX, y: randomY },
        },
        duration: getRandomArbitrary(10, 20),
        repeat: -1,
      },
      getRandomArbitrary(0.4, 15),
    ).to(
      starToTopElement,
      {
        keyframes: {
          scale: [1, 1.2, 2, 1.2, 1, 1.4, 1.2, 1.4, 1.2, 1],
          opacity: [0.8, 0.7, 1, 0.7, 1, 0.9, 0.7, 1, 0.7, 0],
          '0%': {
            x: 0,
          },
          '10%': { x: 0, y: 10 },
          '15%': { x: 20 },
          '50%': {
            backgroundImage: radientColorStart.value,
          },

          '55%': {
            backgroundImage: radientColorEnd.value,
          },
          '100%': { x: randomXBis, y: randomYBis },
        },
        duration: getRandomArbitrary(10, 20),
        repeat: -1,
      },
      getRandomArbitrary(0.4, 15),
    )
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
  background-image: radial-gradient(
    hsl(27, 91%, 61%),
    hsl(11, 100%, 58%) 10%,
    hsla(180, 100%, 80%, 0) 40%
  );
}

.star-dark {
  background-image: radial-gradient(
    hsl(27, 89%, 86%),
    hsl(57, 89%, 86%) 10%,
    hsla(180, 100%, 80%, 0) 56%
  );
}

.leg-left {
  right: 92px;
}

.leg-right {
  right: 28px;
}
</style>
