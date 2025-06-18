<template>
  <div style="touch-action: none">
    <button @click="saveCanvas">Save Image</button>

    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      style="border: 1px solid #ccc; touch-action: none; cursor: crosshair"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="startDrawingTouch"
      @touchmove.prevent="drawTouch"
      @touchend.prevent="stopDrawing"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const width = 500
const height = 300
const canvasRef = ref<HTMLCanvasElement | null>(null)
const drawing = ref(false)
const lastPos = ref({ x: 0, y: 0 })

function getPos(e: MouseEvent | TouchEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  if (e instanceof MouseEvent) {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  } else {
    const touch = e.touches[0] || e.changedTouches[0]
    return {
      x: touch!.clientX - rect.left,
      y: touch!.clientY - rect.top,
    }
  }
}

function startDrawing(e: MouseEvent) {
  drawing.value = true
  lastPos.value = getPos(e)
}

function startDrawingTouch(e: TouchEvent) {
  drawing.value = true
  lastPos.value = getPos(e)
}

function draw(e: MouseEvent) {
  if (!drawing.value) return
  const ctx = canvasRef.value!.getContext('2d')!
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'

  const pos = getPos(e)
  ctx.beginPath()
  // au click, sets the starting point
  ctx.moveTo(lastPos.value.x, lastPos.value.y)
  // to the next position, (mouse moved)
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
  // update lastPos after mouse moved
  lastPos.value = pos
}

function drawTouch(e: TouchEvent) {
  if (!drawing.value) return
  const ctx = canvasRef.value!.getContext('2d')!
  ctx.strokeStyle = '#222'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'

  const pos = getPos(e)
  ctx.beginPath()
  ctx.moveTo(lastPos.value.x, lastPos.value.y)
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
  lastPos.value = pos
}

function stopDrawing() {
  const ctx = canvasRef.value!.getContext('2d')!
  console.log(ctx)
  drawing.value = false
}

function saveCanvas() {
  const link = document.createElement('a')
  link.download = 'canvas.png' // File name
  link.href = canvasRef.value!.toDataURL('image/png') // Get image data
  link.click() // Trigger download
}

onMounted(() => {
  const ctx = canvasRef.value!.getContext('2d')!
  ctx.clearRect(0, 0, width, height)

  // Animate a line from (50, 50) to (450, 250) over 1 second
  const start = { x: 50, y: 50 }
  const end = { x: 450, y: 250 }
  const duration = 2000 // milliseconds
  const startTime = performance.now()

  function animateLine(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1) // progress of animation [0,1], can not be greater than 1
    const currentX = start.x + (end.x - start.x) * t
    // valeur de départ + ecart de la progression
    const currentY = start.y + (end.y - start.y) * t

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    // ctx.lineTo(currentX, currentY)
    ctx.bezierCurveTo(start.x, start.y, currentX + -250 * t, currentY + 150 * t, currentX, currentY)
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 2
    ctx.stroke()

    // t greater than 1, stop animation, meaning the duration of animation is over
    if (t < 1) {
      requestAnimationFrame(animateLine)
    }
  }

  requestAnimationFrame(animateLine)
})
</script>
