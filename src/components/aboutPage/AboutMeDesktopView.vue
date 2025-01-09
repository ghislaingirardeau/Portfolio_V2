<template>
  <q-page class="q-pa-lg">
    <q-card class="w-1/2">
      <q-card-section>
        <div ref="cardTitle" class="text-h6 opacity-20">&lt;h1&gt;Title&lt;/h1&gt;</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section style="height: 400px">
        <WireCode
          ref="imageSkeleton"
          content="&lt;div&gt;Image About me&lt;/div&gt;"
          class="flex flex-center w-11/12 border-2 border-solid border-gray-300 bg-grey-3 absolute"
          style="height: 350px"
        />
        <q-img
          ref="image"
          :src="imageToDisplay"
          alt="photo de Ghislain montagne"
          fit="contain"
          class="rounded-borders opacity-0"
          height="350px"
        />
      </q-card-section>
    </q-card>

    <TheRobotContainer />
    <ChatMessageContainer
      :key="'tab' + nextText"
      :texts="chatTexts"
      :delay-animation="0.5"
      :has-emit-event="true"
      @some-event="handleTextToDisplay"
      width="lg:w-96"
    />
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import WireCode from '../common/WireCode.vue'
import { gsap } from 'src/boot/gsap'

const nextText = ref(false)
const cardTitle = ref()

const animationSettings = useAnimationSettings()
const { isAnimating } = storeToRefs(animationSettings)

const { tm, t } = useI18n({ useScope: 'global' })
const tl = gsap.timeline({ delay: 0.5 })

const image = ref()
const imageSkeleton = ref()

const chatTexts = computed(() => {
  return nextText.value
    ? (tm('chatMessage.aboutDesktop.perso') as string[])
    : (tm('chatMessage.aboutDesktop.pro') as string[])
})

const imageToDisplay = computed(() => {
  return nextText.value ? 'images/aboutPage/moi2.jpg' : 'images/aboutPage/moi.jpg'
})

const title = computed(() => {
  return nextText.value ? t('about.personal.h3') : t('about.professionaly.h3')
})

onMounted(() => {
  isAnimating.value = true

  animationCardTitle()
  animationImage()
})

function animationCardTitle() {
  tl.to(cardTitle.value, {
    duration: 0.5,
    opacity: 1,
    text: { value: title.value },
    ease: 'none',
  })
}

function handleTextToDisplay() {
  nextText.value = !nextText.value
  animationCardTitle()
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
  tl.call(() => {
    isAnimating.value = false
  })
}
</script>

<style scoped>
.tab_panel_container {
  min-height: calc(100vh - 450px);
}
</style>
