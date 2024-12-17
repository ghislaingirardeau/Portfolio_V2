<template>
  <q-header elevated ref="header">
    <q-toolbar>
      <q-btn v-if="deviceDetail.isMobile" dense flat round icon="menu" @click="toggleLeftDrawer" />

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
import { gsap } from 'src/boot/gsap'
import { onMounted, useTemplateRef } from 'vue'

import { useDeviceDetail } from 'src/stores/deviceDetails'

const deviceDetail = useDeviceDetail()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const header = useTemplateRef<any>('header')

onMounted(() => {
  const elementTarget = header.value?.$el as HTMLDivElement
  gsap.from(elementTarget, { duration: 1, opacity: 0, height: '0px' })
  gsap.to(elementTarget, { duration: 1, height: '50px', opacity: 1 })
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped></style>
