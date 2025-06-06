<template>
  <div>
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
import { useIsMobileLandscape, useIsMobileTall, useIsMobile } from 'src/utils/useDeviceInfo'
import { onMounted } from 'vue'
import { useStarSettings } from 'src/utils/useStarSettings'

interface PositionStars {
  randomY: number
  randomX: number
  randomYBis: number
  randomXBis: number
  mobileLeftEndX?: number
  mobileTopEndX?: number
  mobileEndY?: number
}

const starToLeft = useTemplateRefsList()
const starToTop = useTemplateRefsList()

const { height, width } = useWindowSize()
const { radientColorEnd, radientColorStart } = useStarSettings()

const $q = useQuasar()

const starNumber = useIsMobile() ? 20 : 80

const tl = gsap.timeline()

let starsMounted = false

onMounted(() => {
  setTimeout(() => {
    startAnim()
    starsMounted = true
  }, 400)
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

function generateStarsArbitraryEndPosition() {
  let randomY, randomX, randomYBis, randomXBis, mobileLeftEndX, mobileTopEndX, mobileEndY
  if (useIsMobile()) {
    randomY = -heightSize.value + 130 + getRandomArbitrary(0, heightSize.value - 120)
    randomX = -width.value + 97
    randomYBis = -heightSize.value + 75
    randomXBis = -width.value + 35 + getRandomArbitrary(0, width.value - 15)
    mobileLeftEndX = -width.value / 2 + 92
    mobileTopEndX = -width.value / 2 + 28
    mobileEndY = -heightSize.value + (useIsMobileTall() ? 350 : 300)
  } else {
    randomY = -height.value + 130 + getRandomArbitrary(0, height.value - 120)
    randomX = -width.value + 97
    randomYBis = -height.value + 75
    randomXBis = -width.value + 35 + getRandomArbitrary(250, width.value - 15)
  }
  return { randomY, randomX, randomYBis, randomXBis, mobileLeftEndX, mobileTopEndX, mobileEndY }
}

function keyframesDesktop(left: boolean, starsArbitraryEndPosition: PositionStars) {
  return {
    '0%': { x: 0, opacity: 0 },
    '10%': { x: 0, y: 10, opacity: 0.7 },
    '15%': { x: left ? -20 : 20, opacity: 1 },
    '50%': {
      backgroundImage: radientColorStart.value,
    },
    '55%': {
      backgroundImage: radientColorEnd.value,
      scale: 0.8,
      opacity: 0.8,
    },
    '95%': { opacity: 0.7 },
    '100%': {
      x: left ? starsArbitraryEndPosition.randomX : starsArbitraryEndPosition.randomXBis,
      y: left ? starsArbitraryEndPosition.randomY : starsArbitraryEndPosition.randomYBis,
      scale: 0.5,
      opacity: 0,
    },
  }
}

function keyframesMobile(left: boolean, starsArbitraryEndPosition: PositionStars) {
  return {
    '0%': { x: 0, opacity: 0 },
    '10%': { x: 0, y: 10, opacity: 0.7 },
    '15%': { x: left ? -20 : 20, opacity: 1 },
    '40%': {
      backgroundImage: radientColorStart.value,
    },

    '45%': {
      backgroundImage: radientColorEnd.value,
      opacity: 0.8,
      scale: 0.8,
    },
    '60%': {
      x: left ? starsArbitraryEndPosition.randomX : starsArbitraryEndPosition.randomXBis,
      y: left ? starsArbitraryEndPosition.randomY : starsArbitraryEndPosition.randomYBis,
    },
    '95%': { opacity: 0.7 },
    '100%': {
      x: left ? starsArbitraryEndPosition.mobileLeftEndX : starsArbitraryEndPosition.mobileTopEndX,
      y: starsArbitraryEndPosition.mobileEndY,
      scale: 0.5,
      opacity: 0,
    },
  }
}

function startAnim() {
  starToLeft.value.forEach((el, index) => {
    const starsArbitraryEndPosition = generateStarsArbitraryEndPosition() as PositionStars
    const starToTopElement = starToTop.value[index] as HTMLElement
    tl.to(
      el,

      {
        keyframes: useIsMobile()
          ? keyframesMobile(true, starsArbitraryEndPosition)
          : keyframesDesktop(true, starsArbitraryEndPosition),
        duration: getRandomArbitrary(15, 20),
      },
      getRandomArbitrary(0.4, 15),
    ).to(
      starToTopElement,
      {
        keyframes: useIsMobile()
          ? keyframesMobile(false, starsArbitraryEndPosition)
          : keyframesDesktop(false, starsArbitraryEndPosition),
        duration: getRandomArbitrary(10, 20),
      },
      getRandomArbitrary(0.4, 15),
    )
  })
  tl.call(() => {
    tl.repeat(-1)
  })
}

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
