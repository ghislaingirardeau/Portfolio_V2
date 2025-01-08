<template>
  <projectMobileView v-if="useIsMobile()" />

  <projectDesktopView v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import projectMobileView from 'src/components/projectPage/projectMobileView.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { onMounted } from 'vue'
import projectDesktopView from 'src/components/projectPage/projectDesktopView.vue'

const animationSettings = useAnimationSettings()
const { headerMounting } = storeToRefs(animationSettings)

onMounted(() => {
  if (!headerMounting.value) {
    headerMounting.value = true
  }
})
</script>

<style scoped lang="scss"></style>
