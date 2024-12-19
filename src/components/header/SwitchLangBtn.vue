<template>
  <q-btn ref="toggleLangBtn" class="opacity-0 -translate-x-60" flat @click="switchLang">{{
    langLocale
  }}</q-btn>
</template>

<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGlobalSettings } from 'src/stores/globalSettings'
import { storeToRefs } from 'pinia'

const { locale } = useI18n({ useScope: 'global' })
const settings = useGlobalSettings()
const { timeline } = storeToRefs(settings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleLangBtn = useTemplateRef<any>('toggleLangBtn')

const langLocale = computed(() => {
  return locale.value === 'en-US' ? 'fr' : 'en'
})

watch(
  () => settings.HEADER_ANIMATED,
  () => {
    const elementTarget = toggleLangBtn.value?.$el as HTMLDivElement
    timeline.value.to(elementTarget, {
      duration: settings.ANIM_HEADER_BTN_DURATION,
      x: 0,
      opacity: 1,
    })
  },
)

function switchLang() {
  if (locale.value === 'en-US') {
    locale.value = 'fr'
  } else {
    locale.value = 'en-US'
  }
}
</script>

<style scoped></style>
