<template>
  <svg
    fill="#000000"
    height="90px"
    width="90px"
    class="right-5 z-40"
    :class="[robotSvgClass]"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xml:space="preserve"
  >
    <g>
      <g></g>
    </g>
    <g>
      <g>
        <path
          stroke="black"
          :stroke-width="`${$q.dark.isActive ? '4' : '0'}`"
          :fill="`${colored}`"
          stroke-linejoin="round"
          stroke-linecap="round"
          d="M452.67,387.521v-25.757c15.199-6.505,25.876-21.605,25.876-39.156c0-23.474-19.098-42.572-42.572-42.572
        c-4.87,0-9.547,0.834-13.909,2.345l-62.87-35.637c17.763-22.433,28.384-50.767,28.384-81.538
        c0-72.553-59.026-131.578-131.578-131.578s-131.58,59.027-131.58,131.58c0,30.771,10.621,59.105,28.384,81.538l-62.871,35.636
        c-4.362-1.513-9.038-2.345-13.909-2.345c-23.474,0-42.572,19.098-42.572,42.572c0,17.55,10.677,32.651,25.876,39.156v25.757
        C25.417,395.153,0,425.492,0,461.676v16.696h152.051v-16.696c0-36.184-25.417-66.523-59.33-74.155v-25.757
        c15.197-6.505,25.875-21.605,25.875-39.156c0-5.756-1.154-11.245-3.233-16.256L177.8,270.96
        c17.65,13.085,38.67,21.867,61.503,24.772v91.789c-33.912,7.632-59.33,37.971-59.33,74.155v16.696h152.051v-16.696
        c0-36.184-25.417-66.523-59.33-74.155v-91.789c22.833-2.904,43.854-11.687,61.503-24.772l62.437,35.391
        c-2.079,5.012-3.233,10.502-3.233,16.256c0,17.55,10.677,32.651,25.875,39.156v25.757c-33.912,7.632-59.33,37.971-59.33,74.155
        v16.696H512v-16.696C512,425.492,486.583,395.153,452.67,387.521z  M295.229,444.98h-78.457
        c6.508-15.235,21.642-25.938,39.229-25.938C273.588,419.042,288.72,429.746,295.229,444.98z M256,263.395
        c-54.141,0-98.187-44.047-98.187-98.188c0-54.141,44.047-98.187,98.187-98.187c54.141,0,98.187,44.046,98.187,98.187
        C354.187,219.349,310.141,263.395,256,263.395z "
        />
        <path
          :stroke-width="`${$q.dark.isActive ? '4' : '0'}`"
          :class="{ 'leg-color-fill': animationSettings.isStarsAnimated }"
          stroke-linejoin="round"
          stroke-linecap="round"
          d="M435.974,313.427c5.063,0,9.18,4.118,9.18,9.18c0,5.062-4.118,9.179-9.18,9.179
        c-5.061,0-9.179-4.117-9.179-9.179S430.913,313.427,435.974,313.427z M396.747,444.98c6.508-15.235,21.641-25.938,39.228-25.938
        c17.587,0,32.72,10.703,39.229,25.938H396.747z "
        />
        <path
          :stroke-width="`${$q.dark.isActive ? '4' : '0'}`"
          :class="{ 'leg-color-fill': animationSettings.isStarsAnimated }"
          stroke-linejoin="round"
          stroke-linecap="round"
          d="M76.025,313.427c5.061,0,9.179,4.118,9.179,9.18
        s-4.118,9.179-9.179,9.179c-5.062,0-9.18-4.117-9.18-9.179S70.963,313.427,76.025,313.427z M115.253,444.98H36.797
        c6.508-15.235,21.642-25.938,39.229-25.938C93.614,419.042,108.745,429.746,115.253,444.98z  "
        />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobileLandscape } from 'src/utils/useDeviceInfo'
import { computed } from 'vue'

const $q = useQuasar()
const animationSettings = useAnimationSettings()

const robotSvgClass = computed(() => {
  return useIsMobileLandscape.value ? 'absolute bottom-1' : 'fixed bottom-14'
})

const colored = computed(() => {
  return $q.dark.isActive ? 'white' : '#4e4e4e'
})
</script>

<style lang="scss" scoped>
.leg-color-fill {
  fill: $accent;
  stroke: $accent;
}
</style>
