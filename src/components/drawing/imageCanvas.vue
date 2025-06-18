<template>
  <div>
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      style="border: 1px solid #ccc; touch-action: none; cursor: crosshair"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const width = 500
const height = 400
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const maltImage = new window.Image()
  maltImage.src = '/public/logos/malt-svgrepo-com.png'
  const duration = 2000 // milliseconds
  const startTime = performance.now()

  maltImage.onload = () => {
    const ctx = canvasRef.value?.getContext('2d')

    function animateLine(now: number) {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const scaleGrow = 50 * t
      ctx!.fillRect(0, 0, width, height)
      //   const currentRotation = t * 0.4 * Math.PI
      //   ctx.rotate(currentRotation / 180)
      ctx!.shadowBlur = 50
      ctx!.shadowColor = 'red'
      //   ctx!.fillStyle = 'red'
      // pos x, pos y, size x, size y
      ctx!.drawImage(maltImage, width / 2, 10, scaleGrow, scaleGrow)

      if (t < 1) {
        requestAnimationFrame(animateLine)
      }
    }
    requestAnimationFrame(animateLine)
  }
})
</script>

<style scoped></style>
