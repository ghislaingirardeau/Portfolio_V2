<template>
  <q-page class="q-pa-lg">
    <q-tabs
      ref="tabs"
      v-model="tab"
      dense
      class="text-grey h-0 lg:w-3/5"
      :class="[$q.dark.mode ? 'bg-dark-page' : 'bg-white', usePageMobileLandscapeClass]"
      :active-color="$q.dark.mode ? 'dark-primary' : 'primary'"
      :indicator-color="$q.dark.mode ? 'dark-primary' : 'primary'"
      align="justify"
      narrow-indicator
      @update:model-value="resetCarousel"
    >
      <q-tab name="mobile" ref="menuTab" :label="'Mobile First'" />
      <q-tab name="desktop" :label="'Desktop Web'" />
    </q-tabs>

    <q-separator class="lg:w-3/5" />

    <q-tab-panels
      v-model="tab"
      animated
      class="tab_panel_container flex z-10 lg:w-3/5 lg:flex-center lg:item-center"
      :class="{ tab_panel_dark: $q.dark.mode, 'pt-10': useIsMobileTall() }"
    >
      <MobileCarouselProjects
        v-model:currentSlide="currentSlide"
        :type-desktop="tab === 'mobile' ? false : true"
        :name="tab"
        v-model:is-first-mounted="isFirstMounted"
        @slide-change="resetChat"
      />
    </q-tab-panels>
    <TheRobotContainer @robot-action="robotAction" />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        :visitor-texts="visitorChatMessageToDisplay"
        :meTexts="chatMessageToDisplay"
        :key="tab + chatPage + currentSlide"
        :delay-animation="0.5"
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { gsap } from 'src/boot/gsap'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import MobileCarouselProjects from 'src/components/projectPage/MobileCarouselProjects.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile, useIsMobileTall, usePageMobileLandscapeClass } from 'src/utils/useDeviceInfo'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, t } = useI18n({ useScope: 'global' })

const $q = useQuasar()

const animationSettings = useAnimationSettings()
const { isRobotClickable, isRobotTap, isRobotTalk, isRobotProcessing, pageMounted } =
  storeToRefs(animationSettings)

const tab = ref('mobile')
const tabs = ref()
const currentSlide = ref(0)
const isFirstMounted = ref(true)
const chatPage = ref(0)

const chatMessageToDisplay = computed(() => {
  if (useIsMobile()) {
    return tab.value === 'mobile'
      ? [
          ...tm(
            `chatMessage.projectMobile.mobileTab.${currentSlide.value}.${chatPage.value}.description`,
          ),
        ]
      : [
          ...tm(
            `chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.description`,
          ),
        ]
  } else {
    return tab.value === 'mobile'
      ? [
          ...tm(
            `chatMessage.projectDesktop.mobileTab.${currentSlide.value}.${chatPage.value}.description`,
          ),
        ]
      : [
          ...tm(
            `chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.description`,
          ),
        ]
  }
})

const visitorChatMessageToDisplay = computed(() => {
  if (useIsMobile()) {
    if (tab.value === 'mobile') {
      return t(`chatMessage.projectMobile.mobileTab.${currentSlide.value}.${chatPage.value}.title`)
    } else {
      return t(
        `chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.title`,
      )
    }
  } else {
    if (tab.value === 'mobile') {
      return t(`chatMessage.projectDesktop.mobileTab.${currentSlide.value}.${chatPage.value}.title`)
    } else {
      return t(
        `chatMessage.projectDesktop.desktopTab.${currentSlide.value}.${chatPage.value}.title`,
      )
    }
  }
})

onMounted(() => {
  pageMounted.value = false
  gsap.to(tabs.value.$el, {
    duration: 0.5,
    height: '40px',
    opacity: 1,
    delay: 0.2,
  })
  isRobotTalk.value = true
})

function resetCarousel() {
  currentSlide.value = 0
  resetChat()
}

function resetChat() {
  chatPage.value = 0
  isRobotTalk.value = true
  isRobotClickable.value = true
}

function robotAction() {
  if (tab.value === 'mobile' && chatPage.value === 0) {
    chatPage.value++
    isRobotTap.value = true
    isRobotTalk.value = false
    return
  }
  if (tab.value === 'mobile' && chatPage.value === 1 && isRobotClickable.value) {
    isRobotProcessing.value = true
    return
  }
  if (tab.value === 'desktop' && chatPage.value === 0) {
    chatPage.value++
    animationSettings.resetRobotAction()
    return
  }
}
</script>

<style scoped lang="scss">
.tab_panel_container {
  min-height: calc(100vh - 200px);
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
