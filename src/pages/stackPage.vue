<template>
  <div class="q-pa-lg relative" style="height: 200px">
    <div class="atom">
      <div ref="atom" class="atome-nucleus flex flex-center">
        <span ref="atomTitle">langage</span>
      </div>
      <div
        ref="items"
        v-for="(iconUrl, index) in Object.values(devIconSrc.css)"
        :key="index"
        class="electron flex flex-center"
      >
        <q-img :src="iconUrl" width="100%"></q-img>
      </div>
    </div>
    <TheRobotContainer @robot-action="robotAction" />

    <!-- <AtomSample /> -->
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'src/boot/gsap'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import { devIconSrc } from 'src/utils/useIconSources'
import { ref, useTemplateRef } from 'vue'

const atom = ref()
const atomTitle = ref()
const itemRefs = useTemplateRef('items')

function robotAction() {
  const tl = gsap.timeline()

  itemRefs.value?.forEach((el, i) => {
    if (i === 0) animationElectronX(el as HTMLElement)
    if (i === 1) animationElectronY(el as HTMLElement)
    if (i === 2) animationElectronRight(el as HTMLElement)
    if (i === 3) animationElectronLeft(el as HTMLElement)
    tl.to(atomTitle.value, {
      duration: 0.5,
      text: { value: Object.keys(devIconSrc.css)![i], padSpace: true },
      delay: 1,
    })
  })
}

function animationElectronLeft(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { y: 0, scale: 0.6, rotateX: -180, rotateZ: -60 },
      '25%': { y: 40, x: 65, zIndex: 1, rotateX: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateX: 0 },
      '75%': { y: -40, x: -65, zIndex: 3, scale: 0.8, rotateX: 90 },
      '76%': { zIndex: 1 },
      '100%': { y: 0, x: 0, scale: 0.6, rotateX: 180 },
    },
    duration: 2.6,
    delay: 2,
    ease: 'none',
    repeat: 1,
  })
}
function animationElectronY(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { y: 0, scale: 0.6, rotateX: -180 },
      '25%': { y: -90, zIndex: 1, rotateX: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateX: 0 },
      '75%': { y: 90, zIndex: 3, scale: 0.8, rotateX: 90 },
      '76%': { zIndex: 1 },
      '100%': { y: 0, scale: 0.6, rotateX: 180 },
    },
    duration: 3,
    ease: 'none',
    delay: 1,
    repeat: 1,
  })
}
function animationElectronX(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { x: 0, scale: 0.6, rotateY: -180 },
      '25%': { x: -100, zIndex: 1, rotateY: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateY: 0 },
      '75%': { x: 100, zIndex: 3, scale: 0.8, rotateY: 90 },
      '76%': { zIndex: 1 },
      '100%': { x: 0, scale: 0.6, rotateY: 180, ease: 'none' },
    },
    duration: 3.2,
    ease: 'none',
    repeat: 1,
  })
}
function animationElectronRight(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { y: 0, scale: 0.6, rotateX: -180, rotateZ: 30 },
      '25%': { y: 110, x: -65, zIndex: 1, rotateX: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateX: 0 },
      '75%': { y: -110, x: 65, zIndex: 3, scale: 0.8, rotateX: 90 },
      '76%': { zIndex: 1 },
      '100%': { y: 0, x: 0, scale: 0.6, rotateX: 180 },
    },
    duration: 4,
    ease: 'none',
    repeat: 1,
  })
}
</script>

<style scoped lang="scss">
$Atom-size: 100px;
$Nucleus-size: 120px;
$Electron-size: 45px;

@mixin circle($circle-radius) {
  display: block;
  content: '';
  width: $circle-radius * 1.2;
  height: $circle-radius * 1.2;
  margin-left: ($circle-radius - ($circle-radius * 1.2)) * 0.5;
  margin-top: ($circle-radius - ($circle-radius * 1.2)) * 0.5;
  border-radius: 50%;
}

.atom {
  position: absolute;
  left: calc(50% - ($Nucleus-size / 2));
  top: calc($Nucleus-size / 2);
  position: relative;
}
.atome-nucleus {
  width: $Nucleus-size;
  height: $Nucleus-size;
  position: absolute;

  border-radius: 50%;
  background: radial-gradient(
    hsl(187, 9%, 79%),
    hsl(190, 64%, 84%) 50%,
    hsl(190, 82%, 42%) 60%,
    hsla(190, 78%, 38%, 0) 80%
  );

  z-index: 2;
}
.electron {
  width: $Electron-size;
  height: $Electron-size;
  position: absolute;
  left: $Nucleus-size * 0.5 - $Electron-size * 0.5;
  top: $Nucleus-size * 0.5 - $Electron-size * 0.5;
  z-index: 1;
}
</style>
