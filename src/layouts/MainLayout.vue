<template>
  <q-layout view="hHh lpR fFf" class="kalam-font">
    <TheHeader v-model:leftDrawerOpen="leftDrawerOpen" />

    <TheDrawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <TheFooter />
  </q-layout>
</template>

<script setup lang="ts">
import TheDrawer from 'src/components/TheDrawer.vue'
import TheFooter from 'src/components/TheFooter.vue'
import TheHeader from 'src/components/TheHeader.vue'
import { useGlobalSettings } from 'src/stores/globalSettings'

const settings = useGlobalSettings()

import { ref, watch } from 'vue'

const leftDrawerOpen = ref(false)

watch(
  () => settings.DRAWER_ANIMATED,
  (newValue) => {
    if (newValue) {
      leftDrawerOpen.value = true
    }
  },
)
</script>
