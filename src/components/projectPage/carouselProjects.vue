<template>
  <q-tab-panel :name="name">
    <div
      ref="carousel"
      class="row justify-around items-center mt-4"
      :class="{ relative: typeDesktop }"
    >
      <q-btn
        ref="carouselPrevious"
        round
        fab-mini
        @click="previousSlide"
        :label="skeletonButtonLabel"
        :color="skeletonButtonColor"
        :icon="skeletonButtonIconLeft"
        class="z-10"
        :class="{ 'absolute left-1 ': typeDesktop }"
      />
      <div class="w-48 h-72" :class="{ 'w-72': typeDesktop }">
        <CarouselSlide :current-slide="currentSlide" :type-desktop="typeDesktop" />
      </div>
      <q-btn
        ref="carouselNext"
        round
        fab-mini
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

const { tm } = useI18n({ useScope: 'global' })

const currentSlide = defineModel('currentSlide', { type: Number, required: true })
const isFirstMounted = defineModel('isFirstMounted', { type: Boolean, required: true })

const carousel = ref()
const carouselPrevious = ref()
const carouselNext = ref()

const { direction } = useSwipe(carousel)
const skeletonButtonLabel: Ref<string | undefined> = ref('<i>')
const skeletonButtonColor = ref('grey-4')
const skeletonButtonIconLeft: Ref<string | undefined> = ref(undefined)
const skeletonButtonIconRight: Ref<string | undefined> = ref(undefined)

const slideNumber = computed(() => {
  return props.typeDesktop ? [...tm('projects.desktop')].length : [...tm('projects.mobile')].length
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
})

watch(
  () => direction.value,
  (newValue) => {
    if (newValue === 'left') {
      previousSlide()
    } else if (newValue === 'right') {
      nextSlide()
    }
  },
)

function nextSlide() {
  if (currentSlide.value === slideNumber.value - 1) {
    currentSlide.value = 0
    return
  }
  currentSlide.value++
}

function previousSlide() {
  if (currentSlide.value === 0) {
    currentSlide.value = slideNumber.value - 1
    return
  }
  currentSlide.value--
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
    ease: 'bounce.out',
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
