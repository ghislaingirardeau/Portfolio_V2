<template>
  <q-btn ref="toggleLangBtn" flat @click="switchLang">{{ langLocale }}</q-btn>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'src/boot/gsap'
import { onMounted } from 'vue'
import { useGlobalSettings } from 'src/stores/globalSettings'

const { locale } = useI18n({ useScope: 'global' })
const { ANIM_DELAY, ANIM_DURATION } = useGlobalSettings()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleLangBtn = useTemplateRef<any>('toggleLangBtn')

const langLocale = computed(() => {
  return locale.value === 'en-US' ? 'fr' : 'en'
})

onMounted(() => {
  const elementTarget = toggleLangBtn.value?.$el as HTMLDivElement
  gsap.from(elementTarget, {
    duration: ANIM_DURATION,
    x: -250,
    opacity: 0,
    delay: ANIM_DELAY,
  })
  gsap.to(elementTarget, { duration: ANIM_DURATION, x: 0, opacity: 1, delay: ANIM_DELAY })
})

function switchLang() {
  if (locale.value === 'en-US') {
    locale.value = 'fr'
  } else {
    locale.value = 'en-US'
  }
}
</script>

<style scoped></style>
