<template>
  <div>
    <TheRobotIdea />
    <div class="fixed eye-container bg-light" :class="{ 'bg-dark': $q.dark.isActive }">
      <div
        class="eye fixed grad"
        :class="{
          'is-clickable':
            isRobotClickable && !$q.dark.isActive && isAnimationDone && !isRobotProcessing,
          'is-loading': (!isAnimationDone || isRobotProcessing) && !$q.dark.isActive,
          'grad-dark': $q.dark.isActive,
          'is-loading-dark': $q.dark.isActive && !isAnimationDone,
          'is-clickable-dark':
            $q.dark.isActive && isRobotClickable && isAnimationDone && !isRobotProcessing,
          'slow-motion-mobile': useIsMobile(),
        }"
        ref="eyeBis"
      ></div>
    </div>
    <svg
      fill="#000000"
      height="90px"
      width="90px"
      class="fixed bottom-14 right-5 z-50"
      :class="moveEyes"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xml:space="preserve"
    >
      <g>
        <g>
          <!-- <path
            ref="eye"
            :fill="`${coloredEye}`"
            d="M256,95.156c-38.626,0-70.05,31.423-70.05,70.051c0,38.627,31.425,70.05,70.05,70.05
        c38.626,0,70.051-31.425,70.051-70.052C326.051,126.579,294.626,95.156,256,95.156z M256,201.866
        c-20.214,0-36.659-16.445-36.659-36.66c0-20.215,16.445-36.658,36.659-36.658s36.659,16.444,36.659,36.659
        C292.659,185.422,276.214,201.866,256,201.866z"
          /> -->
        </g>
      </g>
      <g>
        <g>
          <path
            :fill="`${colored}`"
            d="M452.67,387.521v-25.757c15.199-6.505,25.876-21.605,25.876-39.156c0-23.474-19.098-42.572-42.572-42.572
        c-4.87,0-9.547,0.834-13.909,2.345l-62.87-35.637c17.763-22.433,28.384-50.767,28.384-81.538
        c0-72.553-59.026-131.578-131.578-131.578s-131.58,59.027-131.58,131.58c0,30.771,10.621,59.105,28.384,81.538l-62.871,35.636
        c-4.362-1.513-9.038-2.345-13.909-2.345c-23.474,0-42.572,19.098-42.572,42.572c0,17.55,10.677,32.651,25.876,39.156v25.757
        C25.417,395.153,0,425.492,0,461.676v16.696h152.051v-16.696c0-36.184-25.417-66.523-59.33-74.155v-25.757
        c15.197-6.505,25.875-21.605,25.875-39.156c0-5.756-1.154-11.245-3.233-16.256L177.8,270.96
        c17.65,13.085,38.67,21.867,61.503,24.772v91.789c-33.912,7.632-59.33,37.971-59.33,74.155v16.696h152.051v-16.696
        c0-36.184-25.417-66.523-59.33-74.155v-91.789c22.833-2.904,43.854-11.687,61.503-24.772l62.437,35.391
        c-2.079,5.012-3.233,10.502-3.233,16.256c0,17.55,10.677,32.651,25.875,39.156v25.757c-33.912,7.632-59.33,37.971-59.33,74.155
        v16.696H512v-16.696C512,425.492,486.583,395.153,452.67,387.521z M76.025,313.427c5.061,0,9.179,4.118,9.179,9.18
        s-4.118,9.179-9.179,9.179c-5.062,0-9.18-4.117-9.18-9.179S70.963,313.427,76.025,313.427z M115.253,444.98H36.797
        c6.508-15.235,21.642-25.938,39.229-25.938C93.614,419.042,108.745,429.746,115.253,444.98z M295.229,444.98h-78.457
        c6.508-15.235,21.642-25.938,39.229-25.938C273.588,419.042,288.72,429.746,295.229,444.98z M256,263.395
        c-54.141,0-98.187-44.047-98.187-98.188c0-54.141,44.047-98.187,98.187-98.187c54.141,0,98.187,44.046,98.187,98.187
        C354.187,219.349,310.141,263.395,256,263.395z M435.974,313.427c5.063,0,9.18,4.118,9.18,9.18c0,5.062-4.118,9.179-9.18,9.179
        c-5.061,0-9.179-4.117-9.179-9.179S430.913,313.427,435.974,313.427z M396.747,444.98c6.508-15.235,21.641-25.938,39.228-25.938
        c17.587,0,32.72,10.703,39.229,25.938H396.747z"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useMouse, useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import TheRobotIdea from './TheRobotIdea.vue'

// const eye = useTemplateRef<any>('eye')
const eyeBis = ref()
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

  const elementTarget = eyeBis.value as HTMLDivElement

  gsap.to(elementTarget, {
    duration: 0.1,
    x: -0.06 * (6 - rawX) + 'rem',
    y: -0.06 * (6 - rawY) + 'rem',
  })

  return rawX
})

const colored = computed(() => {
  return $q.dark.isActive ? 'white' : '#4e4e4e'
})

onMounted(() => {
  robotMounted.value = true
})
</script>

<style scoped>
.eye-container {
  border-radius: 50%;
  width: 38px;
  height: 38px;
  bottom: 98px;
  right: 46px;
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
    rgba(255, 255, 255, 1) 30%,
    rgba(117, 14, 14, 1) 43%,
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
    rgb(16, 113, 132) 45%,
    rgba(21, 149, 174) 50%,
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
    rgba(30, 211, 247) 50%,
    rgba(0, 0, 0, 1) 75%
  );
  cursor: pointer;
}
.is-loading-dark {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgb(234, 50, 50) 40%,
    rgba(254, 254, 254, 1) 50%,
    rgba(0, 0, 0, 1) 75%
  );
}
</style>
