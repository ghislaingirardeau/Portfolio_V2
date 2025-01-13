<template>
  <q-tab-panel :name="name">
    <div ref="carousel" class="row justify-around items-center" :class="{ relative: typeDesktop }">
      <q-btn
        ref="carouselPrevious"
        round
        size="sm"
        @click="previousSlide"
        :label="skeletonButtonLabel"
        :color="skeletonButtonColor"
        :icon="skeletonButtonIconLeft"
        class="z-10"
        :class="{ 'absolute left-1 ': typeDesktop }"
      />
      <div class="relative" :class="slideContainerClass">
        <WireCode
          ref="carouselSlideSkeleton"
          v-show="isFirstMounted"
          content=""
          class="flex flex-center mt-10 w-44 h-64 border-2 border-solid border-gray-300 bg-grey-3 absolute"
        />

        <div ref="carouselSlide" class="opacity-0">
          <CarouselSlide :current-slide="currentSlide" :type-desktop="typeDesktop" />
        </div>
      </div>
      <q-btn
        ref="carouselNext"
        round
        size="sm"
        @click="nextSlide"
        :label="skeletonButtonLabel"
        :color="skeletonButtonColor"
        :icon="skeletonButtonIconRight"
        :class="{ 'absolute right-1 ': typeDesktop }"
        class="z-10"
      />
    </div>
  </q-tab-panel>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useI18n } from 'vue-i18n'
import CarouselSlide from './carouselSlide.vue'
import WireCode from '../common/WireCode.vue'
import { useIsMobileTall } from 'src/utils/useDeviceInfo'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'

const { tm } = useI18n({ useScope: 'global' })
const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable } = storeToRefs(animationSettings)

const currentSlide = defineModel('currentSlide', { type: Number, required: true })
const isFirstMounted = defineModel('isFirstMounted', { type: Boolean, required: true })

const carousel = ref()
const carouselPrevious = ref()
const carouselNext = ref()
const carouselSlideSkeleton = ref()
const carouselSlide = ref()

const { direction } = useSwipe(carousel)
const skeletonButtonLabel: Ref<string | undefined> = ref('')
const skeletonButtonColor = ref('grey-4')
const skeletonButtonIconLeft: Ref<string | undefined> = ref(undefined)
const skeletonButtonIconRight: Ref<string | undefined> = ref(undefined)

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
  animationSlideButtons()
  animationSlide()
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
  const tl = gsap.timeline({ delay: isFirstMounted.value ? 0.8 : 0 })
  tl.to(carouselSlideSkeleton.value.$el, {
    duration: 0.3,
    opacity: 0,
  }).to(carouselSlide.value, {
    duration: 0.5,
    delay: 0.3,
    opacity: 1,
  })
}

function animationSlideButtons() {
  const firstAnimOptions = {
    duration: 0.3,
    opacity: 0,
    scale: 0,
    onComplete() {
      designButton('chevron_left')
    },
  }
  const secondAnimOptions = {
    duration: 0.5,
    opacity: 0.7,
    scale: 1,
    delay: 0.3,
    ease: 'hop',
    onComplete() {
      pageMounted.value = true
      isRobotClickable.value = true
    },
  }
  const designButton = (direction: string) => {
    skeletonButtonLabel.value = undefined
    skeletonButtonColor.value = 'secondary'
    if (direction.includes('right')) {
      skeletonButtonIconRight.value = direction
    } else {
      skeletonButtonIconLeft.value = direction
    }
    isFirstMounted.value = false
  }
  /* Header tab anim 0.7s */
  const tlPrev = gsap.timeline({ delay: isFirstMounted.value ? 0.8 : 0 })
  const tlNext = gsap.timeline({ delay: isFirstMounted.value ? 0.8 : 0 })

  tlPrev
    .to(carouselPrevious.value.$el, {
      ...firstAnimOptions,
      onComplete() {
        designButton('chevron_left')
      },
    })
    .to(carouselPrevious.value.$el, secondAnimOptions)
  tlNext
    .to(carouselNext.value.$el, {
      ...firstAnimOptions,
      onComplete() {
        designButton('chevron_right')
      },
    })
    .to(carouselNext.value.$el, secondAnimOptions)
}
</script>

<style scoped></style>
