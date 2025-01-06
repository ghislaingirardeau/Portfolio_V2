<template>
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
      <slot></slot>
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
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { onMounted, Ref, ref, watch } from 'vue'
import { gsap } from 'src/boot/gsap'

const currentSlide = defineModel('currentSlide', { type: Number, required: true })
const carousel = ref()
const carouselPrevious = ref()
const carouselNext = ref()

const { direction } = useSwipe(carousel)
const skeletonButtonLabel: Ref<string | undefined> = ref('<i>')
const skeletonButtonColor = ref('grey-4')
const skeletonButtonIconLeft: Ref<string | undefined> = ref(undefined)
const skeletonButtonIconRight: Ref<string | undefined> = ref(undefined)

const props = defineProps({
  slideNumber: {
    type: Number,
    required: true,
  },
  typeDesktop: {
    type: Boolean,
    required: true,
  },
})

function nextSlide() {
  if (currentSlide.value === props.slideNumber - 1) {
    currentSlide.value = 0
    return
  }
  currentSlide.value++
}

function previousSlide() {
  if (currentSlide.value === 0) {
    currentSlide.value = props.slideNumber - 1
    return
  }
  currentSlide.value--
}

onMounted(() => {
  const secondAnimOptions = {
    duration: 0.5,
    opacity: 0.7,
    scale: 1,
    delay: 0.3,
    ease: 'bounce.out',
  }
  /* Header tab anim 0.7s */
  const tlPrev = gsap.timeline({ delay: 0.8 })
  const tlNext = gsap.timeline({ delay: 0.8 })

  tlPrev
    .to(carouselPrevious.value.$el, {
      duration: 0.3,
      opacity: 0,
      scale: 0,
      onComplete: () => {
        skeletonButtonLabel.value = undefined
        skeletonButtonColor.value = 'secondary'
        skeletonButtonIconLeft.value = 'chevron_left'
      },
    })
    .to(carouselPrevious.value.$el, secondAnimOptions)
  tlNext
    .to(carouselNext.value.$el, {
      duration: 0.3,
      opacity: 0,
      scale: 0,
      onComplete: () => {
        skeletonButtonLabel.value = undefined
        skeletonButtonColor.value = 'secondary'
        skeletonButtonIconRight.value = 'chevron_right'
      },
    })
    .to(carouselNext.value.$el, secondAnimOptions)
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
</script>

<style scoped></style>
