import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimationSettings = defineStore('animationSettings', () => {
  const headerMounting = ref(false)
  const footerMounting = ref(false)
  const layoutAnimating = ref(true)
  const isAnimating = ref(true)

  const ANIM_SHORT = ref(0.5)
  const ANIM_LONG = ref(1)

  return {
    footerMounting,
    headerMounting,
    ANIM_SHORT,
    ANIM_LONG,
    layoutAnimating,
    isAnimating,
  }
})
