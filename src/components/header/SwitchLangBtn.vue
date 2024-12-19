<template>
  <q-btn ref="toggleLangBtn" class="opacity-0 -translate-x-60" flat @click="switchLang">{{
    langLocale
  }}</q-btn>
</template>

<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'

import { storeToRefs } from 'pinia'

const { locale } = useI18n({ useScope: 'global' })
const animationSettings = useAnimationSettings()
const { ANIM_SHORT, layoutAnimating } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleLangBtn = useTemplateRef<any>('toggleLangBtn')

const langLocale = computed(() => {
  return locale.value === 'en-US' ? 'fr' : 'en'
})

onMounted(() => {
  animationAppear()
})

function animationAppear() {
  const elementTarget = toggleLangBtn.value?.$el as HTMLDivElement
  gsap.to(elementTarget, {
    duration: ANIM_SHORT.value,
    x: 0,
    opacity: 1,
    delay: 1,
  })
}

function switchLang() {
  layoutAnimating.value = true
  if (locale.value === 'en-US') {
    locale.value = 'fr'
  } else {
    locale.value = 'en-US'
  }
}
</script>

<style scoped></style>
