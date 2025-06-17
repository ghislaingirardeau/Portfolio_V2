<template>
  <div
    :key="'reset-' + useIsMobileLandscape"
    class="eye fixed grad z-20"
    :class="{
      'is-clickable':
        isRobotClickable && !$q.dark.isActive && isAnimationDone && !isRobotProcessing,
      'is-loading': (!isAnimationDone || isRobotProcessing) && !$q.dark.isActive,
      'grad-dark': $q.dark.isActive,
      'is-loading-dark': $q.dark.isActive && !isAnimationDone,
      'is-clickable-dark':
        $q.dark.isActive && isRobotClickable && isAnimationDone && !isRobotProcessing,
      'slow-motion-mobile': useIsMobile(),
      'eye-container-mobile-landscape': useIsMobileLandscape,
      moveEyes,
    }"
    ref="eye"
  ></div>
</template>

<script setup lang="ts">
import { useMouse, useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useIsMobile, useIsMobileLandscape } from 'src/utils/useDeviceInfo'

// const eye = useTemplateRef<any>('eye')
const eye = ref()
const animationSettings = useAnimationSettings()
const { isAnimationDone, robotMounted, isRobotClickable, isRobotProcessing } =
  storeToRefs(animationSettings)

const $q = useQuasar()

const { width, height } = useWindowSize()
const { x, y } = useMouse()
const windowScroll = useWindowScroll()

const viewSizeX = computed(() => {
  return width.value / 12
})

const viewSizeY = computed(() => {
  return height.value / 12
})

const moveEyes = computed(() => {
  const rawX = Math.round(x.value / viewSizeX.value)
  const rawY = Math.round((y.value - windowScroll.y.value) / viewSizeY.value)

  const elementTarget = eye.value as HTMLDivElement

  // pour ne pas que l'oeil dépasse une certaine limite en dehors du cadre, je lui fixe cette limite max
  const maxY = -0.36
  const yNew = -0.06 * (6 - rawY)

  gsap.to(elementTarget, {
    duration: 0.1,
    x: -0.06 * (6 - rawX) + 'rem',
    y: yNew < maxY ? maxY + 'rem' : yNew + 'rem',
  })

  return rawX
})

onMounted(() => {
  robotMounted.value = true
})
</script>

<style scoped>
.eye-container-mobile-landscape {
  position: absolute;
  bottom: 48px !important;
}
.bg-light {
  background-color: white;
}
.bg-dark {
  background-color: black;
}
.eye {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  bottom: 101px;
  right: 50px;
}

.grad {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(255, 255, 255, 0) 70%
  );
}
.grad-dark {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgba(106, 106, 106, 1) 35%,
    rgba(254, 254, 254, 1) 40%,
    rgba(0, 0, 0, 1) 70%
  );
}
.is-loading {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(117, 14, 14, 1) 30%,
    rgba(212, 14, 14, 1) 50%,
    rgba(255, 255, 255, 0) 70%
  );
}
.is-clickable {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgb(191, 99, 20) 45%,
    rgb(174, 21, 21) 50%,
    rgba(255, 255, 255, 0) 70%
  );
  cursor: pointer;
}

.slow-motion-mobile {
  transition: all 0.3s ease;
}
.is-clickable-dark {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(0, 0, 0, 0.2) 40%,
    #bf4214dc,
    rgba(0, 0, 0, 1) 75%
  );
  cursor: pointer;
}
.is-loading-dark {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(191, 99, 20, 1) 30%,
    rgba(212, 14, 14, 1) 50%,
    rgba(255, 255, 255, 0) 70%
  );
}
</style>
