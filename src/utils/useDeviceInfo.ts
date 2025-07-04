import { useBreakpoints, useScreenOrientation, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})
const { height } = useWindowSize()
const { orientation } = useScreenOrientation()

export function useIsMobile() {
  return breakpoints.active().value === 'mobile' ||
    breakpoints.active().value === 'tablet' ||
    hasTouchEvent()
    ? true
    : false
}

export function useIsMobileTall() {
  return useIsMobile() && height.value > 800
}

export function useIsTablet() {
  return breakpoints.active().value === 'tablet' && hasTouchEvent() ? true : false
}

export function useDeviceOrientation() {
  return orientation.value === 'landscape-primary' ? 'desktop' : 'mobile'
}

export const useIsMobileLandscape = computed(() => {
  return orientation.value === 'landscape-primary' && hasTouchEvent() && height.value < 600
})

export const usePageMobileLandscapeClass = computed(() => {
  return useIsMobileLandscape.value ? 'page-mobile-landscape' : ''
})

export function hasTouchEvent() {
  return 'ontouchstart' in window
}
