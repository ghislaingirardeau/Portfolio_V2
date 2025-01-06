<template>
  <div class="row justify-around items-center mt-4">
    <q-icon :name="mdiArrowLeft" @click="previousSlide" class="cursor-pointer"></q-icon>
    <div class="w-48 h-72" :class="{ 'w-64': typeDesktop }">
      <slot></slot>
    </div>
    <q-icon :name="mdiArrowRight" @click="nextSlide" class="cursor-pointer"></q-icon>
  </div>
</template>

<script setup lang="ts">
import { mdiArrowLeft, mdiArrowRight } from '@quasar/extras/mdi-v7'
const currentSlide = defineModel('currentSlide', { type: Number, required: true })

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

/* const showRightArrow = computed(() => {
  return currentSlide.value !== props.slideNumber - 1
})

const showLeftArrow = computed(() => {
  return currentSlide.value !== 0
}) */

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
</script>

<style scoped></style>
