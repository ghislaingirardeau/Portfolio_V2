<template>
  <q-page padding>
    <div class="flex gap-8 mb-4">
      <p class="text-lg font-bold">Score: {{ scores }}</p>
      <q-btn color="primary" label="Restart" @click="resetGame" />
      <q-btn color="primary" label="Start" @click="startGame" />
    </div>
    <div
      class="flex border-2 border-gray-800 relative"
      :style="{ width: GRID_SIZE, height: GRID_SIZE }"
    >
      <div v-for="row in PACMAN_LEVEL_GRID" :key="row.x">
        <div
          v-for="y in row.y"
          :key="y.key + row.x"
          class="w-10 h-10 flex flex-center"
          :style="{ backgroundColor: y.isBlock ? 'blue' : 'white' }"
          :id="y.key + row.x"
        >
          <!-- {{ cellBlockStyle(y.isBlock, y.point, y.key, row.x) }} -->
          <q-icon v-if="!y.isBlock && y.point" :name="mdiCircleSmall" size="15px" color="black" />
          <div v-else></div>
        </div>
      </div>
      <div ref="pacman" class="absolute w-6 h-6 flex flex-center" style="top: 4px; left: 4px">
        <q-icon :name="mdiPacMan" size="30px" color="yellow" />
      </div>
      <div
        :key="COUNTER_GAME"
        ref="ghost"
        class="absolute w-6 h-6 flex flex-center"
        style="top: 4px; left: 4px"
      >
        <q-icon :name="mdiGhost" size="30px" color="green" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { mdiCircleSmall, mdiGhost, mdiPacMan } from '@quasar/extras/mdi-v7'

import { gsap } from 'src/boot/gsap'
import { PACMAN_LEVEL_GRID, PACMAN_SPEED } from 'src/utils/useSettings'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

const pacman = useTemplateRef('pacman')
const ghost = useTemplateRef('ghost')

const PACMAN_POSITION = ref('c3')
const GHOST_POSITION = ref('a1')
const GHOST_DIRECTION = ref('down')
const COUNTER_GAME = ref(0)
const scores = ref(0)
const tl_pacman = gsap.timeline()
const tl_ghost = gsap.timeline()

const hasUserWin = ref(false)
const GRID_SIZE = computed(() => PACMAN_LEVEL_GRID.value.length * 41 + 'px')

onMounted(() => {
  setInitialPacmanPosition()
})

function startGame() {
  window.addEventListener('keydown', onKeydown)
  ghostGoOnY(GHOST_DIRECTION.value)
}

function resetGame() {
  COUNTER_GAME.value++
  scores.value = 0
  PACMAN_POSITION.value = 'c3'
  GHOST_POSITION.value = 'a1'
  GHOST_DIRECTION.value = 'down'

  PACMAN_LEVEL_GRID.value.forEach((row) => {
    row.y.forEach((y) => {
      if (!y.isBlock) {
        y.point = 10
      }
    })
  })
  setInitialPacmanPosition()
}

function setInitialPacmanPosition() {
  const currentX = PACMAN_POSITION.value.charAt(0) // a, b, c, d, e
  const currentY = PACMAN_POSITION.value.charAt(1) // 1, 2, 3, 4, 5
  const letterPosition = currentX.charCodeAt(0) - 96

  tl_pacman.to(pacman.value, {
    x: 40 * (Number(currentY) - 1),
    y: 40 * (Number(letterPosition) - 1),
    duration: PACMAN_SPEED,
  })
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    goOnX('right')
  }
  if (event.key === 'ArrowLeft') {
    goOnX('left')
  }
  if (event.key === 'ArrowUp') {
    goOnY('up')
  }
  if (event.key === 'ArrowDown') {
    goOnY('down')
  }
  const getAllPoints = PACMAN_LEVEL_GRID.value.map((row) => row.y.map((y) => y.point))
  const pointLeft = getAllPoints.flat().reduce((a, b) => a + b, 0)
  if (pointLeft === 0) {
    hasUserWin.value = true
  }
}

function moveGhost(axis: string, index: number) {
  tl_ghost.to(ghost.value, {
    [axis]: 40 * index,
    duration: 1,
    onComplete() {
      if (PACMAN_POSITION.value === GHOST_POSITION.value) {
        alert('You lose !')
        tl_ghost.clear()
        return
      }
      ghostGoOnY(GHOST_DIRECTION.value)
    },
  })
}

