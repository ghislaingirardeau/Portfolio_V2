<template>
  <div>
    <div
      v-for="index in starNumber"
      :key="index"
      class="star leg-left"
      :class="{ 'star-dark': $q.dark.mode }"
      ref="starFromLeftLeg"
    ></div>
    <div
      v-for="index in starNumber"
      :key="index"
      class="star leg-right"
      :class="{ 'star-dark': $q.dark.mode }"
      ref="starFromRightLeg"
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
  randomLeftEdgeAxisY: number
  randomLeftEdgeAxisX: number
  randomRightEdgeAxisY: number
  randomRightEdgeAxisX: number
  mobileLeftEndX?: number
  mobileRightEndX?: number
  mobileEndY?: number
}

const starFromLeftLeg = useTemplateRefsList()
const starFromRightLeg = useTemplateRefsList()

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
  let randomLeftEdgeAxisY, // robot star from left leg
    randomLeftEdgeAxisX, // robot star from left leg
    randomRightEdgeAxisY, // robot star from right leg
    randomRightEdgeAxisX, // robot star from right leg
    mobileLeftEndX,
    mobileRightEndX,
    mobileEndY
  if (useIsMobile()) {
    randomLeftEdgeAxisY = -heightSize.value + 130 + getRandomArbitrary(0, heightSize.value - 120)
    randomLeftEdgeAxisX = -width.value + 97
    randomRightEdgeAxisY = -heightSize.value + 75
    randomRightEdgeAxisX = -width.value + 35 + getRandomArbitrary(0, width.value - 15)
    mobileLeftEndX = -width.value / 2 + 92 // will move the star  to the center of the screen
    mobileRightEndX = -width.value / 2 + 28 // will move the star  to the center of the screen
    mobileEndY = -heightSize.value + (useIsMobileTall() ? 350 : 300) // will move the star  to the center of the screen
  } else {
    randomLeftEdgeAxisY = -height.value + 130 + getRandomArbitrary(0, height.value - 120)
    randomLeftEdgeAxisX = -width.value + 97
    randomRightEdgeAxisY = -height.value + 75
    randomRightEdgeAxisX = -width.value + 35 + getRandomArbitrary(250, width.value - 15)
  }
  return {
    randomLeftEdgeAxisY,
    randomLeftEdgeAxisX,
    randomRightEdgeAxisY,
    randomRightEdgeAxisX,
    mobileLeftEndX,
    mobileRightEndX,
    mobileEndY,
  }
}

function keyframes(left: boolean, starsArbitraryEndPosition: PositionStars, mobile: boolean) {
  const target = {
    '0%': { x: 0, opacity: 0 },
    '10%': { x: 0, y: 10, opacity: 0.7 },
    '15%': { x: left ? -20 : 20, opacity: 1 },
    '95%': { opacity: 0.7 },
  }

  // If mobile or desktop, the keyframes are different, so add different key/value to to target
  Object.assign(
    target,
    mobile
      ? {
          '40%': {
            backgroundImage: radientColorStart.value,
          },

          '45%': {
            backgroundImage: radientColorEnd.value,
            opacity: 0.8,
            scale: 0.8,
          },
          '60%': {
            x: left
              ? starsArbitraryEndPosition.randomLeftEdgeAxisX
              : starsArbitraryEndPosition.randomRightEdgeAxisX,
            y: left
              ? starsArbitraryEndPosition.randomLeftEdgeAxisY
              : starsArbitraryEndPosition.randomRightEdgeAxisY,
          },
          '100%': {
            x: left
              ? starsArbitraryEndPosition.mobileLeftEndX
              : starsArbitraryEndPosition.mobileRightEndX,
            y: starsArbitraryEndPosition.mobileEndY,
            scale: 0.5,
            opacity: 0,
          },
        }
      : {
          '50%': {
            backgroundImage: radientColorStart.value,
          },
          '55%': {
            backgroundImage: radientColorEnd.value,
            scale: 0.8,
            opacity: 0.8,
          },
          '100%': {
            x: left
              ? starsArbitraryEndPosition.randomLeftEdgeAxisX
              : starsArbitraryEndPosition.randomRightEdgeAxisX,
            y: left
              ? starsArbitraryEndPosition.randomLeftEdgeAxisY
              : starsArbitraryEndPosition.randomRightEdgeAxisY,
            scale: 0.5,
            opacity: 0,
          },
        },
  )

  return target
}

function startAnim() {
  starFromLeftLeg.value.forEach((el, index) => {
    const starsArbitraryEndPosition = generateStarsArbitraryEndPosition() as PositionStars
    const starFromRightLegElement = starFromRightLeg.value[index] as HTMLElement
    tl.to(
      el,

      {
        keyframes: useIsMobile()
          ? keyframes(true, starsArbitraryEndPosition, true)
          : keyframes(true, starsArbitraryEndPosition, false),
        duration: getRandomArbitrary(15, 20),
      },
      getRandomArbitrary(0.4, 15),
    ).to(
      starFromRightLegElement,
      {
        keyframes: useIsMobile()
          ? keyframes(false, starsArbitraryEndPosition, true)
          : keyframes(false, starsArbitraryEndPosition, false),
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
