<template>
  <q-page :key="locale" class="q-pa-lg column flex-center">
    <div class="w-full flex flex-center -translate-y-28">
      <div ref="blockHello" class="flex w-72 lg:w-3/5">
        <div
          :ref="lettersHello.set"
          v-for="(letter, i) in t('index.me.p1')"
          :key="i"
          class="text-4xl lg:text-5xl opacity-0"
        >
          {{ letter }}
        </div>
      </div>

      <div ref="blockName" class="flex w-72 lg:w-3/5 translate-y-10">
        <div
          :ref="lettersName.set"
          v-for="(letter, i) in t('index.me.p2')"
          :key="i"
          class="text-4xl lg:text-5xl opacity-0"
        >
          {{ letter }}
        </div>
      </div>

      <div ref="blockWork" class="flex w-72 lg:w-3/5 translate-y-24">
        <div
          :ref="letterWork.set"
          v-for="(letter, i) in t('index.me.p3')"
          :key="i"
          class="text-4xl lg:text-5xl opacity-0"
        >
          {{ letter }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTemplateRefsList } from '@vueuse/core'
import { onMounted, watch, ref } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'

const animationSettings = useAnimationSettings()
const { headerMounting } = storeToRefs(animationSettings)

const { t, locale } = useI18n({ useScope: 'global' })

const tl = gsap.timeline()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lettersHello = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lettersName = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const letterWork = useTemplateRefsList<any>()

const blockHello = ref()
const blockName = ref()
const blockWork = ref()

onMounted(() => {
  AnimeTitle()
})

function AnimeTitle() {
  animation(lettersHello.value, t('index.me.p1'), 0.05)
  animation(lettersName.value, t('index.me.p2'), 0.05)
  animation(letterWork.value, t('index.me.p3'), 0.05)

  animationBlock(blockWork.value)
  animationBlock(blockName.value)
  animationBlock(blockHello.value)

  tl.call(() => {
    headerMounting.value = true
  })
}

function animationBlock(el: HTMLElement[]) {
  tl.to(el, {
    duration: 0.3,
    rotateZ: 20,
    ease: 'fall-in',
    transformOrigin: 'top left',
  })
}

function animation(el: HTMLElement[], value: string, duration: number) {
  for (let index = 0; index < value.length; index++) {
    const element = el[index] as HTMLElement
    if (element.textContent === ' ') {
      element.innerHTML = '<span>_</span>'
    }
    tl.to(element, {
      duration: duration,
      keyframes: {
        '0%': { scale: 0.1, opacity: 0 },
        '100%': { scale: 1, opacity: 1 },
        easeEach: 'hop',
      },
    }).to(element, {
      duration: duration,
      textShadow: '2px 2px black',
      className: 'text-4xl lg:text-5xl opacity-0 text-primary',
    })
  }
}

watch(
  () => locale.value,
  () => {
    console.log('locale changed')
    setTimeout(() => {
      AnimeTitle()
    }, 500)
  },
)
</script>

<style scoped></style>
