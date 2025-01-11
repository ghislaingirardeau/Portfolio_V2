<template>
  <q-page class="q-pa-lg">
    <!-- <component :is="PanelImage" :name="tab" v-model:is-first-mounted="isFirstMounted" /> -->

    <div ref="imageContainer" class="flex flex-center lg:justify-start relative">
      <q-img
        :src="imageToDisplay"
        ref="image"
        alt="photo de Ghislain montagne"
        fit="contain"
        class="rounded-borders opacity-0 w-10/12 lg:w-2/5"
        width="100%"
      />
      <div ref="imageOverlay" class="w-full h-full bg-black absolute opacity-0 flex flex-center">
        <q-icon ref="imageOverlayIcon" :name="mdiGestureSwipe" color="primary" size="xl"></q-icon>
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
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import WireCode from '../common/WireCode.vue'
import { mdiGestureSwipe } from '@quasar/extras/mdi-v7'
import { useSwipe } from '@vueuse/core'

const route = useRoute()
const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable } = storeToRefs(animationSettings)

const meSlide = ref(0)
const image = ref()
const imageOverlay = ref()
const imageOverlayIcon = ref()
const imageContainer = ref()

const { direction } = useSwipe(imageContainer)

const tl = gsap.timeline()

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
  isRobotClickable.value = true
  animationImage()
})

watch(
  () => direction.value,
  (newValue) => {
    if (newValue === 'left') {
      nextSlide()
    } else if (newValue === 'right') {
      previousSlide()
    }
  },
)

function nextSlide() {
  if (meSlide.value === Object.keys(tm(`chatMessage.meMobile`) as string[]).length - 1) {
    return
  }
  meSlide.value++
}

function previousSlide() {
  if (meSlide.value === 0) {
    return
  }
  meSlide.value--
}

function robotAction() {
  if (meSlide.value === Object.keys(tm(`chatMessage.meMobile`) as string[]).length) {
    meSlide.value = 0
  } else {
    meSlide.value++
  }
}

function animationImage() {
  const duration = 0.5
  tl.to(image.value.$el, {
    duration,
    opacity: 1,
  })
    .to(imageOverlay.value, {
      duration,
      opacity: 0.55,
    })
    .to(imageOverlayIcon.value.$el, {
      duration: 0.3,
      rotate: 25,
      x: 15,
    })
    .to(imageOverlayIcon.value.$el, {
      duration: 0.3,
      rotate: -25,
      x: -15,
    })
    .to(imageOverlayIcon.value.$el, {
      duration: 0.3,
      rotate: 0,
      x: 0,
    })
    .to(imageOverlay.value, {
      duration,
      opacity: 0,
    })
  tl.call(() => {
    pageMounted.value = true
  })
}
</script>

<style scoped></style>
