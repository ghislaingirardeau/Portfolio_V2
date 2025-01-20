<template>
  <q-page class="q-pa-lg" :key="locale">
    <div
      ref="imageContainer"
      class="w-full flex flex-center relative z-10"
      :class="{ 'mt-10': useIsMobileTall() }"
    >
      <q-img
        :src="imageToDisplay"
        ref="image"
        alt="photo de Ghislain montagne"
        fit="contain"
        class="rounded-borders opacity-0 w-10/12 lg:w-2/5 img-square"
        :width="imageWidth"
        :class="{ 'img-square-done': fixImage }"
      >
        <AppImgOverlay v-if="isFirstMount" />
      </q-img>
    </div>

    <TheRobotContainer @robot-action="robotAction" />

    <ChatMessageContainer
      ref="chatContainer"
      :key="'chatContainer' + meSlide"
      :meTexts="chatTexts"
      :visitor-texts="visitorChatTexts"
      :delay-animation="0.5"
    />
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useSwipe } from '@vueuse/core'
import { useIsMobileTall } from 'src/utils/useDeviceInfo'
import AppImgOverlay from '../common/AppImgOverlay.vue'

const route = useRoute()
const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable, isRobotFix, isRobotTap } = storeToRefs(animationSettings)

const meSlide = ref(0)
const image = ref()
const imageContainer = ref()
const isFirstMount = ref(false)

const chatContainer = useTemplateRef('chatContainer')

const fixImage = ref(false)

const { direction } = useSwipe(imageContainer)

const tl = gsap.timeline()

const { tm, locale } = useI18n({ useScope: 'global' })

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

const imageWidth = computed(() => {
  return useIsMobileTall() ? '100%' : '80%'
})

const slideNumber = computed(() => {
  return Object.keys(tm(`chatMessage.meMobile`) as string[]).length - 1
})

onMounted(() => {
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

watch(locale, (newValue) => {
  console.log(newValue, 'load img')
  setTimeout(() => {
    animationImage()
  }, 200)
})

// watch(
//   () => fixImage.value,
//   (newValue) => {
//     if (newValue) {
//       isRobotClickable.value = false
//     } else {
//       isRobotClickable.value = true
//     }
//   },
// )

function nextSlide() {
  if (meSlide.value === slideNumber.value) {
    return
  }
  animationOnSlide(10, true)
}

function previousSlide() {
  if (meSlide.value === 0) {
    return
  }
  animationOnSlide(-10, false)
}

function animationOnSlide(x: number, increase: boolean) {
  const duration = 0.5
  if (!pageMounted.value) {
    return
  }
  tl.to(image.value.$el, {
    duration,
    x: -x,
    opacity: 0,
    onComplete() {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      increase ? meSlide.value++ : meSlide.value--
      fixImage.value = false
      isRobotClickable.value = true
      isRobotFix.value = true
      isFirstMount.value = false
    },
  })
    .to(
      chatContainer.value!.$el,
      {
        duration,
        opacity: 0,
      },
      '<',
    )
    .to(image.value.$el, {
      duration,
      x: 0,
      opacity: 1,
    })
    .to(chatContainer.value!.$el, {
      duration,
      x: 0,
      opacity: 1,
    })
}

function robotAction() {
  if (isRobotFix.value) {
    fixImage.value = true
    isRobotTap.value = true
    isRobotFix.value = false
    return
  }
  if (isRobotTap.value) {
    isFirstMount.value = true
    isRobotTap.value = false
    isRobotFix.value = false
    return
  }
}

function animationImage() {
  const duration = 0.5
  tl.to(image.value.$el, {
    duration,
    opacity: 0.9,
  })
  tl.call(() => {
    isRobotClickable.value = true
    pageMounted.value = true
    isRobotFix.value = true
  })
}
</script>

<style scoped>
.img-square {
  --_g: 10% /45% 45% no-repeat linear-gradient(#000 0 0);
  --m: left var(--_i, 0%) top var(--_g), bottom var(--_i, 0%) left var(--_g),
    top var(--_i, 0%) right var(--_g), right var(--_i, 0%) bottom var(--_g);
  -webkit-mask: var(--m);
  mask: var(--m);
  filter: grayscale();
  cursor: pointer;
  transition: 0.3s linear;
}
.img-square-done {
  --_i: 10%;
  filter: grayscale(0);
  border-radius: 20%;
}
</style>
