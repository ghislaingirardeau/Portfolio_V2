<template>
  <MeMobileView v-if="useIsMobile()" />
  <AboutMeDesktopView v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AboutMeDesktopView from 'src/components/aboutPage/AboutMeDesktopView.vue'
import MeMobileView from 'src/components/aboutMeAndWorkPage/MeMobileView.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { onMounted } from 'vue'

const animationSettings = useAnimationSettings()
const { presentationMounted, pageMounted } = storeToRefs(animationSettings)

onMounted(() => {
  if (!presentationMounted.value) {
    presentationMounted.value = true
  }
  pageMounted.value = false
})
</script>

<style scoped></style>
