<template>
  <q-tab-panel :name="name">
    <div ref="carousel" class="row justify-around items-center" :class="{ relative: typeDesktop }">
      <q-btn
        ref="carouselPrevious"
        round
        size="sm"
        @click="previousSlide"
        :color="$q.dark.mode ? 'dark-primary' : 'primary'"
        icon="chevron_left"
        class="z-10 opacity-0 scale-0"
        :class="{ 'absolute left-1 ': typeDesktop }"
      />
      <div class="relative" :class="slideContainerClass">
        <div ref="carouselSlide" class="opacity-0 scale-75">
          <CarouselSlide :current-slide="currentSlide" :type-desktop="typeDesktop" />
        </div>
      </div>
      <q-btn
        ref="carouselNext"
        round
        size="sm"
        @click="nextSlide"
        :color="$q.dark.mode ? 'dark-primary' : 'primary'"
        icon="chevron_right"
        :class="{ 'absolute right-1 ': typeDesktop }"
        class="z-10 opacity-0 scale-0"
      />
    </div>
  </q-tab-panel>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useI18n } from 'vue-i18n'
import CarouselSlide from './carouselSlide.vue'
import { useIsMobileTall } from 'src/utils/useDeviceInfo'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useQuasar } from 'quasar'

const { tm } = useI18n({ useScope: 'global' })
const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable, isRobotTalk } = storeToRefs(animationSettings)

const $q = useQuasar()

const currentSlide = defineModel('currentSlide', { type: Number, required: true })
const isFirstMounted = defineModel('isFirstMounted', { type: Boolean, required: true })

const carousel = ref()
const carouselPrevious = ref()
const carouselNext = ref()
const carouselSlide = ref()
const tl = gsap.timeline({ delay: isFirstMounted.value ? 1 : 0 })

const { direction } = useSwipe(carousel)

const slideNumber = computed(() => {
  return props.typeDesktop ? [...tm('projects.desktop')].length : [...tm('projects.mobile')].length
})

const endSlider = computed(() => {
  return currentSlide.value === slideNumber.value - 1
})

const slideContainerClass = computed(() => {
  if (useIsMobileTall()) {
    return props.typeDesktop ? 'h-60 w-72' : 'w-48 h-96'
  } else {
    return props.typeDesktop ? 'h-48 w-72' : 'w-44 h-72'
  }
})

const props = defineProps({
  typeDesktop: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  animationSettings.navigationRestartRobot()
  isRobotTalk.value = true
  pageMounted.value = false
  animationSlide()
  animationSlideButtons()
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
  if (endSlider.value) {
    return
  }
  currentSlide.value++
}

function previousSlide() {
  if (currentSlide.value === 0) {
    return
  }
  currentSlide.value--
}

function animationSlide() {
  tl.to(carouselSlide.value, {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    ease: 'hop',
  })
}

function animationSlideButtons() {
  const secondAnimOptions = {
    duration: 0.5,
    opacity: 0.7,
    scale: 1,
    ease: 'hop',
    onComplete() {
      pageMounted.value = true
      isRobotClickable.value = true
      isFirstMounted.value = false
    },
  }

  tl.to(carouselPrevious.value.$el, secondAnimOptions)
  tl.to(carouselNext.value.$el, secondAnimOptions, '<')
}
</script>

<style scoped></style>
