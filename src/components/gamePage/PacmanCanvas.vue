<template>
  <div class="flex justify-center items-center">
    <!--Overlay Game Launcher -->
    <div
      v-if="!gameScore && countDownStart !== 0"
      class="absolute font-bold text-6xl"
      :class="{ 'animate-ping': gameStart }"
    >
      {{ countDownStart }}
    </div>
    <!-- Game canvas -->
    <canvas
      ref="canvas"
      :width="cols * tileSize"
      :height="rows * tileSize"
      class="border-2 border-[#42e6f5] rounded"
      :class="!gameScore && countDownStart !== 0 ? 'opacity-35' : ''"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints, useSwipe, useWindowSize } from '@vueuse/core'
import { drawGhosts } from 'src/utils/ghostDrawer'
import { drawMaze } from 'src/utils/mazeDrawer'
import { drawPacman } from 'src/utils/pacmanDrawer'
import { hasTouchEvent } from 'src/utils/useDeviceInfo'
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import type { Ref } from 'vue'

const gameStart = defineModel('gameStart')
const gameScore = defineModel('gameScore')
const emits = defineEmits(['game-is-over'])

/* -------- GAME SETTINGS ------------ */

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
})

const { width } = useWindowSize()

// to be responsive
const tileSize = computed(() => {
  if (breakpoints.active().value === 'mobile') {
    return width.value * 0.05
  }
  if (breakpoints.active().value === 'tablet') {
    return width.value * 0.04
  }

  return 30
})

const canvas = ref(null)
const rows = 18
const cols = 18
// 3s to start the game
const countDownStart = shallowRef(3)

// FOR TOUCHSCREEN ONLY
const props = defineProps({
  gameContainer: {
    type: Object,
    required: true,
  },
})
const { direction } = hasTouchEvent()
  ? useSwipe(props.gameContainer as Ref<HTMLElement>)
  : { direction: null }

/* -------- GAME GRID ------------ */

// GRILLE DE JEU > comme base pour les mouvements
// exemple du rendu dans useSettings.maze

// Chaque "case" est une tile qui a une valeur par defaut de 1
// Si le point est mangé, si la case etait 1 alors passe a 2, si la case était 4 alors passe à 10
const maze = ref<number[][]>(Array.from({ length: rows }, () => Array(cols).fill(1)))

// LES MURS EXTERNE
// Chaque tile sur les bords a pour valeur 0, ce sont les murs exterieurs du labyrinthe
for (let i = 0; i < cols; i++) maze.value[0]![i] = maze.value[rows - 1]![i] = 0
for (let i = 0; i < rows; i++) maze.value[i]![0] = maze.value[i]![cols - 1] = 0

// LES BLOCS INTERNES
// Les "bloc" auront eux, une valeur de 3, ce sont les murs intérieurs du labyrinthe, défini de manière arbitraire
let blockNumber = 0
while (blockNumber < Math.round((rows * cols) / 6)) {
  const randomCol = getRandomNumber(2, cols - 3)
  const randomRow = getRandomNumber(2, rows - 3)
  // condition (1) + (2) pour eviter qu'un bloc ne ferme complétement un point, ce qui le rendrait inacessible !
  if (
    maze.value[randomRow]![randomCol] !== 3 && // la tile n'est pas deja en valeur 3
    maze.value[randomRow - 2]![randomCol] !== 3 && // (1)
    maze.value[randomRow - 1]![randomCol - 1] !== 3 // (2)
  ) {
    maze.value[randomRow]![randomCol] = 3
    blockNumber++
  }
}

// LES SUPER POINTS > à des positions valides aléatoires, valeur est de 4
let n = 0
while (n < 5) {
  const xLength = rows / 2 // exemple base de 20, donne 10
  const yLength = rows - 3 // exemple base de 20, donne 17

  const corner = [
    [xLength, yLength, 2, xLength], // haut a droite
    [2, xLength, 2, xLength], // haut a gauche
    [xLength, yLength, xLength, yLength], // bas a droite
    [2, xLength, xLength, yLength], // bas a gauche
    [2, yLength, 2, yLength], // aleatoire
  ]

  const randomCol = getRandomNumber(corner[n]![0]!, corner[n]![1]!)
  const randomRow = getRandomNumber(corner[n]![2]!, corner[n]![3]!)
  if (maze.value[randomRow]![randomCol] === 1) {
    maze.value[randomRow]![randomCol] = 4
    n++
  }
}

