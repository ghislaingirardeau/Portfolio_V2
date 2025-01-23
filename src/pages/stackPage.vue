<template>
  <div class="q-pa-lg flex flex-center">
    <div class="atom">
      <div ref="atom" class="atome-nucleus">
        <div ref="vue" class="electron flex flex-center">
          <q-img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"
            width="75%"
          ></q-img>
        </div>
        <div ref="nuxt" class="electron flex flex-center">
          <q-img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg"
            width="75%"
          ></q-img>
        </div>
        <div ref="html" class="electron flex flex-center">
          <q-img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
            width="75%"
          ></q-img>
        </div>
      </div>
    </div>
    <!-- <AtomSample /> -->
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'src/boot/gsap'
import AtomSample from 'src/components/stackPage/AtomSample.vue'
import { onMounted, ref } from 'vue'

const vue = ref()
const nuxt = ref()
const html = ref()
const atom = ref()

onMounted(() => {
  gsap.fromTo(
    vue.value,
    { y: -107, rotateZ: 45, rotateX: -90, x: 10 },
    {
      keyframes: {
        '0%': { opacity: 0 },
        '12%': { opacity: 0 },
        '17%': { opacity: 1 },
        '50%': {},
        '85%': { opacity: 1 },
        '90%': { opacity: 0 },
      },

      transformOrigin: '0px 112.5px', // $Nucleus-size + $Electron-size / 2
      rotateX: 270,
      duration: 8,
      delay: 1,
      repeat: -1,
    },
  )
  gsap.fromTo(
    nuxt.value,
    { y: -58, rotateZ: -40, rotateX: -90 },
    {
      keyframes: {
        '0%': { opacity: 0 },
        '7%': { opacity: 0 },
        '12%': { opacity: 1 },
        '50%': {},
        '80%': { opacity: 1 },
        '85%': { opacity: 0 },
      },

      transformOrigin: '0px 92.5px',
      rotateX: 270,
      duration: 4,
      delay: 1,
      repeat: -1,
    },
  )
  gsap.fromTo(
    html.value,
    { y: -80, rotateX: -90 }, // pour lui donner une circonférence plus large +20px sur y
    {
      keyframes: {
        '0%': { opacity: 0 },
        '10%': { opacity: 0 },
        '15%': { opacity: 1 },
        '50%': {},
        '85%': { opacity: 1 },
        '90%': { opacity: 0 },
      },
      transformOrigin: '0px 102.5px', // pour lui donner une circonférence plus large +20px
      rotateX: 270,
      duration: 6,
      delay: 1.2,
      repeat: -1,
    },
  )
  // gsap.to(atom.value, {
  //   rotateZ: 180,
  //   duration: 30,
  // })
})
</script>

<style scoped lang="scss">
$Atom-size: 300px;
$Nucleus-size: 80px;
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
  // background-color: rgb(180, 180, 233);
  position: relative;
}
.atome-nucleus {
  width: $Nucleus-size;
  height: $Nucleus-size;
  border-radius: 50%;
  background-color: rgb(206, 48, 48);
  position: absolute;
  left: $Atom-size * 0.5 - $Nucleus-size * 0.5;
  top: $Atom-size * 0.5 - $Nucleus-size * 0.5;
  position: relative;
  z-index: 2;
  &:after {
    @include circle($Nucleus-size);
    position: absolute;
    background-color: rgb(172, 90, 90);
    opacity: 0.5;
  }
}
.electron {
  width: $Electron-size;
  height: $Electron-size;
  position: absolute;
  left: $Nucleus-size * 0.5 - $Electron-size * 0.5;
  top: $Nucleus-size * 0.5 - $Electron-size * 0.5;
}
</style>
