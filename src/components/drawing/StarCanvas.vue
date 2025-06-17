<template>
  <canvas ref="canvas" class="z-10 absolute"></canvas>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { Stars } from 'src/types/stars'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const animationSettings = useAnimationSettings()
const { isStarsAnimated } = storeToRefs(animationSettings)

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx
const stars: Stars[] = []
const starCount = 250

watch(
  () => isStarsAnimated.value,
  (newValue: boolean) => {
    if (newValue) {
      animate()
    }
  },
  { once: true },
)

onMounted(() => {
  canvas.value!.width = window.innerWidth
  canvas.value!.height = window.innerHeight
  ctx = canvas.value!.getContext('2d')
  for (let i = 0; i < starCount; i++) {
    stars.push(createStar())
  }
  // animate()
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
})

function resizeCanvas() {
  canvas.value!.width = window.innerWidth
  canvas.value!.height = window.innerHeight
}

function createStar() {
  const toTop = Math.random() < 0.5

  const startX = canvas.value!.width - (toTop ? 30 : 95) // start point to go out: 30 is robot right leg & 95 is robot left leg
  const startY = canvas.value!.height - 55

  const destX = toTop ? Math.random() * canvas.value!.width : 0
  const destY = toTop ? 0 : Math.random() * canvas.value!.height

  const dx = destX - startX
  const dy = destY - startY
  const distance = Math.sqrt(dx ** 2 + dy ** 2) // distance between start point & end point using pythagore
  const d = Math.random() * 1 + 0.1 // density or speed

  return {
    x: startX,
    y: startY,
    startX,
    startY,
    destX,
    destY,
    dx,
    dy,
    distance,
    progress: 0,
    r: Math.random() * 1 + 0.5,
    d,
  }
}

function drawStars() {
  ctx!.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

  for (const star of stars) {
    const ratio = star.progress / star.distance
    // Interpolation du rouge vers le cyan
    const r = Math.floor(255 * (1 - ratio))
    const g = Math.floor(155 * ratio)
    const b = Math.floor(255 * ratio)

    ctx!.fillStyle = `rgb(${r}, ${g}, ${b}, ${ratio > 0.9 ? (1 - ratio + 0.02) * 10 : 1})`
    ctx!.beginPath()
    ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx!.fill()
  }

  moveStars()
}

function moveStars() {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i] as Stars
    star.progress += star.d
    const ratio = star.progress / star.distance

    star.x = star.startX + star.dx * ratio
    star.y = star.startY + star.dy * ratio

    if (ratio >= 1) {
      stars[i] = createStar()
    }
  }
}

function animate() {
  drawStars()
  requestAnimationFrame(animate)
}
</script>

<style scoped></style>