function getRandomNumber(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

/* -------- GAME SPEED ------------ */

// Pour gérer la vitesse de pacman avant son mouvement
let lastMoveTime = 0
const moveDelay = 150 // millisecondes entre déplacements
// timestamp sera automatiquement fourni par requestAnimationFrame (c’est le temps en millisecondes depuis le démarrage).
function update(timestamp: number) {
  if (!gameStart.value) {
    return
  }
  if (timestamp - lastMoveTime > moveDelay) {
    movePacman()
    lastMoveTime = timestamp
  }
  if (ghosts.some((ghost) => pacman.x === ghost.x && pacman.y === ghost.y && !ghost.added)) {
    endGame(false)
  }
}

/* -------- PACMAN ------------ */

const pacman = {
  x: 10,
  y: 9,
  dx: 0,
  dy: 0,
  color: 'yellow',
  openMouth: false,
}

maze.value[pacman.x - 1]![pacman.y + 1] = 5

function movePacman() {
  const nextX = pacman.x + pacman.dx // sa nouvelle position sur x => en ajoutant 1, 0 ou -1
  const nextY = pacman.y + pacman.dy // sa nouvelle position sur y => en ajoutant 1, 0 ou -1

  // si dans la grille, le cellule n'est pas 0 ni 3, mets à jours la position du pacman
  if (
    maze.value[nextY] &&
    maze.value[nextY][nextX] !== 0 &&
    maze.value[nextY] &&
    maze.value[nextY][nextX] !== 3
  ) {
    pacman.x = nextX
    pacman.y = nextY
  }
  // si les coordonnées de la cellule correspond à la position du pacman
  // tu passes la cellule en valeur "2" => le requestframe "re-draw le maze.value" la cellule n'a alors plus le point car en valeur 2
  if (maze.value[pacman.y]![pacman.x] === 1) {
    maze.value[pacman.y]![pacman.x] = 2
    pacman.openMouth = !pacman.openMouth
    // flat tous les tableaux et regarde si il contient la valeur  1 ou 4 => soit des points et super points restants.
    // Si aucun 1, alors user a gagné
    const userWin = !maze.value.flat().some((e) => e === 1 || e === 4)
    if (userWin) {
      endGame(true)
    }
  }
  // Super Point
  if (maze.value[pacman.y]![pacman.x] === 4) {
    maze.value[pacman.y]![pacman.x] = 10
    pacman.openMouth = !pacman.openMouth
    // flat tous les tableaux et regarde si il contient la valeur  1 ou 4 => soit des points et super points restants.
    // Si aucun 1, alors user a gagné
    const userWin = !maze.value.flat().some((e) => e === 1 || e === 4)
    if (userWin) {
      endGame(true)
    }
  }
  // Update le score
  gameScore.value = scoreCounter()
}

/* -------- GHOSTS ------------ */

const ghosts = [
  {
    x: cols - 2,
    y: rows - 2,
    color: 'rgba(255, 0, 0, 1)',
    added: false,
  },
  {
    x: 1,
    y: 1,
    color: 'rgba(255, 0, 0, 1)',
    added: false,
  },
  // {
  //   x: 1,
  //   y: rows - 2,
  //   color: 'red',
  // },
  // {
  //   x: cols - 2,
  //   y: 1,
  //   color: 'rgba(255, 0, 0, 1)',
  //   added: false,
  // },
]

function moveGhostRandomly(ghost: { x: number; y: number; color: string }) {
  const directions = [
    [0, -1], // haut
    [0, 1], // bas
    [-1, 0], // gauche
    [1, 0], // droite
  ]

  /**
   * Va retourner un tableau avec les directions possibles
   * Si 2 directions possibles seulement, alors retourne un array de 2 elements
   * @returns [[0,1], [-1,0]]
   */
  const validMoves = directions.filter(([dx, dy]) => {
    const newX = ghost.x + dx!
    const newY = ghost.y + dy!
    return maze.value[newY] && maze.value[newY][newX] !== 0 && maze.value[newY][newX] !== 3
  })

  if (validMoves.length > 0) {
    const [dx, dy] = validMoves[Math.floor(Math.random() * validMoves.length)]!
    ghost.x += dx!
    ghost.y += dy!
  }
}

function moveGhostTowardPacman(ghost: { x: number; y: number; color: string }) {
  const directions = [
    { dx: 0, dy: -1 }, // haut
    { dx: 0, dy: 1 }, // bas
    { dx: -1, dy: 0 }, // gauche
    { dx: 1, dy: 0 }, // droite
  ]

  // Trie les directions selon leur distance à Pac-Man
  /**
   * Pour chaque direction, on simule le déplacement du fantôme et on calcule la distance entre la position simulée et Pac-Man.
   * On trie ensuite les directions de la plus proche à la plus éloignée.
   */
  const sorted = directions.sort((a, b) => {
    const distA = distance(ghost.x + a.dx, ghost.y + a.dy, pacman.x, pacman.y)
    const distB = distance(ghost.x + b.dx, ghost.y + b.dy, pacman.x, pacman.y)
    return distA - distB
  })

  // Teste les directions une par une
  for (const { dx, dy } of sorted) {
    const newX = ghost.x + dx
    const newY = ghost.y + dy

    // Vérifie que ce n'est pas un mur ni un bloque
    if (maze.value[newY]?.[newX] !== 0 && maze.value[newY]?.[newX] !== 3) {
      ghost.x = newX
      ghost.y = newY
      break
    }
  }
}

// Fonction de distance (ici : distance de Manhattan)
function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

let ghostAnimInterval: NodeJS.Timeout

function setSpeedToGhostMove(speed: number) {
  clearInterval(ghostAnimInterval)
  ghostAnimInterval = setInterval(() => {
    ghosts.forEach((ghost) => {
      // si le ghost est ajouté en cours de jeu, attends 3 seconds qu'il puisse bouger
      if (ghost.added) {
        setTimeout(() => {
          ghost.added = false
          ghost.color = 'rgba(255, 0, 0, 1)'
        }, 3000)
      } else {
        // 80 pourcent du temps, va sur pacman
        if (Math.random() < 0.8) {
          moveGhostTowardPacman(ghost)
        } else {
          moveGhostRandomly(ghost)
        }
      }
    })
  }, speed)
}

/* -------- GAME START & END ------------ */

let animationId: number // contient requestFrame
let timeoutLevelOneAddGhost: NodeJS.Timeout // ajout de difficultés après une periode de temps
let timeoutLevelSecondAddGhost: NodeJS.Timeout // ajout de difficultés après une periode de temps
let timeoutLevelThreeIcreaseGhostSpeed: NodeJS.Timeout // ajout de difficultés après une periode de temps

function endGame(victory: boolean) {
  if (!hasTouchEvent()) document.removeEventListener('keydown', onKeyboardDown)
  cancelAnimationFrame(animationId)
  clearInterval(ghostAnimInterval)
  clearTimeout(timeoutLevelOneAddGhost)
  clearTimeout(timeoutLevelSecondAddGhost)
  clearTimeout(timeoutLevelThreeIcreaseGhostSpeed)
  gameStart.value = false
  gameScore.value = scoreCounter()
  emits('game-is-over', victory)
}

function scoreCounter() {
  const points = maze.value
    .flat()
    .filter((tile) => tile === 2)
    .reduce((a, b) => a + b, 0)
  const superPoints = maze.value
    .flat()
    .filter((tile) => tile === 10)
    .reduce((a, b) => a + b, 0)
  return points * 5 + superPoints * 5
}

function runGame() {
  // If no touchScreen, keyboard arrows is the controller
  if (!hasTouchEvent()) document.addEventListener('keydown', onKeyboardDown)

  // GAME LEVEL
  // 1 - Start moving 2 ghosts
  setSpeedToGhostMove(500)

  // 2 - Add one ghost
  timeoutLevelOneAddGhost = setTimeout(() => {
    ghosts.push({
      x: 1,
      y: rows - 2,
      color: 'rgba(255, 0, 0, 0.5)',
      added: true,
    })
  }, 15000)

  // 3 - Add second ghost
  timeoutLevelSecondAddGhost = setTimeout(() => {
    ghosts.push({
      x: cols - 2,
      y: 1,
      color: 'rgba(255, 0, 0, 0.5)',
      added: true,
    })
  }, 20000)

  // 4 - speed up ghosts move
  timeoutLevelThreeIcreaseGhostSpeed = setTimeout(() => {
    ghosts.forEach((ghost) => (ghost.color = 'pink'))
    setSpeedToGhostMove(220)
  }, 35000)

  // 4 - speed up ghosts move again
  // timeoutLevelThreeIcreaseGhostSpeed = setTimeout(() => {
  //   ghosts.forEach((ghost) => (ghost.color = 'purple'));
  //   setSpeedToGhostMove(150);
  // }, 45000);
}

/* -------- GAME CONTROLLERS ------------ */

// ON LAPTOP

const keys = {
  // index 0 c'est le mouvement sur x et index 1 c'est le mouvement sur y
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
}

function onKeyboardDown(e: KeyboardEvent) {
  const keyPress = e.key as keyof typeof keys
  if (keys[keyPress]) {
    // donne la direction a pacman
    // si axe x => alors prends le 1er element. Comme c'est sur axe x, on aura -1 ou 1 suivant gauche ou droite
    pacman.dx = keys[keyPress][0]!
    pacman.dy = keys[keyPress][1]!
    // on lui dit donc dans quel direction il faudra aller
  }
}

// ON TOUCHSCREEN

const touchKeys = {
  // index 0 c'est le mouvement sur x et index 1 c'est le mouvement sur y
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}

function onTouchSwipe(direction: string) {
  const touchKey = direction as keyof typeof touchKeys
  if (touchKeys[touchKey]) {
    // donne la direction a pacman
    // si axe x => alors prends le 1er element. Comme c'est sur axe x, on aura -1 ou 1 suivant gauche ou droite
    pacman.dx = touchKeys[touchKey][0]!
    pacman.dy = touchKeys[touchKey][1]!
    // on lui dit donc dans quel direction il faudra aller
  }
}

// FOR TOUCHSCREEN ONLY - it will be the controller
watch(
  () => direction?.value,
  (newValue) => {
    if (newValue) onTouchSwipe(newValue)
  },
)

// IF User has start the game - start to run if
watch(
  () => gameStart.value,
  (newValue) => {
    if (newValue) {
      const gameLauncher = setInterval(() => {
        countDownStart.value--
        if (countDownStart.value === 0) {
          clearInterval(gameLauncher)
          runGame()
        }
      }, 1000)
    }
  },
)

// Prepare canvas and game to run
onMounted(() => {
  const ctx = (canvas.value! as HTMLCanvasElement).getContext('2d')

  // requestAnimationFrame() permet de synchroniser ton animation avec ces rafraîchissements, pour éviter les saccades 60 images / secondes
  const gameLoop = (timestamp: number) => {
    ctx!.clearRect(0, 0, cols * tileSize.value, rows * tileSize.value)
    drawMaze(ctx, tileSize.value, cols, rows, maze.value)
    update(timestamp)
    drawPacman(ctx, pacman, tileSize.value)
    drawGhosts(ctx, ghosts, tileSize.value)
    animationId = requestAnimationFrame(gameLoop)
  }

  animationId = requestAnimationFrame(gameLoop)
})

onUnmounted(() => {
  if (!hasTouchEvent()) document.removeEventListener('keydown', onKeyboardDown)
  cancelAnimationFrame(animationId)
  clearInterval(ghostAnimInterval)
  clearTimeout(timeoutLevelOneAddGhost)
  clearTimeout(timeoutLevelSecondAddGhost)
  clearTimeout(timeoutLevelThreeIcreaseGhostSpeed)
})
</script>
