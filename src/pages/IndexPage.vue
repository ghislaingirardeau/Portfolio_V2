<template>
  <q-page class="q-pa-lg column relative z-0">
    <ThePresentation class="z-20" />

    <LogoAEContainer />

    <TheRobotContainer />

    <ChatMessageContainer :texts="tm('chatMessage.home')" />
  </q-page>
</template>

<script setup lang="ts">
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import LogoAEContainer from 'src/components/homePage/LogoAEContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import ThePresentation from 'src/components/ThePresentation.vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
</script>

<style scoped lang="scss"></style>
