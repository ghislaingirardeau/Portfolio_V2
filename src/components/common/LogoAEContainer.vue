<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
    mode="out-in"
  >
    <LogoAE v-if="layoutMounted" />
    <code
      class="text-grey-7 flex flex-center mt-10 h-48 border-2 border-solid border-gray-300 lg:absolute lg:right-48"
      v-else
    >
      &lt;div&gt;Logo Entreprise&lt;/div&gt;</code
    >
  </transition>
</template>

<script setup lang="ts">
import LogoAE from 'src/components/common/LogoAE.vue'

import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
const animationSettings = useAnimationSettings()

const { layoutMounted } = storeToRefs(animationSettings)
</script>

<style scoped></style>
