<template>
  <p>score: {{ gameStart ? countScore() : 0 }}</p>
  <div class="flex justify-center items-center">
    <canvas
      ref="canvas"
      :width="cols * tileSize"
      :height="rows * tileSize"
      class="border-2 border-white"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { drawGhosts } from 'src/utils/ghostDrawer'
import { drawMaze } from 'src/utils/mazeDrawer'
import { drawPacman } from 'src/utils/pacmanDrawer'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const gameStart = defineModel('gameStart')
const gameStop = defineModel('gameStop')

/* -------- GAME SETTINGS ------------ */

const canvas = ref(null)
const tileSize = 25
const rows = 20
const cols = 20

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
while (blockNumber < Math.round((rows * cols) / 5)) {
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
  if (gameStop.value) {
    return
  }
  if (timestamp - lastMoveTime > moveDelay) {
    movePacman()
    lastMoveTime = timestamp
  }
  if (ghosts.some((ghost) => pacman.x === ghost.x && pacman.y === ghost.y)) {
    endGame(false)
  }
}

/* -------- PACMAN ------------ */

const pacman = {
  x: 1,
  y: 1,
  dx: 0,
  dy: 0,
  color: 'yellow',
}

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

function movePacman() {
  const nextX = pacman.x + pacman.dx // sa nouvelle position sur x => en ajoutant 1, 0 ou -1
  const nextY = pacman.y + pacman.dy // sa nouvelle position sur y => en ajoutant 1, 0 ou -1

  // si dans la grille, le cellule n'est pas 0, mets à jours la position du pacman
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
    // flat tous les tableaux et regarde si il contient la valeur  1 ou 4 => soit des points et super points restants.
    // Si aucun 1, alors user a gagné
    const userWin = !maze.value.flat().some((e) => e === 1 || e === 4)
    if (userWin) {
      endGame(true)
    }
  }
}

/* -------- GHOSTS ------------ */

const ghosts = [
  {
    x: cols - 2,
    y: rows - 2,
    color: 'red',
  },
  {
    x: cols - 2,
    y: 1,
    color: 'red',
  },
  // {
  //   x: 1,
  //   y: rows - 2,
  //   color: 'red',
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
      // 80 pourcent du temps, va sur pacman
      if (Math.random() < 0.8) {
        moveGhostTowardPacman(ghost)
      } else {
        moveGhostRandomly(ghost)
      }
    })
  }, speed)
}

/* -------- GAME ON ENDS ------------ */

let animationId: number // contient requestFrame

function endGame(victory: boolean) {
  document.removeEventListener('keydown', onKeyboardDown)
  cancelAnimationFrame(animationId)
  clearInterval(ghostAnimInterval)
  alert(victory ? 'You win' : 'Game Over')
  gameStart.value = false
  gameStop.value = true
}

function countScore() {
  const points = maze.value
    .flat()
    .filter((tile) => tile === 2)
    .reduce((a, b) => a + b, 0)
  const superPoints = maze.value
    .flat()
    .filter((tile) => tile === 10)
    .reduce((a, b) => a + b, 0)
  return points * 5 + superPoints * 5 - 10 // -10 qui est la 1ere position de pacman (pas de point pour la tile de départ)
}

let timeoutId1: NodeJS.Timeout
let timeoutId2: NodeJS.Timeout
let timeoutId3: NodeJS.Timeout

watch(
  () => gameStart.value,
  (newValue) => {
    if (newValue) {
      document.addEventListener('keydown', onKeyboardDown)
      // FIRST - speed up ghost move after certain period of time
      setSpeedToGhostMove(300)
      timeoutId1 = setTimeout(() => {
        ghosts.push({
          x: 1,
          y: rows - 2,
          color: 'red',
        })
      }, 5000)
      timeoutId2 = setTimeout(() => {
        ghosts.forEach((ghost) => (ghost.color = 'pink'))
        setSpeedToGhostMove(220)
      }, 25000)
      // SECOND - speed up ghost move after certain period of time
      timeoutId3 = setTimeout(() => {
        ghosts.forEach((ghost) => (ghost.color = 'purple'))
        setSpeedToGhostMove(150)
      }, 45000)
    } else {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
    }
  },
)

onMounted(() => {
  const ctx = (canvas.value! as HTMLCanvasElement).getContext('2d')

  // requestAnimationFrame() permet de synchroniser ton animation avec ces rafraîchissements, pour éviter les saccades 60 images / secondes
  const gameLoop = (timestamp: number) => {
    ctx!.clearRect(0, 0, cols * tileSize, rows * tileSize)
    drawMaze(ctx, tileSize, cols, rows, maze.value)
    update(timestamp)
    drawPacman(ctx, pacman, tileSize)
    drawGhosts(ctx, ghosts, tileSize)
    animationId = requestAnimationFrame(gameLoop)
  }

  animationId = requestAnimationFrame(gameLoop)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyboardDown)
  cancelAnimationFrame(animationId)
  clearInterval(ghostAnimInterval)
  clearTimeout(timeoutId1)
  clearTimeout(timeoutId2)
  clearTimeout(timeoutId3)
})
</script>
