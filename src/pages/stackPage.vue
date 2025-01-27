<template>
  <div class="q-pa-lg relative" style="height: 200px">
    <div class="atom">
      <div ref="atom" class="atome-nucleus flex flex-center">
        <span ref="atomTitle">{{ slideChat === 0 ? 'Frontend' : 'Backend' }}</span>
      </div>
      <div
        ref="items"
        v-for="(iconUrl, index) in iconsCategory"
        :key="index"
        class="electron flex flex-center"
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
import { transform } from 'typescript'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

const animationSettings = useAnimationSettings()
const { isRobotTalk, isRobotClickable } = storeToRefs(animationSettings)

const { tm } = useI18n({ useScope: 'global' })

const atom = ref()
const atomTitle = ref()
const itemRefs = useTemplateRef('items')
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

function launchAnimation() {
  const rotate = 360
  const rotateReverse = -360
  itemRefs.value?.forEach((el, i) => {
    if (i === 0) animationElectron(el as HTMLElement, 0, 80, rotate)
    if (i === 1) animationElectron(el as HTMLElement, 0, -80, rotate)
    if (i === 2) animationElectron(el as HTMLElement, 80, 0, rotate)
    if (i === 3) animationElectron(el as HTMLElement, -80, 0, rotate)
    if (i === 4) animationElectron(el as HTMLElement, 60, -60, rotate)
    if (i === 5) animationElectron(el as HTMLElement, -60, 60, rotate)
    if (i === 6) animationElectron(el as HTMLElement, -60, -60, rotate)
    if (i === 7) animationElectron(el as HTMLElement, 60, 60, rotate)
    if (i === 8) animationElectron(el as HTMLElement, -90, -110, rotateReverse)
    if (i === 9) animationElectron(el as HTMLElement, 90, 110, rotateReverse)
  })
}

function animationElectron(el: HTMLElement, x: number, y: number, deg: number) {
  gsap.to(el, {
    keyframes: {
      '0%': { x: 0, y: 0 },
      '10%': {
        x: -x,
        y: -y,
        rotateZ: 0,
        transformOrigin: `${(x ? x : 0) + 17}px ${(y ? y : 0) + 17}px`,
      },
      '100%': { x: -x, y: -y, rotateZ: deg },
    },
    duration: 6,
    yoyo: true,
    repeat: -1,
    ease: 'none',
  })
}
</script>

<style scoped lang="scss">
$Atom-size: 100px;
$Nucleus-size: 120px;
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
  top: calc($Nucleus-size / 1.5);
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
