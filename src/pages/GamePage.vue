<template>
  <q-page padding ref="gameContainer" class="lg:flex">
    <header class="my-2 flex flex-center lg:justify-start lg:flex-col lg:w-40">
      <q-btn
        v-if="!isGameStart && isGameReady"
        color="primary"
        label="Start"
        @click="startGame"
        class="m-2"
      />

      <q-btn
        v-if="!isGameStart && !isGameReady"
        color="primary"
        label="Restart"
        @click="resetGame"
        class="m-2"
      />

      <p v-if="isGameStart" class="mx-2 text-lg">Timer: {{ formatMilliseconds(TIMER_SCORE) }}</p>
      <p v-if="isGameStart" class="text-lg">Points: {{ GAME_SCORE }}</p>
    </header>

    <PacmanCanvas
      v-if="gameContainer"
      :key="GAME_COUNTER"
      v-model:gameStart="isGameStart"
      v-model:gameScore="GAME_SCORE"
      :gameContainer="gameContainer"
      @game-is-over="gameIsOver"
    />

    <q-dialog v-model="isEndGameDialog">
      <q-card class="w-full">
        <q-card-section>
          <div class="text-h6">{{ isVictory ? 'You win !' : 'Game Over !' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>
            Your current score: <br />
            Point: {{ currentGameScore!.point }}<br />
            Time: {{ formatMilliseconds(currentGameScore!.time) }}
          </p>
        </q-card-section>
        <q-card-section v-if="bestScores && bestScores.length" class="q-pt-none">
          <q-table title="All scores" :rows="bestScores" :columns="columns" row-key="name" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import PacmanCanvas from 'src/components/gamePage/PacmanCanvas.vue'
import { formatMilliseconds } from 'src/utils/useTimeFormat'
import { computed, ref } from 'vue'
const gameContainer = ref<HTMLElement | null>(null)

const GAME_COUNTER = ref(0)
const isGameStart = ref(false)
const isGameReady = ref(true)
const isEndGameDialog = ref(false)
const isVictory = ref(false)
const GAME_TIMER_START = ref<number>(0)
const GAME_TIMER_END = ref<number>(0)
const GAME_SCORE = ref<number>(0)
const GAMES_SCORES = ref<{ point: number; time: number }[]>([])
const GAME_LAUNCHER_DELAY = 3000
let timerInterval: NodeJS.Timeout
const columns = [
  {
    name: 'point',
    label: 'Points',
    align: 'center' as 'center' | 'left' | 'right',
    field: 'point',
  },
  { name: 'time', align: 'center' as 'center' | 'left' | 'right', label: 'Times', field: 'time' },
]

const TIMER_SCORE = computed(() => {
  return GAME_TIMER_END.value - GAME_TIMER_START.value
})

function resetGame() {
  GAME_COUNTER.value++
  GAME_TIMER_START.value = 0
  GAME_TIMER_END.value = 0
  GAME_SCORE.value = 0
  isVictory.value = false
  isEndGameDialog.value = false
  isGameReady.value = true
}

function startGame() {
  isGameStart.value = true
  isGameReady.value = false

  GAME_TIMER_END.value = Date.now()
  GAME_TIMER_START.value = Date.now()

  // wait timer run game to end to start timer
  setTimeout(() => {
    timerInterval = setInterval(() => {
      GAME_TIMER_END.value = Date.now() - GAME_LAUNCHER_DELAY
    }, 100)
  }, GAME_LAUNCHER_DELAY)
}

function gameIsOver(victory: boolean) {
  clearInterval(timerInterval)
  GAMES_SCORES.value.push({
    point: GAME_SCORE.value,
    time: TIMER_SCORE.value,
  })
  isEndGameDialog.value = true
  isVictory.value = victory
}

const bestScores = computed(() => {
  // const findBestPointScore = GAMES_SCORES.value
  //   // Math.min(...array) prend le nombre le plus petit de l'array
  //   .filter((e) => e.point === Math.max(...GAMES_SCORES.value.map((m) => m.point)))
  //   // trie ensuite par temps si un plusieurs scores sont similaire
  //   .sort((a, b) => a.time - b.time)
  const sortByPoint = [...GAMES_SCORES.value].sort((a, b) => b.point - a.point)

  return sortByPoint.map((score) => {
    return {
      point: score.point,
      time: formatMilliseconds(score.time),
    }
  })
})

const currentGameScore = computed(() => {
  return { point: GAME_SCORE.value, time: TIMER_SCORE.value }
})
</script>

<style scoped></style>
