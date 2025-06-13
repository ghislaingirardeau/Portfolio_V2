<template>
  <q-icon
    :name="iconType"
    color="accent"
    size="lg"
    class="fixed robot-idea-position z-50 opacity-0"
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

  if (isRobotClickable.value) {
    return mdiLightbulbOnOutline
  } else {
    return mdiLightbulbOnOutline
  }
})

watch(
  () => isAnimationDone.value,
  (newValue) => {
    const duration = 0.5
    // is animation and one action possible next, show the icon
    if (newValue && isRobotClickable.value) {
      gsap.to(robotIdea.value!.$el, {
        duration,
        y: -10,
        opacity: 1,
      })
    } else {
      // is animation and no action possible next, hide the icon
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
    } else {
      gsap.to(robotIdea.value!.$el, {
        duration,
        y: -10,
        opacity: 1,
      })
    }
  },
)
</script>

<style scoped>
.robot-idea-position {
  bottom: 140px;
  right: 45px;
}
.robot-idea-mobile-landscape {
  position: absolute;
  bottom: 85px;
}
</style>
