<template>
  <q-page class="q-pa-lg flex flex-center flex-col">
    <div class="flex w-36 rotate-35">
      <div
        :ref="hello.set"
        v-for="(letter, i) in t('index.me.p1')"
        :key="i"
        class="text-h3 opacity-0"
      >
        {{ letter }}
      </div>
    </div>

    <div class="flex w-80 rotate-35 translate-y-20 translate-x-16">
      <div
        :ref="name.set"
        v-for="(letter, i) in t('index.me.p2')"
        :key="i"
        class="text-h3 opacity-0"
      >
        {{ letter }}
      </div>
    </div>

    <div class="flex w-96 rotate-35 translate-y-40 translate-x-16">
      <div
        :ref="work.set"
        v-for="(letter, i) in t('index.me.p3')"
        :key="i"
        class="text-h3 opacity-0"
      >
        {{ letter }}
      </div>
    </div>

    <q-btn @click="AnimeTitle">Animate</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTemplateRefsList } from '@vueuse/core'
import { gsap } from 'src/boot/gsap'
import { onMounted } from 'vue'

const { t } = useI18n({ useScope: 'global' })

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

  animation(hello.value, tl)

  animation(name.value, tl)

  animation(work.value, tl)
}

function animation(el: HTMLElement[], tl: gsap.core.Timeline) {
  for (let index = 0; index < el.length; index++) {
    const element = el[index] as HTMLElement
    if (element.textContent === ' ') {
      element.innerHTML = '<span>_</span>'
    }
    tl.to(element, {
      duration: 0.1,
      keyframes: {
        '0%': { scale: 0.1, opacity: 0 },
        '100%': { scale: 1, opacity: 1 },
        easeEach: 'hop',
      },
    }).to(element, {
      duration: 0.1,
      color: 'red',
      textShadow: '2px 2px black',
    })
  }
}
</script>

<style scoped></style>
