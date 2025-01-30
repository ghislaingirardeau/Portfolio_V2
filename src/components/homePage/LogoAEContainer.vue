<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
    mode="out-in"
  >
    <LogoAE v-if="headerMounted" :class="logoClass" />
    <!-- <WireCode
      v-else
      content="&lt;div&gt;Logo Entreprise&lt;/div&gt;"
      class="flex flex-center h-36 border-2 border-solid border-gray-300 bg-grey-3 lg:absolute lg:right-48"
      :class="logoClass"
    /> -->
  </transition>
</template>

<script setup lang="ts">
import LogoAE from 'src/components/homePage/LogoAE.vue'

import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile, useIsMobileTall } from 'src/utils/useDeviceInfo'
import { computed } from 'vue'
const animationSettings = useAnimationSettings()

const { headerMounted } = storeToRefs(animationSettings)

const logoClass = computed(() => {
  if (useIsMobile()) {
    return useIsMobileTall() ? 'mt-28' : 'mt-5'
  } else {
    return 'mt-10'
  }
})
</script>

<style scoped></style>
