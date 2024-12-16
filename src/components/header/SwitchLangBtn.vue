<template>
  <q-btn flat @click="switchLang">{{ langLocale }}</q-btn>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const langLocale = computed(() => {
  return locale.value === 'en-US' ? 'fr' : 'en'
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
