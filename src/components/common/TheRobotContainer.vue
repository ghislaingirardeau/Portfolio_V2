<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <TheRobot v-if="layoutMounted" />
    <code class="text-grey-7 mt-10 absolute bottom-5 right-5 lg:bottom-5 lg:right-10" v-else>
      &lt;svg&gt;Un chat bot&lt;/svg&gt;</code
    >
  </transition>
</template>

<script setup lang="ts">
import TheRobot from 'src/components/TheRobot.vue'

import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
const animationSettings = useAnimationSettings()

const { layoutMounted } = storeToRefs(animationSettings)
</script>

<style scoped></style>
