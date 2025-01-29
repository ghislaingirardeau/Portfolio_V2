<template>
  <div class="atom h-0 w-0" :class="atomDisplayClass">
    <div
      ref="nucleus"
      class="atome-nucleus flex flex-center scale-75 opacity-0 text-grey-200"
      :class="modeColor"
      @click="emit('robotAction')"
    >
      <span>{{ title }}</span>
    </div>
    <div
      ref="electrons"
      v-for="(iconUrl, index) in iconsCategory"
      :key="index"
      class="electron flex flex-center opacity-0"
    >
      <q-img :src="iconUrl" width="100%" :class="customIconFilterInvert(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobile, useIsMobileTall } from 'src/utils/useDeviceInfo'

import { devIconSrc } from 'src/utils/useIconSources'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

const emit = defineEmits(['robotAction'])

const animationSettings = useAnimationSettings()
const { isRobotProcessing, isRobotClickable, isRobotTalk, isRobotStepBack } =
  storeToRefs(animationSettings)

const $q = useQuasar()

const nucleus = ref()
const electrons = useTemplateRef('electrons')
const title = ref('Frontend')

const tl = gsap.timeline()

const props = defineProps({
  slideChat: {
    type: Number,
    required: true,
  },
})

const iconsCategory = ref(
  Object.values(devIconSrc[props.slideChat as keyof typeof devIconSrc]) as string[],
)

const modeColor = computed(() => {
  return $q.dark.mode ? 'atome-nucleus-dark' : 'atome-nucleus-light'
})

const atomDisplayClass = computed(() => {
  if (useIsMobile()) {
    return useIsMobileTall() ? 'mt-10 atom-center' : 'atom-center'
  }
  return 'atom-start scale-150'
})

onMounted(() => {
  isRobotProcessing.value = true
  isRobotClickable.value = false
  changeTitle()
  launchAnimation()
})

watch(
  () => props.slideChat,
  () => {
    isRobotProcessing.value = true
    isRobotClickable.value = false
    tl.duration(1.5)
    tl.reverse()
    tl.then(() => {
      iconsCategory.value = Object.values(devIconSrc[props.slideChat as keyof typeof devIconSrc])
      changeTitle()
      tl.duration(3)

      tl.restart()
    })
  },
)

function customIconFilterInvert(i: number) {
  if (props.slideChat === 1 && i === 2 && $q.dark.mode) {
    return 'filter invert'
  }
}

function changeTitle() {
  if (props.slideChat === 0) {
    title.value = 'Frontend'
  } else {
    title.value = 'Backend'
  }
}

function launchAnimation() {
  const positionList: [number, number, boolean][] = [
    [0, 80, false],
    [0, -80, false],
    [80, 0, false],
    [-80, 0, false],
    [60, -60, false],
    [-60, 60, false],
    [-60, -60, false],
    [60, 60, false],
    [-90, -110, true],
    [90, 110, true],
  ]
  animationNucleus()
  electrons.value?.forEach((el, i) => {
    if (positionList[i]) {
      animationElectron(el as HTMLElement, positionList[i], i)
    }
  })
  tl.call(() => {
    isRobotProcessing.value = false
    isRobotClickable.value = true
    if (props.slideChat === 0) {
      isRobotTalk.value = true
      isRobotStepBack.value = false
    }
    if (props.slideChat === 1) {
      isRobotTalk.value = false
      isRobotStepBack.value = true
    }
  })
}

function animationNucleus() {
  tl.to(nucleus.value, {
    opacity: 1,
    duration: 0.5,
    scale: 1,
    ease: 'hop',
  })
}

function animationElectron(el: HTMLElement, pos: [number, number, boolean], index: number) {
  tl.to(
    el,
    {
      keyframes: {
        '0%': { x: 0, y: 0 },
        '30%': {
          x: -pos[0],
          y: -pos[1],
          opacity: 1,
          rotateZ: pos[2] ? 90 : -90,
          transformOrigin: `${(pos[0] ? pos[0] : 0) + 17}px ${(pos[1] ? pos[1] : 0) + 17}px`,
        },
        '100%': { rotateZ: pos[2] ? 360 : -360 },
      },
      duration: 3,
      ease: 'none',
    },
    index === 0 ? '0.5' : '<',
  )
}
</script>

<style scoped lang="scss">
$Nucleus-size: 90px;
$Electron-size: 35px;

.atome-nucleus-dark {
  background: radial-gradient(
    hsl(180, 3%, 23%),
    hsl(186, 89%, 86%) 50%,
    hsl(186, 89%, 86%, 0.4) 60%,
    hsla(0, 0%, 100%, 0) 70%
  );
}

.atome-nucleus-light {
  background: radial-gradient(
    hsl(187, 9%, 79%),
    hsl(191, 100%, 20%) 50%,
    hsl(191, 100%, 20%, 0.4) 60%,
    hsla(0, 0%, 100%, 0) 70%
  );
}

.atom {
  position: absolute;
  position: relative;
}

.atom-center {
  left: calc(50% - ($Nucleus-size / 2));
  top: calc($Nucleus-size * 1.1);
}

.atom-start {
  left: 25%;
  top: calc($Nucleus-size * 2);
}

.atome-nucleus {
  width: $Nucleus-size;
  height: $Nucleus-size;
  position: absolute;

  border-radius: 50%;
  color: $white;

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
