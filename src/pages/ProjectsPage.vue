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

    <q-tab-panels v-model="tab" animated>
      <component
        :is="CarouselProjects"
        v-model:currentSlide="currentSlide"
        :type-desktop="tab === 'mobile' ? false : true"
        :name="tab"
        v-model:is-first-mounted="isFirstMounted"
      >
      </component>
    </q-tab-panels>
    <TheRobotContainer />
    <ChatMessageContainer :texts="tm('chatMessage.project')" />
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'

import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import CarouselProjects from 'src/components/projectPage/carouselProjects.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const animationSettings = useAnimationSettings()
const { headerMounting } = storeToRefs(animationSettings)

const { tm } = useI18n({ useScope: 'global' })

const tab = ref('mobile')
const tabs = ref()
const currentSlide = ref(0)
const isFirstMounted = ref(true)

onMounted(() => {
  if (!headerMounting.value) {
    headerMounting.value = true
  }
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
.my-card {
  width: 100%;
  &--portrait {
    height: 450px;
  }
}
</style>
