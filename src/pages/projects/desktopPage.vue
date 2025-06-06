<template>
  <q-page class="q-pa-sm pt-4 lg:q-pa-lg lg:pt-0">
    <DesktopCarouselProjects
      v-model:currentSlide="currentSlide"
      :class="usePageMobileLandscapeClass"
      :type-desktop="true"
      name="desktop"
      @slide-change="resetChat"
    />
    <TheRobotContainer @robot-action="robotAction" />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        :visitor-texts="visitorChatMessageToDisplay"
        :meTexts="chatMessageToDisplay"
        :key="chatPage + currentSlide"
        :delay-animation="0.5"
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import DesktopCarouselProjects from 'src/components/projectPage/DesktopCarouselProjects.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile, usePageMobileLandscapeClass } from 'src/utils/useDeviceInfo'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, t } = useI18n({ useScope: 'global' })

const animationSettings = useAnimationSettings()
const { isRobotClickable, isRobotTalk, pageMounted } = storeToRefs(animationSettings)

const currentSlide = ref(0)
const chatPage = ref(0)

const chatMessageToDisplay = computed(() => {
  if (useIsMobile()) {
    return [
      ...tm(
        `chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.description`,
      ),
    ]
  } else {
    return [
      ...tm(
        `chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.description`,
      ),
    ]
  }
})

const visitorChatMessageToDisplay = computed(() => {
  if (useIsMobile()) {
    return t(`chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.title`)
  } else {
    return t(`chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.title`)
  }
})

onMounted(() => {
  pageMounted.value = false
  isRobotTalk.value = true
})

function resetChat() {
  chatPage.value = 0
  isRobotTalk.value = true
  isRobotClickable.value = true
}

function robotAction() {
  if (chatPage.value === 0) {
    chatPage.value++
    animationSettings.resetRobotAction()
    return
  }
}
</script>

<style scoped lang="scss">
.tab_panel_container {
  min-height: calc(100vh - 300px);
  background-color: rgba(0, 0, 0, 0);
}

.tab_panel_dark {
  background-color: rgba(255, 255, 255, 0);
}
.my-card {
  width: 100%;
  &--portrait {
    height: 450px;
  }
}
</style>
