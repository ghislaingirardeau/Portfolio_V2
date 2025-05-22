<template>
  <q-page padding ref="gameContainer" class="lg:flex">
    <header class="my-2 flex flex-center lg:justify-start lg:flex-col lg:w-40">
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <!-- Game menu -->
        <div v-if="!isGameStart">
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <q-btn
              v-if="isGameReady"
              color="primary"
              label="Start"
              @click="startGame"
              class="m-2"
            />

            <q-btn v-else color="primary" label="Restart" @click="resetGame" class="m-2" />
          </transition>

          <q-btn color="primary" label="Scores" @click="isScoresDialog = true" class="m-2" />
        </div>

        <!-- Game infos -->
        <div class="w-full flex lg:flex-col justify-around" v-else>
          <div class="flex lg:flex-col items-center mx-4 lg:mx-0 lg:my-4">
            <span class="m-2 text-lg">Timer</span>
            <span class="m-2 text-3xl">{{ formatMilliseconds(TIMER_SCORE) }}</span>
          </div>
          <div class="flex lg:flex-col items-center">
            <span class="m-2 text-lg">Points</span>
            <span class="m-2 text-3xl">{{ GAME_SCORE }}</span>
          </div>
        </div>
      </transition>
    </header>

    <PacmanCanvas
      v-if="gameContainer"
      :key="GAME_COUNTER"
      v-model:gameStart="isGameStart"
      v-model:gameScore="GAME_SCORE"
      :gameContainer="gameContainer"
      @game-is-over="gameIsOver"
    />

    <ScoreDialog
      v-model:isScoresDialog="isScoresDialog"
      :isVictory="isVictory"
      :GAMES_SCORES="GAMES_SCORES"
      :hasCurrentGame="!!GAME_SCORE"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import PacmanCanvas from 'src/components/gamePage/PacmanCanvas.vue'
import ScoreDialog from 'src/components/gamePage/ScoreDialog.vue'
import { formatMilliseconds } from 'src/utils/useTimeFormat'
import { computed, ref } from 'vue'
const gameContainer = ref<HTMLElement | null>(null)

const GAME_COUNTER = ref(0)
const isGameStart = ref(false)
const isGameReady = ref(true)
const isScoresDialog = ref(false)
const isVictory = ref(false)
const GAME_TIMER_START = ref<number>(0)
const GAME_TIMER_END = ref<number>(0)
const GAME_SCORE = ref<number>(0)
const GAMES_SCORES = useLocalStorage('GAMES_SCORES', ref<{ point: number; time: number }[]>([]))

const GAME_LAUNCHER_DELAY = 3000
let timerInterval: NodeJS.Timeout

const TIMER_SCORE = computed(() => {
  return GAME_TIMER_END.value - GAME_TIMER_START.value
})

function resetGame() {
  GAME_COUNTER.value++
  GAME_TIMER_START.value = 0
  GAME_TIMER_END.value = 0
  GAME_SCORE.value = 0
  isVictory.value = false
  isScoresDialog.value = false
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

  isScoresDialog.value = true
  isVictory.value = victory
}
</script>

<style scoped></style>
