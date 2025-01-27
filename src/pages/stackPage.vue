<template>
  <div class="q-pa-lg relative" style="height: 200px">
    <div class="atom">
      <div ref="nucleus" class="atome-nucleus flex flex-center scale-75 opacity-0">
        <span>{{ slideChat === 0 ? 'Frontend' : 'Backend' }}</span>
      </div>
      <div
        ref="electrons"
        v-for="(iconUrl, index) in iconsCategory"
        :key="index"
        class="electron flex flex-center opacity-0"
      >
        <q-img :src="iconUrl" width="100%"></q-img>
      </div>
    </div>

    <TheRobotContainer @robot-action="robotAction" />
    <ChatMessageContainer
      ref="chatContainer"
      :meTexts="chatTexts"
      :visitor-texts="visitorChatTexts"
      :delay-animation="0.5"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { devIconSrc } from 'src/utils/useIconSources'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

const animationSettings = useAnimationSettings()
const { isRobotTalk, isRobotClickable } = storeToRefs(animationSettings)

const { tm } = useI18n({ useScope: 'global' })

const nucleus = ref()
const electrons = useTemplateRef('electrons')
const slideChat = ref(0)

const iconsCategory = computed(() => {
  return Object.values(devIconSrc[slideChat.value]) as string[]
})

const chatTexts = computed(() => {
  return tm(`chatMessage.stack.${slideChat.value}.description`) as string[]
})

const visitorChatTexts = computed(() => {
  return tm(`chatMessage.stack.${slideChat.value}.title`) as string
})

onMounted(() => {
  isRobotTalk.value = true
  isRobotClickable.value = true
  launchAnimation()
})

function robotAction() {
  if (slideChat.value === 1) {
    slideChat.value = 0
  } else {
    slideChat.value++
  }
}

const tl = gsap.timeline()

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
  tl.to(nucleus.value, {
    opacity: 1,
    duration: 0.5,
    scale: 1,
    ease: 'hop',
  })
  electrons.value?.forEach((el, i) => {
    if (positionList[i]) {
      animationElectron(el as HTMLElement, positionList[i], i)
    }
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
$Atom-size: 100px;
$Nucleus-size: 90px;
$Electron-size: 35px;

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
  top: calc($Nucleus-size * 1.1);
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
