<template>
  <div
    ref="carousel"
    class="row justify-around items-center mt-4"
    :class="{ relative: typeDesktop }"
  >
    <q-btn
      round
      fab-mini
      @click="previousSlide"
      color="secondary"
      icon="chevron_left"
      class="z-10 opacity-70"
      :class="{ 'absolute left-1 ': typeDesktop }"
    />
    <div class="w-48 h-72" :class="{ 'w-72': typeDesktop }">
      <slot></slot>
    </div>
    <q-btn
      round
      fab-mini
      color="secondary"
      @click="nextSlide"
      icon="chevron_right"
      :class="{ 'absolute right-1 ': typeDesktop }"
      class="z-10 opacity-70"
    />
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { ref, watch } from 'vue'

const currentSlide = defineModel('currentSlide', { type: Number, required: true })
const carousel = ref()
const { direction } = useSwipe(carousel)

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
