<template>
  <q-icon
    :name="iconType"
    color="accent"
    size="lg"
    class="fixed robot-idea z-50 cursor-pointer"
    :class="{ 'robot-idea-mobile-landscape': useIsMobileLandscape }"
    ref="robotIdea"
  ></q-icon>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, ref, watch } from 'vue'
import { gsap } from 'src/boot/gsap'
import {
  mdiLightbulbOnOutline,
  mdiChat,
  mdiImageBroken,
  mdiChatSleepOutline,
  mdiApplicationVariableOutline,
  mdiServer,
} from '@quasar/extras/mdi-v7'
import { useIsMobileLandscape } from 'src/utils/useDeviceInfo'

const robotIdea = ref()
const animationSettings = useAnimationSettings()
const {
  isRobotClickable,
  isRobotTalk,
  isRobotFix,
  isRobotStepBack,
  isAnimationDone,
  isRobotApplication,
  isRobotServer,
} = storeToRefs(animationSettings)

const iconType = computed(() => {
  if (isRobotTalk.value) {
    return mdiChat
  }
  if (isRobotFix.value) {
    return mdiImageBroken
  }
  if (isRobotApplication.value) {
    return mdiApplicationVariableOutline
  }
  if (isRobotServer.value) {
    return mdiServer
  }
  if (isRobotStepBack.value) {
    return mdiChatSleepOutline
  }
  if (isRobotClickable.value) {
    return mdiLightbulbOnOutline
  } else {
    return undefined
  }
})

watch(
  () => isAnimationDone.value,
  (newValue) => {
    const duration = 0.5
    if (newValue) {
      gsap.to(robotIdea.value!.$el, {
        duration,
        y: -10,
        opacity: 1,
      })
    } else {
      gsap.to(robotIdea.value!.$el, {
        duration,
        y: 0,
        opacity: 0,
      })
    }
  },
)
watch(
  () => isRobotClickable.value,
  (newValue) => {
    const duration = 0.5
    if (!newValue) {
      gsap.to(robotIdea.value!.$el, {
        duration,
        y: 0,
        opacity: 0,
      })
    }
  },
)
</script>

<style scoped>
.robot-idea {
  bottom: 135px;
  right: 45px;
  opacity: 0;
}
.robot-idea-mobile-landscape {
  position: absolute;
  bottom: 85px;
}
</style>
