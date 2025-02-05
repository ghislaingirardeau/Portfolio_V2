<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
  >
    <TheRobot v-if="presentationMounted || headerMounted" @click="handleRobotAction" />
  </transition>
</template>

<script setup lang="ts">
import TheRobot from 'src/components/TheRobot.vue'

import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
const animationSettings = useAnimationSettings()

const { headerMounted, presentationMounted, isRobotClickable } = storeToRefs(animationSettings)

const emit = defineEmits(['robotAction'])

function handleRobotAction() {
  if (isRobotClickable.value) {
    emit('robotAction')
  }
}
</script>

<style scoped></style>
