<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <TheRobot v-if="presentationMounted || headerMounted" @click="emit('robotAction')" />
    <!-- <WireCode
      content="&lt;svg&gt;Un chat bot&lt;/svg&gt;"
      class="mt-10 absolute h-10 w-48 border-solid border-gray-300 bg-grey-3 bottom-5 right-5 lg:bottom-5 lg:right-10"
      v-else
    /> -->
  </transition>
</template>

<script setup lang="ts">
import TheRobot from 'src/components/TheRobot.vue'

import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
const animationSettings = useAnimationSettings()

const { headerMounted, presentationMounted } = storeToRefs(animationSettings)

const emit = defineEmits(['robotAction'])
</script>

<style scoped></style>
