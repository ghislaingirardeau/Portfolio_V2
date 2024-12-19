import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimationSettings = defineStore('animationSettings', () => {
  const headerMounting = ref(false)
  const footerMounting = ref(false)
  const drawerMounting = ref(false)

  const ANIM_SHORT = ref(0.5)
  const ANIM_LONG = ref(1)

  return {
    footerMounting,
    headerMounting,
    drawerMounting,
    ANIM_SHORT,
    ANIM_LONG,
  }
})
