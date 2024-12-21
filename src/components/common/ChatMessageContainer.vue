<template>
  <transition
    appear
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutLeft delay-5s"
    mode="out-in"
  >
    <q-chat-message
      v-if="robotMounted"
      class="absolute bottom-16 right-24 lg:bottom-16 lg:right-32 ml-3"
      name="Ghislain Robot"
      sent
      text-color="white"
      bg-color="primary"
    >
      <slot name="text" />
    </q-chat-message>
    <div class="absolute bottom-16 right-32 ml-3 column" v-else>
      <WireCode content="&lt;div&gt;chat message&lt;/div&gt;" />
      <WireCode content="&lt;div&gt;chat message&lt;/div&gt;" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import WireCode from './WireCode.vue'
const animationSettings = useAnimationSettings()

const { robotMounted } = storeToRefs(animationSettings)
</script>

<style scoped lang="scss"></style>
