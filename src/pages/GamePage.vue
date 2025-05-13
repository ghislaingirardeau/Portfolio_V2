<template>
  <q-page padding>
    <!-- <h1 class="text-xl">PacMan mini Game</h1> -->
    <!-- <header class="my-2">
      <q-btn color="primary" label="Restart" @click="resetGame" />
    </header> -->
    <!-- <pacman-container :key="GAME_COUNTER" /> -->
    <q-btn v-if="isGameStop" color="primary" label="Start" @click="startGame" class="mb-2 mr-2" />

    <q-btn v-if="isGameStop" color="primary" label="Restart" @click="resetGame" class="mb-2 mr-2" />

    <PacmanCanvas
      :key="GAME_COUNTER"
      v-model:gameStart="isGameStart"
      v-model:gameStop="isGameStop"
    />
  </q-page>
</template>

<script setup lang="ts">
import PacmanCanvas from 'src/components/gamePage/PacmanCanvas.vue'
import { ref } from 'vue'

const GAME_COUNTER = ref(0)
const isGameStart = ref(false)
const isGameStop = ref(true)

function resetGame() {
  GAME_COUNTER.value++
}

function startGame() {
  isGameStart.value = true
  isGameStop.value = false
}
</script>

<style scoped></style>
