<template>
  <q-icon
    :name="iconType"
    :color="$q.dark.mode ? 'dark-primary' : 'primary'"
    size="lg"
    class="fixed robotIdea z-50 cursor-pointer"
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
  mdiStepBackward,
  mdiApplicationVariableOutline,
  mdiServer,
} from '@quasar/extras/mdi-v7'
import { useQuasar } from 'quasar'
const $q = useQuasar()

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
    return mdiStepBackward
  } else {
    return mdiLightbulbOnOutline
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
.robotIdea {
  bottom: 135px;
  right: 45px;
  opacity: 0;
}
</style>
