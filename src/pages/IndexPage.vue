<template>
  <q-page
    class="q-pa-lg column relative z-20"
    :class="usePageMobileLandscapeClass"
    :key="locale + $q.dark.mode"
  >
    <ThePresentation class="z-20" />

    <LogoAEContainer v-if="useIsMobile()" />

    <TheRobotIdea @click="robotAction" />

    <ChatMessageContainer
      :meTexts="tm('chatMessage.home.me')"
      :visitor-texts="t('chatMessage.home.visitor')"
    />
  </q-page>
</template>

<script setup lang="ts">
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import LogoAEContainer from 'src/components/homePage/LogoAEContainer.vue'
import TheRobotIdea from 'src/components/robot/TheRobotIdea.vue'
import ThePresentation from 'src/components/ThePresentation.vue'
import { useI18n } from 'vue-i18n'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useIsMobile, usePageMobileLandscapeClass } from 'src/utils/useDeviceInfo'

const { t, tm, locale } = useI18n()

const animationSettings = useAnimationSettings()
const { pageMounted, isCubeSpining, isRobotClickable, executeRobotAction } =
  storeToRefs(animationSettings)

const $q = useQuasar()

onMounted(() => {
  pageMounted.value = false
})

// When click on the robot inside the layout, it will execute the action
watch(
  () => executeRobotAction.value,
  (newValue: boolean) => {
    if (newValue) {
      robotAction()
      executeRobotAction.value = false
    }
  },
)

function robotAction() {
  if (isRobotClickable.value) {
    isCubeSpining.value = true
  }
}
</script>

<style scoped lang="scss"></style>
