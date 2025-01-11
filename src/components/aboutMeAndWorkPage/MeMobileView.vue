<template>
  <q-page class="q-pa-lg">
    <!-- <component :is="PanelImage" :name="tab" v-model:is-first-mounted="isFirstMounted" /> -->

    <div
      ref="imageContainer"
      class="flex flex-center lg:justify-start relative"
      :class="{ 'mt-20': useIsMobileTall() }"
    >
      <q-img
        :src="imageToDisplay"
        ref="image"
        alt="photo de Ghislain montagne"
        fit="cover"
        class="rounded-borders opacity-0 w-10/12 lg:w-2/5"
      />

      <div ref="imageOverlay" class="w-10/12 h-full bg-black absolute opacity-0 flex flex-center">
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
import { mdiGestureSwipe } from '@quasar/extras/mdi-v7'
import { useSwipe } from '@vueuse/core'
import { useIsMobileTall } from 'src/utils/useDeviceInfo'

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

const slideNumber = computed(() => {
  return Object.keys(tm(`chatMessage.meMobile`) as string[]).length - 1
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

watch(
  () => meSlide.value,
  (newValue) => {
    if (newValue === slideNumber.value) {
      isRobotClickable.value = false
    } else {
      isRobotClickable.value = true
    }
  },
)

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
  if (!pageMounted.value) {
    return
  }
  tl.to(image.value.$el, {
    duration: 0.5,
    x: -x,
    opacity: 0,
  })
    .to(image.value.$el, {
      duration: 0.1,
      x,
      opacity: 0,
      onComplete() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        increase ? meSlide.value++ : meSlide.value--
      },
    })
    .to(image.value.$el, {
      duration: 0.5,
      x: 0,
      opacity: 1,
    })
}

function robotAction() {
  if (meSlide.value === slideNumber.value) {
    return
  } else {
    animationOnSlide(10, true)
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

<style scoped>
.img-square {
  --_g: 10% /45% 45% no-repeat linear-gradient(#000 0 0);
  --m: left var(--_i, 0%) top var(--_g), bottom var(--_i, 0%) left var(--_g),
    top var(--_i, 0%) right var(--_g), right var(--_i, 0%) bottom var(--_g);
  -webkit-mask: var(--m);
  mask: var(--m);
  filter: grayscale();
  transition: 0.3s linear;
  cursor: pointer;
}
.img-square:hover {
  --_i: 10%;
  filter: grayscale(0);
}
</style>
