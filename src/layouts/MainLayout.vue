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
import { useDeviceDetail } from 'src/stores/deviceDetails'

const { isMobile } = useDeviceDetail()

import { ref } from 'vue'

const leftDrawerOpen = ref(false)

setTimeout(() => {
  if (!isMobile) {
    leftDrawerOpen.value = true
  }
}, 1000)
</script>
