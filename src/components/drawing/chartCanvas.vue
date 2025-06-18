<template>
  <canvas
    ref="canvasRef"
    :width="width"
    :height="height"
    style="border: 1px solid #ccc; background: #fff"
    @mousemove="handleMouseMove"
  ></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const width = 400
const height = 250
const canvasRef = ref<HTMLCanvasElement | null>(null)

const data = [
  { label: 'A', value: 12 },
  { label: 'B', value: 19 },
  { label: 'C', value: 7 },
  { label: 'D', value: 15 },
  { label: 'E', value: 9 },
]

// Store bar positions for hit testing
type BarRect = { x: number; y: number; width: number; height: number; value: number }
const barRects = ref<BarRect[]>([])

const padding = 40
const barWidth = 40
const barGap = 30
const maxBarHeight = height - 2 * padding
const maxValue = Math.max(...data.map((d) => d.value))

onMounted(() => {
  const ctx = canvasRef.value!.getContext('2d')!
  ctx.clearRect(0, 0, width, height)

  barRects.value = []

  data.forEach((d, i) => {
    const barHeight = (d.value / maxValue) * maxBarHeight
    const x = padding + i * (barWidth + barGap)
    const y = height - padding - barHeight

    // Draw bar
    ctx.fillStyle = '#1595ae'
    ctx.fillRect(x, y, barWidth, barHeight)

    // Save bar rect for hit testing
    barRects.value.push({ x, y, width: barWidth, height: barHeight, value: d.value })

    // Draw label
    ctx.fillStyle = '#333'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(d.label, x + barWidth / 2, height - padding + 18)

    // Draw value
    ctx.fillStyle = '#222'
    ctx.font = '12px sans-serif'
    ctx.fillText(d.value.toString(), x + barWidth / 2, y - 8)
  })

  // Draw axes
  ctx.strokeStyle = '#888'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.lineTo(width - padding / 2, height - padding)
  ctx.stroke()
})

function handleMouseMove(event: MouseEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  for (const bar of barRects.value) {
    if (
      mouseX >= bar.x &&
      mouseX <= bar.x + bar.width &&
      mouseY >= bar.y &&
      mouseY <= bar.y + bar.height
    ) {
      console.log(bar.value)
      break
    }
  }
}
</script>
