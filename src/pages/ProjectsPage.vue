<template>
  <mobileViewPage v-if="useIsMobile()" />

  <DesktopViewPage v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import mobileViewPage from 'src/components/projectPage/mobileViewPage.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { onMounted } from 'vue'
import DesktopViewPage from 'src/components/projectPage/desktopViewPage.vue'

const animationSettings = useAnimationSettings()
const { headerMounting } = storeToRefs(animationSettings)

onMounted(() => {
  if (!headerMounting.value) {
    headerMounting.value = true
  }
})
</script>

<style scoped lang="scss"></style>
