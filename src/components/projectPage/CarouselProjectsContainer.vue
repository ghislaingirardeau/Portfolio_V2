<template>
  <div
    ref="carousel"
    class="row justify-around lg:items-center lg:justify-start"
    :class="carouselClasses.carousel"
  >
    <div :class="carouselClasses.btnPrevious">
      <q-btn
        :disable="currentSlide === 0"
        ref="carouselPrevious"
        round
        size="sm"
        @click="previousSlide"
        :color="$q.dark.mode ? 'dark-primary' : 'primary'"
        icon="chevron_left"
        class="opacity-0 scale-0 z-30 md:mr-5"
      />
    </div>

    <div class="relative" :class="carouselClasses.carouselSlide">
      <div ref="carouselSlide" class="opacity-0 scale-75">
        <CarouselSlide
          :key="currentSlide"
          :current-slide="currentSlide"
          :type-desktop="typeDesktop"
        />
      </div>
    </div>

    <div :class="carouselClasses.btnNext">
      <q-btn
        :disable="endSlider"
        ref="carouselNext"
        round
        size="sm"
        @click="nextSlide"
        :color="$q.dark.mode ? 'dark-primary' : 'primary'"
        icon="chevron_right"
        class="opacity-0 scale-0 z-30 md:ml-5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useI18n } from 'vue-i18n'
import CarouselSlide from './carouselSlide.vue'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useQuasar } from 'quasar'

const { tm } = useI18n({ useScope: 'global' })
const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable, isRobotTalk } = storeToRefs(animationSettings)

const $q = useQuasar()

const currentSlide = defineModel('currentSlide', { type: Number, required: true })

const emits = defineEmits(['slide-change'])

const props = defineProps({
  typeDesktop: {
    type: Boolean,
    required: true,
  },
})

const carousel = ref()
const carouselPrevious = ref()
const carouselNext = ref()
const carouselSlide = ref()
const tl = gsap.timeline()

const carouselClasses = computed(() => {
  const classes = {
    carousel: props.typeDesktop ? 'lg:ml-4 lg:w-1/2 relative' : 'lg:ml-16',
    btnPrevious: props.typeDesktop ? 'absolute left-1 top-1/2' : 'flex flex-center w-10',
    btnNext: props.typeDesktop ? 'absolute right-1 top-1/2' : 'flex flex-center w-10',
    carouselSlide: props.typeDesktop ? 'w-full md:w-4/5 lg:w-full' : 'w-48 md:w-96 lg:w-64',
  }
  if (!useIsMobile()) {
    classes.carousel += ' carousel_container_desktop'
  }
  return classes
})

const { direction } = useSwipe(carousel)

const slideNumber = computed(() => {
  return props.typeDesktop ? [...tm('projects.desktop')].length : [...tm('projects.mobile')].length
})

const endSlider = computed(() => {
  return currentSlide.value === slideNumber.value - 1
})

onMounted(() => {
  animationSettings.resetRobotAction()
  isRobotTalk.value = true
  pageMounted.value = false
  animationSlide()
  animationSlideButtons()
})

onUnmounted(() => {
  tl.kill()
  tl.clear()
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
    },
  }

  tl.to(carouselPrevious.value.$el, secondAnimOptions)
  tl.to(carouselNext.value.$el, secondAnimOptions, '<')
}
</script>

<style scoped lang="scss">
.carousel_container_mobile {
  min-height: calc(100vh - 200px);
}
.carousel_container_desktop {
  height: calc(100vh - 150px);
}

:deep() {
  .q-btn.disabled {
    background-color: $dark !important;
  }
}
</style>
