<template>
  <q-page padding ref="gameContainer" class="no-pull-refresh lg:flex">
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
              :outline="$q.dark.isActive"
              :color="buttonColor"
              label="Start"
              @click="startGame"
              class="m-2"
            />

            <q-btn
              v-else
              :outline="$q.dark.isActive"
              :color="buttonColor"
              label="Restart"
              @click="resetGame"
              class="m-2"
            />
          </transition>

          <q-btn
            :outline="$q.dark.isActive"
            :color="buttonColor"
            label="Scores"
            @click="isScoresDialog = true"
            class="m-2"
          />
        </div>

        <GameRunInfos v-else :TIMER_SCORE="TIMER_SCORE" :GAME_SCORE="GAME_SCORE" />
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
    <TheRobotContainer />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        v-if="!isGameStart"
        :meTexts="chatTexts"
        :visitor-texts="t(`chatMessage.game.visitor`)"
        :delay-animation="0.1"
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import GameRunInfos from 'src/components/gamePage/GameRunInfos.vue'
import PacmanCanvas from 'src/components/gamePage/PacmanCanvas.vue'
import ScoreDialog from 'src/components/gamePage/ScoreDialog.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { hasTouchEvent } from 'src/utils/useDeviceInfo'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { AppFullscreen, useQuasar } from 'quasar'

const { t } = useI18n()
const $q = useQuasar()

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

const buttonColor = computed(() => {
  return $q.dark.mode ? 'dark-primary' : 'primary'
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
  if (hasTouchEvent()) {
    AppFullscreen.request()
  }
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

/* CHAT MESSAGES */

const animationSettings = useAnimationSettings()
const { isRobotClickable } = storeToRefs(animationSettings)

onMounted(() => {
  isRobotClickable.value = false
})

const chatTexts = computed(() => {
  return [
    t(`chatMessage.game.me`),
    t(`chatMessage.game.me_${hasTouchEvent() ? 'mobile' : 'desktop'}`),
  ] as string[]
})
</script>

<style scoped>
.no-pull-refresh {
  overflow: auto;
  overscroll-behavior-y: contain;
}
</style>
