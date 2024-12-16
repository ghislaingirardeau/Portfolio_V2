import { defineStore } from 'pinia'
import { useScreenOrientation } from '@vueuse/core'
import { computed } from 'vue'

export const useDeviceDetail = defineStore('seviceDetail', () => {
  const { orientation } = useScreenOrientation()
  const deviceOrientation = computed(() => {
    return orientation.value === 'landscape-primary' ? 'desktop' : 'mobile'
  })
  return {
    deviceOrientation,
  }
})
