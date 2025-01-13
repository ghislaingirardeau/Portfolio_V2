<template>
  <q-icon
    :name="iconType"
    color="primary"
    size="lg"
    class="fixed robotIdea z-50"
    ref="robotIdea"
  ></q-icon>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, useTemplateRef, watch } from 'vue'
import { gsap } from 'src/boot/gsap'
import { mdiLightbulbOnOutline, mdiChat, mdiImageBroken } from '@quasar/extras/mdi-v7'

const robotIdea = useTemplateRef('robotIdea')
const animationSettings = useAnimationSettings()
const { isRobotClickable, isRobotTalk, isRobotFix } = storeToRefs(animationSettings)

const iconType = computed(() => {
  if (isRobotTalk.value) {
    return mdiChat
  }
  if (isRobotFix.value) {
    return mdiImageBroken
  } else {
    return mdiLightbulbOnOutline
  }
})

watch(
  () => isRobotClickable.value,
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
</script>

<style scoped>
.robotIdea {
  bottom: 135px;
  right: 45px;
  opacity: 0;
}
</style>
