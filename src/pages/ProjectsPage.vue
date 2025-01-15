<template>
  <projectMobileView v-if="useIsMobile()" :key="locale" />

  <projectDesktopView v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import projectMobileView from 'src/components/projectPage/projectMobileView.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { onMounted } from 'vue'
import projectDesktopView from 'src/components/projectPage/projectDesktopView.vue'
import { useI18n } from 'vue-i18n'

const animationSettings = useAnimationSettings()
const { presentationMounted, pageMounted } = storeToRefs(animationSettings)

const { locale } = useI18n()

onMounted(() => {
  if (!presentationMounted.value) {
    presentationMounted.value = true
  }
  pageMounted.value = false
})
</script>

<style scoped lang="scss"></style>
