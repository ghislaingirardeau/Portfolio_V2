<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title> Title </q-toolbar-title>
      <q-space />
      <q-btn flat :icon="mdiThemeLightDark" @click="() => $q.dark.toggle()" />
      <SwitchLangBtn />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
const leftDrawerOpen = defineModel('leftDrawerOpen')
import { mdiThemeLightDark } from '@quasar/extras/mdi-v7'
import SwitchLangBtn from './header/SwitchLangBtn.vue'

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped></style>
