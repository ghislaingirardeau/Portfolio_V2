<template>
  <component :is="loadComponent" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { computed, defineAsyncComponent, onMounted } from 'vue'

const animationSettings = useAnimationSettings()
const { presentationMounted, pageMounted } = storeToRefs(animationSettings)

const MeMobileView = defineAsyncComponent(
  () => import('src/components/aboutMeAndWorkPage/MeMobileView.vue'),
)
const MeDesktopView = defineAsyncComponent(
  () => import('src/components/aboutMeAndWorkPage/MeDesktopView.vue'),
)

const loadComponent = computed(() => {
  if (useIsMobile()) {
    return MeMobileView
  } else {
    return MeDesktopView
  }
})

onMounted(() => {
  // Ensure the presentation is mounted when the page is loaded, other load the page
  if (!presentationMounted.value) {
    presentationMounted.value = true
  }
  pageMounted.value = false
})
</script>

<style scoped></style>
