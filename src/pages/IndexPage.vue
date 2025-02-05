<template>
  <q-page class="q-pa-lg column relative z-20" :class="pageClass" :key="locale + $q.dark.mode">
    <ThePresentation class="z-20" />

    <LogoAEContainer v-if="useIsMobile()" />

    <!-- <div class="mt-28 ml-40">
      <p class="text-xl text-dark-secondary">Freelance et Formateur occasionel</p>
      <p class="text-xl text-dark-secondary">Spécialiste Javascript & Typescript</p>
      <p class="text-xl text-dark-secondary">Vue & Nuxt JS / REST API</p>
    </div> -->

    <TheRobotContainer @robot-action="robotAction" />

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
import { computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useIsMobile, useIsMobileLandscape } from 'src/utils/useDeviceInfo'

const { t, tm, locale } = useI18n()

const animationSettings = useAnimationSettings()
const { pageMounted, isCubeSpining } = storeToRefs(animationSettings)

const $q = useQuasar()

const pageClass = computed(() => {
  return useIsMobileLandscape.value ? 'page-mobile-landscape' : ''
})

onMounted(() => {
  pageMounted.value = false
})

function robotAction() {
  isCubeSpining.value = true
}
</script>

<style scoped lang="scss">
.page-mobile-landscape {
  min-height: 567px !important;
}
</style>
