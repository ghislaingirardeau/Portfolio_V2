import { defineStore } from 'pinia'
import { useScreenOrientation } from '@vueuse/core'
import { useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

export const useDeviceDetail = defineStore('deviceDetail', () => {
  const { orientation } = useScreenOrientation()
  const breakpoints = useBreakpoints({
    mobile: 0, // optional
    tablet: 640,
    laptop: 1024,
    desktop: 1280,
  })
  console.log(breakpoints.active().value)
  const deviceOrientation = computed(() => {
    return orientation.value === 'landscape-primary' ? 'desktop' : 'mobile'
  })
  const isMobile = computed(() => {
    return breakpoints.active().value === 'mobile' || breakpoints.active().value === 'tablet'
      ? true
      : false
  })
  return {
    deviceOrientation,
    isMobile,
  }
})
