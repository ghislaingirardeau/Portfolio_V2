<template>
  <q-page class="q-pa-lg">
    <q-tabs
      ref="tabs"
      v-model="tab"
      dense
      class="text-grey h-0"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      @update:model-value="resetCarousel"
    >
      <q-tab name="mobile" ref="menuTab" :label="'Mobile first'" />
      <q-tab name="desktop" :label="'desktop'" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="tab_panel_container flex flex-center">
      <component
        :is="MobileCarouselProjects"
        v-model:currentSlide="currentSlide"
        :type-desktop="tab === 'mobile' ? false : true"
        :name="tab"
        v-model:is-first-mounted="isFirstMounted"
      >
      </component>
    </q-tab-panels>
    <TheRobotContainer @robot-action="robotAction" />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        :visitor-texts="visitorChatMessageToDisplay"
        :meTexts="chatMessageToDisplay"
        :key="tab + chatPage"
        :delay-animation="0.5"
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'

import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import MobileCarouselProjects from 'src/components/projectPage/MobileCarouselProjects.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const animationSettings = useAnimationSettings()
const { isRobotClickable } = storeToRefs(animationSettings)

const { tm, t } = useI18n({ useScope: 'global' })

const tab = ref('mobile')
const tabs = ref()
const currentSlide = ref(0)
const isFirstMounted = ref(true)
const chatPage = ref(1)

const chatMessages = computed(() => {
  return tab.value === 'mobile'
    ? tm(`chatMessage.projectMobile.mobileTab`)
    : tm(`chatMessage.projectMobile.desktopTab`)
})

const chatMessageToDisplay = computed(() => {
  return tab.value === 'mobile'
    ? [...tm(`chatMessage.projectMobile.mobileTab.chat${chatPage.value}`)]
    : [...tm(`chatMessage.projectMobile.desktopTab.chat${chatPage.value}`)]
})

const visitorChatMessageToDisplay = computed(() => {
  if (tab.value === 'mobile') {
    return t(`chatMessage.projectMobile.mobileTab.${chatPage.value}.title`)
  } else {
    return t(`chatMessage.projectMobile.desktopTab.${chatPage.value}.title`)
  }
})

onMounted(() => {
  isRobotClickable.value = true
  gsap.to(tabs.value.$el, {
    duration: 0.5,
    height: '40px',
    opacity: 1,
    delay: 0.2,
  })
})

function resetCarousel() {
  currentSlide.value = 0
  chatPage.value = 1
}

function robotAction() {
  if (chatPage.value === Object.keys(chatMessages.value).length) {
    chatPage.value--
  } else {
    chatPage.value++
  }
}
</script>

<style scoped lang="scss">
.tab_panel_container {
  min-height: calc(100vh - 350px);
}
.my-card {
  width: 100%;
  &--portrait {
    height: 450px;
  }
}
</style>
