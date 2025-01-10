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
    <TheRobotContainer />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        :visitor-texts="visitorChatMessageToDisplay"
        :meTexts="chatMessageToDisplay"
        :key="tab"
        :delay-animation="0.5"
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { gsap } from 'src/boot/gsap'

import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import MobileCarouselProjects from 'src/components/projectPage/MobileCarouselProjects.vue'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n({ useScope: 'global' })

const tab = ref('mobile')
const tabs = ref()
const currentSlide = ref(0)
const isFirstMounted = ref(true)

const chatMessageToDisplay = computed(() => {
  return tab.value === 'mobile'
    ? [...tm('chatMessage.projectMobile.mobileTab.chat1')]
    : [...tm('chatMessage.projectMobile.desktopTab.chat1')]
})

const visitorChatMessageToDisplay = computed(() => {
  return tab.value === 'mobile'
    ? 'Ce sont des applications mobiles ?'
    : 'Ce sont toutes tes réalisations ?'
})

onMounted(() => {
  gsap.to(tabs.value.$el, {
    duration: 0.5,
    height: '40px',
    opacity: 1,
    delay: 0.2,
  })
})

function resetCarousel() {
  currentSlide.value = 0
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
