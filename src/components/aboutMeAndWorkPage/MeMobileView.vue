<template>
  <q-page class="q-pa-lg">
    <!-- <component :is="PanelImage" :name="tab" v-model:is-first-mounted="isFirstMounted" /> -->

    <div class="flex flex-center lg:justify-start relative">
      <WireCode
        ref="imageSkeleton"
        content="&lt;div&gt;Image About me&lt;/div&gt;"
        class="flex flex-center w-72 h-40 border-2 border-solid border-gray-300 bg-grey-3 absolute"
      />
      <q-img
        :src="imageToDisplay"
        ref="image"
        alt="photo de Ghislain montagne"
        fit="contain"
        class="rounded-borders opacity-0 w-10/12 lg:w-2/5"
        width="100%"
      />
      <div class="w-full h-full bg-black absolute opacity-55 flex flex-center">
        <q-icon :name="mdiHand" color="primary" size="xl"></q-icon>
      </div>
    </div>

    <TheRobotContainer @robot-action="robotAction" />
    <ChatMessageContainer
      :key="'chat' + meSlide"
      :meTexts="chatTexts"
      :visitor-texts="visitorChatTexts"
      :delay-animation="0.5"
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
import { useRoute } from 'vue-router'
import WireCode from '../common/WireCode.vue'
import { mdiHand } from '@quasar/extras/mdi-v5'

const route = useRoute()
const animationSettings = useAnimationSettings()
const { pageMounted } = storeToRefs(animationSettings)

const meSlide = ref(0)
const image = ref()
const imageSkeleton = ref()

const tl = gsap.timeline({ delay: 0.5 })

const { tm } = useI18n({ useScope: 'global' })

const chatTexts = computed(() => {
  return route.name === 'aboutMe'
    ? (tm(`chatMessage.meMobile.${meSlide.value}.description`) as string[])
    : (tm(`chatMessage.workEnvMobile.${meSlide.value}.description`) as string[])
})

const visitorChatTexts = computed(() => {
  return route.name === 'aboutMe'
    ? tm(`chatMessage.meMobile.${meSlide.value}.title`)
    : tm(`chatMessage.workEnvMobile.${meSlide.value}.title`)
})

const imageToDisplay = computed(() => {
  return route.name === 'aboutMe'
    ? 'images/aboutPage/' + tm(`about.personal.imageURL`)[meSlide.value]
    : 'images/aboutPage/' + tm(`about.professionaly.imageURL`)[meSlide.value]
})

onMounted(() => {
  animationImage()
})

function robotAction() {
  if (meSlide.value === Object.keys(tm(`chatMessage.meMobile`) as string[]).length) {
    meSlide.value = 0
  } else {
    meSlide.value++
  }
}

function animationImage() {
  tl.to(imageSkeleton.value.$el, {
    duration: 0.3,
    opacity: 0,
  }).to(image.value.$el, {
    duration: 0.5,
    opacity: 1,
  })
  tl.call(() => {
    pageMounted.value = true
  })
}
</script>

<style scoped></style>
