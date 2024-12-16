<template>
  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
      <q-toolbar-title class="flex flex-center">
        <h3 class="text-h5">{{ t('footer.title') }}</h3>
        <q-space />
        <q-icon
          v-for="icon in icons"
          :key="icon.name"
          size="lg"
          :name="icon.name"
          class="cursor-pointer"
          @click="goToExternalLink(icon.link)"
        />
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { mdiGithub, mdiLinkedin } from '@quasar/extras/mdi-v7'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const icons = [
  {
    name: mdiGithub,
    link: 'https://github.com/ghislaingirardeau',
  },
  {
    name: mdiLinkedin,
    link: 'https://www.linkedin.com/in/ghislain-girardeau/',
  },
]

function goToExternalLink(link: string) {
  window.open(link, '_blank')
}
</script>

<style scoped></style>
