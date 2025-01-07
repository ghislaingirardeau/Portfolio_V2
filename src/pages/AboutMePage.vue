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
      <q-tab-panel name="me">
        <div class="flex flex-center">
          <WireCode
            ref="imageSkeleton"
            content="&lt;div&gt;Image About me&lt;/div&gt;"
            class="flex flex-center w-72 h-40 border-2 border-solid border-gray-300 absolute"
          />
          <q-img
            ref="image"
            src="images/aboutPage/moi2.jpg"
            alt="photo de Ghislain montagne"
            fit="contain"
            class="rounded-borders opacity-0"
            width="85%"
          />
        </div>
      </q-tab-panel>

      <q-tab-panel name="pro">
        <div class="flex flex-center">
          <q-img
            src="images/aboutPage/moi.jpg"
            alt="photo de Ghislain montagne"
            fit="contain"
            class="rounded-borders"
            width="85%"
          />
        </div>
      </q-tab-panel>
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
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import WireCode from 'src/components/common/WireCode.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const tab = ref('me')
const tabs = ref()
const nextText = ref(false)
const image = ref()
const imageSkeleton = ref()

const tl = gsap.timeline({ delay: 0.2 })

const animationSettings = useAnimationSettings()
const { headerMounting, isAnimating } = storeToRefs(animationSettings)

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
  if (!headerMounting.value) {
    headerMounting.value = true
  }
  animationTabs()
  animationImage()
})

function animationTabs() {
  tl.to(tabs.value.$el, {
    duration: 0.5,
    height: '40px',
    opacity: 1,
  })
}

function animationImage() {
  tl.to(imageSkeleton.value.$el, {
    duration: 0.3,
    opacity: 0,
  }).to(image.value.$el, {
    duration: 0.5,
    delay: 0.3,
    opacity: 1,
  })
}

function handleTextToDisplay() {
  nextText.value = !nextText.value
}
</script>

<style scoped>
.tab_panel_container {
  min-height: calc(100vh - 450px);
}
</style>
