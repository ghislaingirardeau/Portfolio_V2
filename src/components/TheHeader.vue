<template>
  <q-header elevated ref="header" class="opacity-0 h-0">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title> GG WebDev </q-toolbar-title>
      <q-space />
      <SwitchModeBtn />
      <SwitchLangBtn />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
const leftDrawerOpen = defineModel('leftDrawerOpen')
import SwitchLangBtn from './header/SwitchLangBtn.vue'
import SwitchModeBtn from './header/SwitchModeBtn.vue'
import { watch, useTemplateRef } from 'vue'
import { useGlobalSettings } from 'src/stores/globalSettings'
import { storeToRefs } from 'pinia'

const settings = useGlobalSettings()
const { timeline } = storeToRefs(settings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const header = useTemplateRef<any>('header')

function headerAnimation() {
  const elementTarget = header.value?.$el as HTMLDivElement
  timeline.value.to(elementTarget, { duration: settings.ANIM_DURATION, height: '50px', opacity: 1 })
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(
  () => settings.HEADER_ANIMATED,
  (newValue) => {
    if (newValue) {
      console.log('start header animation')
      headerAnimation()
    }
  },
)
</script>

<style scoped></style>
