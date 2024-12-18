<template>
  <q-page :key="locale" class="q-pa-lg column flex-center">
    <div class="flex w-72 lg:w-96 rotate-20">
      <div
        :ref="hello.set"
        v-for="(letter, i) in t('index.me.p1')"
        :key="i"
        class="text-4xl lg:text-4xl opacity-0"
      >
        {{ letter }}
      </div>
    </div>

    <div class="flex w-72 lg:w-96 rotate-20 translate-y-10">
      <div
        :ref="name.set"
        v-for="(letter, i) in t('index.me.p2')"
        :key="i"
        class="text-4xl lg:text-4xl opacity-0"
      >
        {{ letter }}
      </div>
    </div>

    <div class="flex w-72 lg:w-96 rotate-20 translate-y-24">
      <div
        :ref="work.set"
        v-for="(letter, i) in t('index.me.p3')"
        :key="i"
        class="text-4xl lg:text-4xl opacity-0"
      >
        {{ letter }}
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTemplateRefsList } from '@vueuse/core'
import { gsap } from 'src/boot/gsap'
import { onMounted, watch } from 'vue'

const { t, locale } = useI18n({ useScope: 'global' })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hello = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const name = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const work = useTemplateRefsList<any>()

onMounted(() => {
  AnimeTitle()
})

function AnimeTitle() {
  const tl = gsap.timeline()

  animation(hello.value, t('index.me.p1'), tl)

  animation(name.value, t('index.me.p2'), tl)

  animation(work.value, t('index.me.p3'), tl)
}

function animation(el: HTMLElement[], value: string, tl: gsap.core.Timeline) {
  for (let index = 0; index < value.length; index++) {
    const element = el[index] as HTMLElement
    if (element.textContent === ' ') {
      element.innerHTML = '<span>_</span>'
    }
    tl.to(element, {
      duration: 0.05,
      keyframes: {
        '0%': { scale: 0.1, opacity: 0 },
        '100%': { scale: 1, opacity: 1 },
        easeEach: 'hop',
      },
    }).to(element, {
      duration: 0.05,
      color: 'red',
      textShadow: '2px 2px black',
    })
  }
}

watch(
  () => locale.value,
  () => {
    console.log('locale changed')
    setTimeout(() => {
      AnimeTitle()
    }, 1000)
  },
)
</script>

<style scoped></style>
