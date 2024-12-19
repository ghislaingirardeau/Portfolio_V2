import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { gsap } from 'src/boot/gsap'

export const useGlobalSettings = defineStore('globalSettings', () => {
  const timeline = shallowRef<gsap.core.Timeline>(gsap.timeline())

  const ANIM_DURATION = ref(1)
  const ANIM_HEADER_BTN_DURATION = ref(0.5)
  const ANIM_DELAY = ref(0.2)

  const HEADER_ANIMATED = ref(false)

  function startHeaderAnimation() {
    HEADER_ANIMATED.value = true
  }

  function stopHeaderAnimation() {
    HEADER_ANIMATED.value = false
  }

  return {
    ANIM_DURATION,
    ANIM_HEADER_BTN_DURATION,
    ANIM_DELAY,
    HEADER_ANIMATED,
    startHeaderAnimation,
    stopHeaderAnimation,
    timeline,
  }
})