function ghostGoOnY(direction: string) {
  const currentX = GHOST_POSITION.value.charAt(0) // a, b, c, d, e
  const currentY = GHOST_POSITION.value.charAt(1) // 1, 2, 3, 4, 5

  // find the current col ex: 1
  const findCol = PACMAN_LEVEL_GRID.value.find((row) => row.x === Number(currentY))
  // find the index of current row ex: a inside y list
  const rowCurrentIndex = findCol?.y.findIndex((y) => y.key === currentX)
  // next row will be + 1
  const nextRow = Number(rowCurrentIndex!) + (direction === 'down' ? 1 : -1)
  const newCell = findCol?.y[nextRow]
  // if newCell is undefined, you are at the edge of the grid, return
  if (!newCell) {
    GHOST_DIRECTION.value = 'up'
    return
  }
  // if it is a block, return
  if (newCell?.isBlock) {
    GHOST_DIRECTION.value = 'up'
    return
  }

  GHOST_POSITION.value = newCell!.key + currentY
  moveGhost('y', nextRow)
}

watch(GHOST_DIRECTION, (newValue, oldValue) => {
  console.log(newValue, oldValue)
  ghostGoOnY(newValue)
})

// watch(PACMAN_POSITION, (newValue) => {
//   if (PACMAN_POSITION.value === GHOST_POSITION.value) alert('You lose !');
// });

function goOnY(direction: string) {
  const currentX = PACMAN_POSITION.value.charAt(0) // a, b, c, d, e
  const currentY = PACMAN_POSITION.value.charAt(1) // 1, 2, 3, 4, 5

  // find the current col ex: 1
  const findCol = PACMAN_LEVEL_GRID.value.find((row) => row.x === Number(currentY))
  // find the index of current row ex: a inside y list
  const rowCurrentIndex = findCol?.y.findIndex((y) => y.key === currentX)
  // next row will be + 1
  const nextRow = Number(rowCurrentIndex!) + (direction === 'down' ? 1 : -1)
  const newCell = findCol?.y[nextRow]
  // if newCell is undefined, you are at the edge of the grid, return
  if (!newCell) {
    return
  }
  // if it is a block, return
  if (newCell?.isBlock) {
    return
  }
  scores.value += newCell!.point
  newCell!.point = 0
  PACMAN_POSITION.value = newCell!.key + currentY
  movePacman('y', nextRow)
}

function goOnX(direction: string) {
  const currentX = PACMAN_POSITION.value.charAt(0) // a, b, c, d, e
  const currentY = PACMAN_POSITION.value.charAt(1) // 1, 2, 3, 4, 5

  const newCol = PACMAN_LEVEL_GRID.value.find(
    (row) => row.x === Number(currentY) + (direction === 'right' ? 1 : -1),
  )

  // get next col index from 0, easier to animate with gsap
  const colCurrentIndex = PACMAN_LEVEL_GRID.value.findIndex((row) => row.x === Number(currentY))
  const nextCol = Number(colCurrentIndex!) + (direction === 'right' ? 1 : -1)

  // if you are at the first column, return
  if (!newCol) {
    return
  }
  // get the next cell
  const newCell = newCol!.y.find((y) => y.key === currentX)
  // if it is a block, return
  if (newCell?.isBlock) {
    return
  }
  // else, move the pacman to the next cell & add the score
  scores.value += newCell!.point
  newCell!.point = 0
  PACMAN_POSITION.value = currentX + (nextCol + 1)
  movePacman('x', nextCol)
}

function movePacman(axis: string, index: number) {
  tl_pacman.to(pacman.value, {
    [axis]: 40 * index,
    duration: PACMAN_SPEED,
    onComplete: () => {
      if (hasUserWin.value) {
        alert('You win!')
        hasUserWin.value = false
      }
      if (PACMAN_POSITION.value === GHOST_POSITION.value) {
        alert('You lose !')
        tl_ghost.clear()
      }
    },
  })
}

/* function cellBlockStyle(isBlock: boolean, point: number, key: string, x: number) {
  return isBlock ? '' : point ? x + key : ''
} */
</script>

<style scoped></style>
