<template>
  <q-tab-panel :name="name">
    <div
      ref="carousel"
      class="row justify-around md:justify-center items-center"
      :class="{ relative: typeDesktop, carousel_container: !useIsMobile() }"
    >
      <q-btn
        ref="carouselPrevious"
        round
        size="sm"
        @click="previousSlide"
        :color="$q.dark.mode ? 'dark-primary' : 'primary'"
        icon="chevron_left"
        class="opacity-0 scale-0 z-30 md:mr-5"
        :disable="currentSlide === 0"
        :class="{ 'absolute left-1 ': typeDesktop }"
      />
      <div class="relative" :class="slideContainerClass">
        <div ref="carouselSlide" class="opacity-0 scale-75">
          <CarouselSlide
            :key="currentSlide"
            :current-slide="currentSlide"
            :type-desktop="typeDesktop"
          />
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
        :disable="endSlider"
        class="opacity-0 scale-0 z-30 md:ml-5"
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
import { useIsMobile, useIsMobileTall, useIsTablet } from 'src/utils/useDeviceInfo'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useQuasar } from 'quasar'

const { tm } = useI18n({ useScope: 'global' })
const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable, isRobotTalk } = storeToRefs(animationSettings)

const $q = useQuasar()

const currentSlide = defineModel('currentSlide', { type: Number, required: true })
const isFirstMounted = defineModel('isFirstMounted', { type: Boolean, required: true })

const emits = defineEmits(['slide-change'])

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
  if (useIsMobile()) {
    if (useIsTablet()) {
      return props.typeDesktop ? 'w-5/6 h-4/5' : 'w-60 h-4/5'
    } else if (useIsMobileTall()) {
      return props.typeDesktop ? 'h-60 w-72' : 'w-48 h-96'
    } else {
      return props.typeDesktop ? 'h-48 w-72' : 'w-44 h-72'
    }
  } else {
    return props.typeDesktop ? 'w-5/6 h-4/5' : 'w-60 h-3/5'
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
  emits('slide-change')
}

function previousSlide() {
  if (currentSlide.value === 0) {
    return
  }
  currentSlide.value--
  emits('slide-change')
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
    opacity: 0.8,
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

<style scoped>
.carousel_container {
  min-height: calc(100vh - 250px);
}
</style>
