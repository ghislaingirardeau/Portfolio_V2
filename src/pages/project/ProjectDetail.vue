<template>
  <q-page class="q-pa-lg" ref="el">
    <q-btn
      :icon="mdiKeyboardReturn"
      round
      color="secondary"
      class="absolute z-10 top-2 left-2"
      @click="router.go(-1)"
    ></q-btn>
    <q-card class="my-card text-center" flat bordered>
      <q-card-section>
        <div ref="cardOverline" class="text-overline text-grey opacity-50">
          &lt;div&gt;Project name&lt;/div&gt;
        </div>
        <div ref="cardTitle" class="text-h5 q-mt-sm q-mb-xs opacity-20 scale-50">
          &lt;h1&gt;summary&lt;/h1&gt;
        </div>
        <div ref="cardCaption" class="text-caption text-grey my-1 opacity-50">
          &lt;div&gt;Project tech&lt;/div&gt;
        </div>
      </q-card-section>
      <WireCode
        ref="imageSkeleton"
        content="&lt;img&gt;Image Project selected&lt;/img&gt;"
        class="flex flex-center w-full border-2 border-solid border-gray-300 bg-grey-3 absolute"
        :style="{ height: imageHeight }"
      />
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
        class="px-2 opacity-0"
      >
        <q-carousel-slide
          v-for="(image, index) in findProject.imageURL"
          :key="index"
          :name="index"
          :img-src="`/images/projectsPage/${image}`"
        />
      </q-carousel>

      <q-card-actions>
        <q-btn
          v-if="findProject.link"
          flat
          color="secondary"
          :label="$t('cta.link')"
          @click="goToExternalLink(findProject.link)"
        />
      </q-card-actions>
    </q-card>

    <ChatMessageContainer
      v-if="expanded"
      :delay-animation="0.5"
      :meTexts="[findProject.description]"
      :visitor-texts="findProject.visitorChat"
    />
    <TheRobotContainer @robot-action="expanded = !expanded" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Project } from 'src/types/index'
import { gsap } from 'src/boot/gsap'
import { mdiKeyboardReturn } from '@quasar/extras/mdi-v7'
import WireCode from 'src/components/common/WireCode.vue'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'

const { tm } = useI18n({ useScope: 'global' })
const el = ref<HTMLElement | null>(null)
const route = useRoute()
const router = useRouter()

const animationSettings = useAnimationSettings()
const { pageMounted } = storeToRefs(animationSettings)

const slide = ref(0)
const expanded = ref(false)

const imageSkeleton = useTemplateRef('imageSkeleton')
const carousel = useTemplateRef('carousel')

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
  return findProject.value.mobileFirst ? '550px' : '300px'
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
  tl.to(cardOverline.value, {
    duration: 1,
    opacity: 1,

    text: { value: findProject.value.name, newClass: 'text-orange-9' },
    ease: 'none',
  })
    .to(cardTitle.value, {
      duration: 1,
      opacity: 1,
      scale: 1,
      text: { value: findProject.value.summary },
      ease: 'none',
    })
    .to(cardCaption.value, {
      duration: 1,
      opacity: 1,

      text: { value: findProject.value.tech },
      ease: 'none',
    })
}

function animationImage() {
  tl.to(imageSkeleton.value!.$el, {
    duration: 0.3,
    opacity: 0,
  }).to(carousel.value!.$el, {
    duration: 0.5,
    delay: 0.3,
    opacity: 1,
  })
  tl.call(() => {
    pageMounted.value = true
  })
}
</script>

<style scoped lang="scss">
.q-carousel__slide {
  border-radius: 10px;
}
</style>
