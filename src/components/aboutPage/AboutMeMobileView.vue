<template>
  <q-page class="q-pa-lg">
    <q-tabs
      v-model="tab"
      dense
      ref="tabs"
      class="text-grey h-0"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      @update:model-value="nextText = false"
    >
      <q-tab name="me" :label="t('about.personal.h3')" />
      <q-tab name="pro" :label="t('about.professionaly.h3')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="tab_panel_container flex flex-center">
      <component :is="PanelImage" :name="tab" v-model:is-first-mounted="isFirstMounted" />
    </q-tab-panels>
    <TheRobotContainer />
    <ChatMessageContainer
      :key="tab + nextText"
      :texts="nextText ? chatTextsNext : chatTexts"
      :delay-animation="0.5"
      :has-emit-event="true"
      @some-event="handleTextToDisplay"
    />
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'
import PanelImage from 'src/components/aboutPage/panelImage.vue'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const tab = ref('me')
const tabs = ref()
const nextText = ref(false)
const isFirstMounted = ref(true)

const tl = gsap.timeline({ delay: 0.2 })

const animationSettings = useAnimationSettings()
const { isAnimating } = storeToRefs(animationSettings)

const { tm, t } = useI18n({ useScope: 'global' })

const chatTexts = computed(() => {
  return tab.value === 'me'
    ? (tm('about.personal.description') as string[])
    : (tm('about.professionaly.description') as string[])
})

const chatTextsNext = computed(() => {
  return tab.value === 'me'
    ? (tm('about.personal.description1') as string[])
    : (tm('about.professionaly.description1') as string[])
})

onMounted(() => {
  isAnimating.value = true
  animationTabs()
})

function animationTabs() {
  tl.to(tabs.value.$el, {
    duration: 0.5,
    height: '40px',
    opacity: 1,
  })
}

// function animationImage() {
//   tl.to(imageSkeleton.value.$el, {
//     duration: 0.3,
//     opacity: 0,
//   }).to(image.value.$el, {
//     duration: 0.5,
//     delay: 0.3,
//     opacity: 1,
//   })
// }

function handleTextToDisplay() {
  nextText.value = !nextText.value
}
</script>

<style scoped>
.tab_panel_container {
  min-height: calc(100vh - 450px);
}
</style>
