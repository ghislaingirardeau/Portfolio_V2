<template>
  <q-page class="q-pa-lg relative">
    <!-- <OctogoneWidget title="front" ref="front" class="absolute top-10 right-48" />
    {{ frontEl.x }}, {{ frontEl.y }}
    <OctogoneWidget title="back" ref="back" class="absolute bottom-28" />

    {{ backEl.x }}, {{ backEl.y }} -->
    <q-btn color="primary" class="z-20" @click="startAnim">Start</q-btn>
    <q-btn color="primary" class="z-20" @click="stopAnim">Stop</q-btn>
    <q-btn color="primary" class="z-20" @click="reverseAnim">reverse</q-btn>
    <q-btn color="primary" class="z-20" @click="resumeAnim">resume</q-btn>

    <div v-for="index in starNumber" :key="index" class="line" ref="line"></div>
    <div v-for="index in starNumber" :key="index" class="line" ref="lineX"></div>

    <!-- <div>
      <q-img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg"
        alt=""
        fit="contain"
        height="70px"
      />
    </div> -->
    <TheRobotContainer />
  </q-page>
</template>

<script setup lang="ts">
import OctogoneWidget from 'src/components/stackPage/OctogoneWidget.vue'
import { useElementBounding, useTemplateRefsList, useWindowSize } from '@vueuse/core'
import { onMounted, ref, useTemplateRef } from 'vue'
import { gsap } from 'src/boot/gsap'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'

const front = useTemplateRef('front')
const back = useTemplateRef('back')
const line = useTemplateRefsList()
const lineX = useTemplateRefsList()

const frontEl = useElementBounding(front)
const backEl = useElementBounding(back)

const { height, width } = useWindowSize()

const starNumber = 20

const tl = gsap.timeline()

function startAnim() {
  line.value.forEach((el, index) => {
    const randomY = -height.value + 180 + getRandomArbitrary(0, height.value - 180)
    tl.to(
      el,

      {
        keyframes: {
          scale: [1, 1.2, 2, 1.2, 1, 1.4, 1.2, 2, 1.2, 1],
          opacity: [0, 0.7, 1, 0.7, 1, 0.9, 0.7, 1, 0.7, 1],
          // y: [75, randomY, randomY],
        },
        x: -width.value + 60, // 55 de right css + 5px line
        y: -height.value + 180 + getRandomArbitrary(0, height.value - 180), // 75 de bottom css + header + footer (100) + taille 5px
        opacity: 1,
        duration: getRandomArbitrary(3, 5),
        repeat: -1,
        yoyo: true,
      },
      getRandomArbitrary(0.4, 6),
    ).to(
      lineX.value[index],
      {
        keyframes: {
          scale: [1.4, 1.2, 2, 1.2, 1, 1.4, 1.2, 2, 1.2, 1],
          opacity: [0, 0.7, 1, 0.7, 1, 0.9, 0.7, 1, 0.7, 1],
        },
        x: -width.value + 55 + getRandomArbitrary(0, width.value + 10), // 55 de right css
        y: -height.value + 185,
        opacity: 1,
        duration: getRandomArbitrary(3, 5),
        repeat: -1,
        yoyo: true,
      },
      getRandomArbitrary(0.4, 5),
    )
  })
}

function stopAnim() {
  tl.pause()
}
function reverseAnim() {
  tl.reverse()
}

function resumeAnim() {
  tl.play()
}

onMounted(() => {})

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}
</script>

<style scoped lang="scss">
// .lines {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 90vh;
//   margin: auto;
//   width: 90vw;
// }

.line {
  display: block;
  position: absolute;
  width: 8px;
  height: 8px;
  bottom: 80px;
  right: 55px;
  opacity: 0;
  background: radial-gradient(
    hsl(180, 100%, 80%),
    hsl(180, 100%, 80%) 10%,
    hsla(180, 100%, 80%, 0) 56%
  );
}
</style>
