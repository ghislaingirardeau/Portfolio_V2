<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
    mode="out-in"
  >
    <LogoAE v-if="layoutMounted" :class="logoClass" />
    <WireCode
      v-else
      content="&lt;div&gt;Logo Entreprise&lt;/div&gt;"
      class="flex flex-center h-48 border-2 border-solid border-gray-300 lg:absolute lg:right-48"
      :class="logoClass"
    />
  </transition>
</template>

<script setup lang="ts">
import LogoAE from 'src/components/homePage/LogoAE.vue'

import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import WireCode from 'src/components/common/WireCode.vue'
import { useIsMobileTall } from 'src/utils/useDeviceInfo'
import { computed } from 'vue'
const animationSettings = useAnimationSettings()

const { layoutMounted } = storeToRefs(animationSettings)

const logoClass = computed(() => {
  return useIsMobileTall() ? 'mt-24' : 'mt-10'
})
</script>

<style scoped></style>
