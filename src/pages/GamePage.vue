<template>
  <q-page padding ref="gameContainer" class="lg:flex">
    <header class="my-2 flex flex-center lg:justify-start lg:flex-col lg:w-40">
      <q-btn v-if="!isGameStart" color="primary" label="Start" @click="startGame" class="m-2" />

      <q-btn v-if="!isGameStart" color="primary" label="Restart" @click="resetGame" class="m-2" />

      <p v-if="isGameStart" class="mx-2 text-lg">Timer: {{ formatMilliseconds(timerScore) }}</p>
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
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar, AppFullscreen } from 'quasar'
import PacmanCanvas from 'src/components/gamePage/PacmanCanvas.vue'
import { formatMilliseconds } from 'src/utils/useTimeFormat'
import { computed, ref } from 'vue'
const gameContainer = ref<HTMLElement | null>(null)
const $q = useQuasar()

const GAME_COUNTER = ref(0)
const isGameStart = ref(false)
const GAME_TIMER_START = ref<number>(0)
const GAME_TIMER_END = ref<number>(0)
const GAME_SCORE = ref<number>(0)
const GAMES_SCORES = ref<{ point: number; time: number }[]>([])
const GAME_LAUNCHER_DELAY = 3000
let timerInterval: NodeJS.Timeout

const timerScore = computed(() => {
  return GAME_TIMER_END.value - GAME_TIMER_START.value
})

function resetGame() {
  GAME_COUNTER.value++
  GAME_TIMER_START.value = 0
  GAME_TIMER_END.value = 0
  GAME_SCORE.value = 0
}

function startGame() {
  isGameStart.value = true
  GAME_TIMER_END.value = Date.now()
  GAME_TIMER_START.value = Date.now()
  AppFullscreen.request()

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
    time: timerScore.value,
  })
  $q.notify({
    message: `<p>${victory ? 'You win !' : 'Game Over !'} Your best score 
    <br> Point: ${bestScore.value!.point} 
    <br> Time: ${formatMilliseconds(bestScore.value!.time)}</p>`,
    html: true,
    position: 'center',
    color: victory ? 'green' : 'red',
    onDismiss() {
      AppFullscreen.exit()
    },
    actions: [
      {
        icon: 'close',
        color: 'white',
        round: true,
        handler: () => {
          AppFullscreen.exit()
        },
      },
    ],
    timeout: 10000,
  })
}

const bestScore = computed(() => {
  const findBestPointScore = GAMES_SCORES.value
    // Math.min(...array) prend le nombre le plus petit de l'array
    .filter((e) => e.point === Math.max(...GAMES_SCORES.value.map((m) => m.point)))
    // trie ensuite par temps si un plusieurs scores sont similaire
    .sort((a, b) => a.time - b.time)

  return findBestPointScore[0]
})
</script>

<style scoped></style>
