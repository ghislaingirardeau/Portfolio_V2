<template>
  <q-page class="q-pa-lg z-10" ref="el">
    <AppBackBtn ref="backButton" />
    <AppViewBtn ref="viewButton" v-if="findProject.link" :link="findProject.link" />
    <q-card
      class="text-center flex flex-center bg-transparent"
      flat
      bordered
      :class="{ 'my-card-dark': $q.dark.mode }"
    >
      <q-card-section class="my-card-title w-full">
        <div ref="cardOverline" class="text-h6 opacity-50" :class="overlineColor"></div>
        <div ref="cardTitle" class="text-h5 q-mt-sm q-mb-xs opacity-20 scale-50"></div>
        <div ref="cardCaption" class="text-h7 my-1 opacity-50" :class="captionColor"></div>
      </q-card-section>
      <q-carousel
        ref="carousel"
        swipeable
        animated
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        infinite
        class="px-2 opacity-0 scale-75 bg-transparent"
        :class="[carouselClass, darkModeClass, usePageMobileLandscapeClass]"
      >
        <q-carousel-slide v-for="(image, index) in findProject.imageURL" :key="index" :name="index">
          <q-img
            class="rounded-borders full-height"
            :src="`/images/projectsPage/${image}`"
            fit="contain"
          />
        </q-carousel-slide>
      </q-carousel>
    </q-card>

    <ChatMessageContainer
      v-if="expanded"
      :key="'chat' + chatSlide"
      :delay-animation="0.2"
      :meTexts="chatMeTexts"
      :visitor-texts="chatVisitorTexts"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Project, Description, VisitorChat } from 'src/types/index'
import { gsap } from 'src/boot/gsap'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import { useQuasar } from 'quasar'
import AppBackBtn from 'src/components/common/AppBackBtn.vue'
import AppViewBtn from 'src/components/common/AppViewBtn.vue'
import { useIsMobileTall, useIsTablet, usePageMobileLandscapeClass } from 'src/utils/useDeviceInfo'

const { tm } = useI18n({ useScope: 'global' })
const el = ref<HTMLElement | null>(null)
const route = useRoute()

const $q = useQuasar()

const animationSettings = useAnimationSettings()
const {
  pageMounted,
  isRobotClickable,
  isRobotTalk,
  isRobotStepBack,
  executeRobotAction,
  presentationMounted,
} = storeToRefs(animationSettings)

const slide = ref(0)
const expanded = ref(false)
const chatSlide = ref(-1)

const carousel = ref()
const backButton = useTemplateRef('backButton')
const viewButton = useTemplateRef('viewButton')

const cardOverline = ref<HTMLElement[]>([])
const cardTitle = ref<HTMLElement[]>([])
const cardCaption = ref<HTMLElement[]>([])

const tl = gsap.timeline({ delay: 0.5 })

const projects = computed(() => {
  return [...tm('projects.desktop'), ...tm('projects.mobile')] as Project[]
})

const findProject = computed(() => {
  return projects.value.find((e) => e.id === route.params.id) as Project
})

const chatMeTexts = computed(() => {
  return findProject.value.description[chatSlide.value as keyof Description]
})

const chatVisitorTexts = computed(() => {
  return findProject.value.visitorChat[chatSlide.value as keyof VisitorChat]
})

const captionColor = computed(() => {
  return $q.dark.mode ? 'text-gray-300' : 'text-gray-400'
})

const overlineColor = computed(() => {
  return $q.dark.mode ? 'text-dark-secondary' : 'text-secondary'
})

const carouselClass = computed(() => {
  if (useIsTablet()) {
    return 'w-6/12 h-full'
  }
  if (useIsMobileTall()) {
    return 'w-4/5 h-11/12'
  } else {
    return 'w-4/5 h-10/12'
  }
})

const darkModeClass = computed(() => {
  return $q.dark.mode ? 'my-card-dark' : ''
})

onMounted(() => {
  if (!presentationMounted.value) {
    presentationMounted.value = true
  }
  pageMounted.value = false
  isRobotTalk.value = true
  animationCardTitle()
  animationImage()
})

function animationCardTitle() {
  const duration = 0.8
  tl.to(cardOverline.value, {
    duration,
    opacity: 1,

    text: { value: findProject.value.name },
    ease: 'ease',
  })
    .to(
      cardTitle.value,
      {
        duration,
        opacity: 1,
        scale: 1,
        text: { value: findProject.value.summary },
        ease: 'ease',
      },
      '<',
    )
    .to(
      cardCaption.value,
      {
        duration,
        opacity: 1,

        text: { value: findProject.value.tech },
        ease: 'ease',
      },
      '<',
    )
}

function animationImage() {
  tl.to(carousel.value!.$el, {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    ease: 'hop',
  })
    .to(
      viewButton.value!.$el,
      {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: 'hop',
      },
      '<',
    )
    .to(
      backButton.value!.$el,
      {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: 'hop',
      },
      '<',
    )
  tl.call(() => {
    pageMounted.value = true
    isRobotClickable.value = true
    isRobotTalk.value = true
  })
}

// When click on the robot inside the layout, it will execute the action
watch(
  () => executeRobotAction.value,
  (newValue: boolean) => {
    if (newValue) {
      robotAction()
      executeRobotAction.value = false
    }
  },
)

function robotAction() {
  if (isRobotClickable.value) {
    if (!expanded.value) {
      expanded.value = !expanded.value
      chatSlide.value = 0
      return
    }
    if (expanded.value && chatSlide.value === 0) {
      chatSlide.value++
      isRobotTalk.value = false
      isRobotStepBack.value = true
      return
    }
    if (expanded.value && chatSlide.value === 1) {
      expanded.value = false
      isRobotTalk.value = true
      isRobotStepBack.value = false
      return
    }
  }
}
</script>

<style scoped lang="scss">
.my-card-title {
  height: 120px;
}

.my-card-dark {
  background: #121212;
}
.carousel {
  width: 470px;
  height: 600px;
}
.q-carousel__slide {
  border-radius: 5px;
  background-size: 270px 450px;
}
</style>
