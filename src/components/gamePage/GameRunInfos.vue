<template>
  <div class="w-full flex lg:flex-col justify-around">
    <div class="flex lg:flex-col items-center mx-4 lg:mx-0 lg:my-4">
      <span class="m-2 text-lg">Timer</span>
      <span class="m-2 text-3xl">{{ formatMilliseconds(TIMER_SCORE) }}</span>
    </div>
    <div class="flex lg:flex-col items-center">
      <span class="m-2 text-lg">Points</span>
      <span class="m-2 text-3xl">{{ GAME_SCORE }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatMilliseconds } from 'src/utils/useTimeFormat'

defineProps({
  TIMER_SCORE: {
    type: Number,
    required: true,
  },
  GAME_SCORE: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped></style>
