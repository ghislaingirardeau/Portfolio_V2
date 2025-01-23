<template>
  <div class="q-pa-lg flex flex-center">
    <div class="atom mt-40 ml-20">
      <div ref="atom" class="atome-nucleus flex flex-center">
        <span>Front</span>
      </div>
      <div
        ref="items"
        v-for="(iconUrl, index) in Object.values(devIconSrc.langage)"
        :key="index"
        class="electron flex flex-center"
      >
        <q-img :src="iconUrl" width="75%"></q-img>
      </div>
    </div>
    <TheRobotContainer @robot-action="robotAction" />

    <!-- <AtomSample /> -->
  </div>
</template>

<script setup lang="ts">
import { biYelp } from '@quasar/extras/bootstrap-icons'
import { gsap } from 'src/boot/gsap'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import AtomSample from 'src/components/stackPage/AtomSample.vue'
import { devIconSrc } from 'src/utils/useIconSources'
import { onMounted, ref, useTemplateRef } from 'vue'

const atom = ref()
const itemRefs = useTemplateRef('items')

function robotAction() {
  itemRefs.value?.forEach((el, i) => {
    if (i === 0) animationElectronX(el as HTMLElement)
    if (i === 1) animationElectronY(el as HTMLElement)
    if (i === 2) animationElectronRight(el as HTMLElement)
    if (i === 3) animationElectronLeft(el as HTMLElement)
  })
}

function animationElectronRight(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { y: 0, scale: 0.6, rotateX: -180, rotateZ: 30 },
      '25%': { y: 80, x: -45, zIndex: 1, rotateX: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateX: 0 },
      '75%': { y: -80, x: 45, zIndex: 3, scale: 0.8, rotateX: 90 },
      '76%': { zIndex: 1 },
      '100%': { y: 0, x: 0, scale: 0.6, rotateX: 180 },
    },
    duration: 2.6,
    ease: 'none',
  })
}
function animationElectronLeft(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { y: 0, scale: 0.6, rotateX: -180, rotateZ: -30 },
      '25%': { y: 40, x: 30, zIndex: 1, rotateX: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateX: 0 },
      '75%': { y: -40, x: -30, zIndex: 3, scale: 0.8, rotateX: 90 },
      '76%': { zIndex: 1 },
      '100%': { y: 0, x: 0, scale: 0.6, rotateX: 180 },
    },
    duration: 1.8,
    delay: 0.8,
    ease: 'none',
  })
}
function animationElectronY(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { y: 0, scale: 0.6, rotateX: -180 },
      '25%': { y: -60, zIndex: 1, rotateX: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateX: 0 },
      '75%': { y: 60, zIndex: 3, scale: 0.8, rotateX: 90 },
      '76%': { zIndex: 1 },
      '100%': { y: 0, scale: 0.6, rotateX: 180 },
    },
    duration: 2,
    ease: 'none',
  })
}
function animationElectronX(el: HTMLElement) {
  gsap.to(el, {
    keyframes: {
      '0%': { x: 0, scale: 0.6, rotateY: -180 },
      '25%': { x: -70, zIndex: 1, rotateY: -90 },
      '26%': { zIndex: 3, scale: 0.8 },
      '50%': { scale: 1, rotateY: 0 },
      '75%': { x: 70, zIndex: 3, scale: 0.8, rotateY: 90 },
      '76%': { zIndex: 1 },
      '100%': { x: 0, scale: 0.6, rotateY: 180 },
    },
    duration: 2.2,
    delay: 0.8,
    ease: 'none',
  })
}
</script>

<style scoped lang="scss">
$Atom-size: 300px;
$Nucleus-size: 60px;
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
  width: $Atom-size;
  height: $Atom-size;
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
