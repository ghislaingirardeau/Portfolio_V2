<template>
  <ProjectMobileView :key="locale" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ProjectMobileView from 'src/components/projectPage/projectMobileView.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const animationSettings = useAnimationSettings()
const { presentationMounted, pageMounted } = storeToRefs(animationSettings)

const { locale } = useI18n()

onMounted(() => {
  pageMounted.value = false
})
</script>

<style scoped lang="scss"></style>
