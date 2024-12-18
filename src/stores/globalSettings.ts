import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalSettings = defineStore('globalSettings', () => {
  const ANIM_DURATION = ref(0.2)
  const ANIM_DELAY = ref(0.2)

  return {
    ANIM_DURATION,
    ANIM_DELAY,
  }
})
