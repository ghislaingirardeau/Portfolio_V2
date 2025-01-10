<template>
  <div class="w-full flex flex-center" :key="locale">
    <div ref="blockHello" class="flex justify-end lg:justify-start w-72 lg:w-3/5">
      <div
        :ref="lettersHello.set"
        v-for="(letter, i) in t('index.me.p1')"
        :key="i"
        class="text-3xl lg:text-5xl opacity-0"
      >
        {{ letter }}
      </div>
    </div>

    <div ref="blockName" class="flex justify-end lg:justify-start w-72 lg:w-3/5 mt-4 lg:mt-8">
      <div
        :ref="lettersName.set"
        v-for="(letter, i) in t('index.me.p2')"
        :key="i"
        class="text-3xl lg:text-5xl opacity-0"
      >
        {{ letter }}
      </div>
    </div>

    <div ref="blockWork" class="flex justify-end lg:justify-start w-72 lg:w-3/5 mt-4 lg:mt-8">
      <div
        :ref="letterWork.set"
        v-for="(letter, i) in t('index.me.p3')"
        :key="i"
        class="text-3xl lg:text-5xl opacity-0"
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTemplateRefsList } from '@vueuse/core'
import { onMounted, watch, ref } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

const animationSettings = useAnimationSettings()
const { presentationMounted } = storeToRefs(animationSettings)

const { t, locale } = useI18n({ useScope: 'global' })

const tl = gsap.timeline()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lettersHello = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lettersName = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const letterWork = useTemplateRefsList<any>()

const $q = useQuasar()

const blockHello = ref()
const blockName = ref()
const blockWork = ref()

function shadowColor() {
  return $q.dark.isActive ? '2px 2px white' : '2px 2px black'
}

onMounted(() => {
  presentationMounted.value = false
  AnimeTitleLetters()
})

function AnimeTitleLetters() {
  animationLetters(lettersHello.value, t('index.me.p1'), 0.05)
  animationLetters(lettersName.value, t('index.me.p2'), 0.05)
  animationLetters(letterWork.value, t('index.me.p3'), 0.05)

  tl.call(() => {
    presentationMounted.value = true
  })
}

function animationLetters(el: HTMLElement[], value: string, duration: number) {
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
      textShadow: shadowColor(),
      className: 'text-3xl lg:text-5xl opacity-0 text-primary',
    })
  }
}

watch(
  () => locale.value,
  () => {
    presentationMounted.value = false
    setTimeout(() => {
      AnimeTitleLetters()
    }, 500)
  },
)

watch(
  () => $q.dark.isActive,
  () => {
    presentationMounted.value = false
    setTimeout(() => {
      AnimeTitleLetters()
    }, 500)
  },
)
</script>

<style scoped></style>
