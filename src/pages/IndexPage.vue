<template>
  <q-page class="q-pa-lg column relative z-0">
    <ThePresentation class="z-20" />

    <LogoAEContainer />

    <TheRobotContainer />

    <ChatMessageContainer
      :meTexts="tm('chatMessage.home.me')"
      :visitor-texts="t('chatMessage.home.visitor')"
    />
  </q-page>
</template>

<script setup lang="ts">
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import LogoAEContainer from 'src/components/homePage/LogoAEContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import ThePresentation from 'src/components/ThePresentation.vue'
import { useI18n } from 'vue-i18n'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { t, tm } = useI18n()

const animationSettings = useAnimationSettings()
const { pageMounted } = storeToRefs(animationSettings)

onMounted(() => {
  pageMounted.value = false
})
</script>

<style scoped lang="scss"></style>
