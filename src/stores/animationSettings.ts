import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAnimationSettings = defineStore('animationSettings', () => {
  const drawerMounted = ref(false)
  const robotMounted = ref(false)
  const presentationMounted = ref(false)
  const headerMounted = ref(false)
  const footerMounted = ref(false)
  const pageMounted = ref(false)
  const logoMounted = ref(false)

  const isRobotClickable = ref(false)
  const isRobotTap = ref(false)
  const isRobotTalk = ref(false)
  const isRobotFix = ref(false)

  const isCubeSpining = ref(false)

  const ANIM_SHORT = ref(0.5)
  const ANIM_LONG = ref(1)

  const isAnimationDone = computed(() => {
    return (
      headerMounted.value &&
      footerMounted.value &&
      presentationMounted.value &&
      robotMounted.value &&
      drawerMounted.value &&
      pageMounted.value
    )
  })

  const isRobotProcessing = ref(false)

  function resetRobotAction() {
    isRobotClickable.value = false
    isRobotProcessing.value = false

    setTimeout(() => {
      isRobotTap.value = false
      isRobotTalk.value = false
      isRobotFix.value = false
    }, 500)
  }

  function navigationRestartRobot() {
    isRobotClickable.value = false
    isRobotProcessing.value = false
    isRobotTap.value = false
    isRobotTalk.value = false
    isRobotFix.value = false
  }

  return {
    ANIM_SHORT,
    ANIM_LONG,
    logoMounted,
    isRobotClickable,
    isRobotTap,
    isRobotFix,
    isRobotTalk,
    isRobotProcessing,
    isCubeSpining,
    resetRobotAction,
    navigationRestartRobot,
    drawerMounted,
    robotMounted,
    headerMounted,
    footerMounted,
    presentationMounted,
    pageMounted,
    isAnimationDone,
  }
})
