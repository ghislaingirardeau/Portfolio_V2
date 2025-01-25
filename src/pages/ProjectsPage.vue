<template>
  <component :is="loadComponent" :key="locale" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const projectMobileView = defineAsyncComponent(
  () => import('src/components/projectPage/projectMobileView.vue'),
)
const projectDesktopView = defineAsyncComponent(
  () => import('src/components/projectPage/projectDesktopView.vue'),
)

const animationSettings = useAnimationSettings()
const { presentationMounted, pageMounted } = storeToRefs(animationSettings)

const { locale } = useI18n()

const loadComponent = computed(() => {
  if (useIsMobile()) {
    return projectMobileView
  } else {
    return projectDesktopView
  }
})

onMounted(() => {
  if (!presentationMounted.value) {
    // presentationMounted.value = true
  }
  pageMounted.value = false
})
</script>

<style scoped lang="scss"></style>
