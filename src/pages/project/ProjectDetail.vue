<template>
  <q-page class="q-pa-lg z-20" ref="el">
    <AppBackBtn ref="backButton" />
    <q-card
      class="my-card text-center flex flex-center"
      flat
      bordered
      :class="{ 'my-card-dark': $q.dark.mode }"
    >
      <q-card-section class="my-card-title">
        <div ref="cardOverline" class="text-overline text-grey opacity-50"></div>
        <div ref="cardTitle" class="text-h5 q-mt-sm q-mb-xs opacity-20 scale-50"></div>
        <div ref="cardCaption" class="text-caption text-grey my-1 opacity-50"></div>
      </q-card-section>
      <!-- <WireCode
        ref="imageSkeleton"
        content="&lt;img&gt;Image Project selected&lt;/img&gt;"
        class="flex flex-center w-5/6 border-2 border-solid border-gray-300 bg-grey-3"
        :style="{ height: imageHeight }"
      /> -->
      <q-carousel
        ref="carousel"
        swipeable
        animated
        v-model="slide"
        thumbnails
        transition-prev="jump-right"
        transition-next="jump-left"
        infinite
        :height="imageHeight"
        class="px-2 opacity-0 scale-75 carousel"
        :class="{ 'my-card-dark': $q.dark.mode }"
      >
        <q-carousel-slide
          v-for="(image, index) in findProject.imageURL"
          :key="index"
          :name="index"
          :img-src="`/images/projectsPage/${image}`"
        />
      </q-carousel>

      <q-card-actions class="w-full opacity-0 scale-0" ref="action">
        <q-btn
          v-if="findProject.link"
          flat
          :color="$q.dark.mode ? 'dark-primary' : 'primary'"
          :label="$t('cta.link')"
          @click="goToExternalLink(findProject.link)"
        />
      </q-card-actions>
    </q-card>

    <ChatMessageContainer
      ref="chatContainer"
      v-if="expanded"
      :delay-animation="0.2"
      :meTexts="[...findProject.description]"
      :visitor-texts="findProject.visitorChat"
    />
    <TheRobotContainer @robot-action="robotAction" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Project } from 'src/types/index'
import { gsap } from 'src/boot/gsap'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import { useQuasar } from 'quasar'
import AppBackBtn from 'src/components/common/AppBackBtn.vue'

const { tm } = useI18n({ useScope: 'global' })
const el = ref<HTMLElement | null>(null)
const route = useRoute()

const $q = useQuasar()

const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable } = storeToRefs(animationSettings)

const slide = ref(0)
const expanded = ref(false)

const action = useTemplateRef('action')
const chatContainer = useTemplateRef('chatContainer')

const carousel = useTemplateRef('carousel')
const backButton = useTemplateRef('backButton')

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

const imageHeight = computed(() => {
  return findProject.value.mobileFirst ? '450px' : '300px'
})

onMounted(() => {
  pageMounted.value = false
  animationCardTitle()
  animationImage()
})

function goToExternalLink(link: string) {
  window.open(link, '_blank')
}

function animationCardTitle() {
  const duration = 0.8
  tl.to(cardOverline.value, {
    duration,
    opacity: 1,

    text: { value: findProject.value.name, newClass: 'text-orange-9' },
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
      action.value!.$el,
      {
        duration: 0.5,
        opacity: 1,
        scale: 1,
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
  })
}

function robotAction() {
  if (!expanded.value) {
    expanded.value = !expanded.value
    isRobotClickable.value = false
  } else {
    gsap.to(chatContainer.value!.$el, {
      duration: 0.5,
      opacity: 0,
      onComplete() {
        expanded.value = false
      },
    })
  }
}
</script>

<style scoped lang="scss">
.my-card-title {
  height: 150px;
}

.my-card-dark {
  background: #121212;
}
.carousel {
  width: 270px;
}
.q-carousel__slide {
  border-radius: 5px;
  background-size: 270px 450px;
}
</style>
