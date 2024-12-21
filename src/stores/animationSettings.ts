import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimationSettings = defineStore('animationSettings', () => {
  const headerMounting = ref(false)
  const footerMounting = ref(false)
  const drawerMounted = ref(false)
  const robotMounted = ref(false)
  const headerMounted = ref(false)

  const layoutMounted = ref(false)
  const isAnimating = ref(true)
  const isClickable = ref(false)

  const ANIM_SHORT = ref(0.5)
  const ANIM_LONG = ref(1)

  function handleClickableEnter() {
    isClickable.value = true
  }

  function handleClickableLeave() {
    isClickable.value = false
  }

  return {
    footerMounting,
    headerMounting,
    ANIM_SHORT,
    ANIM_LONG,
    layoutMounted,
    isAnimating,
    isClickable,
    drawerMounted,
    robotMounted,
    headerMounted,
    handleClickableEnter,
    handleClickableLeave,
  }
})
