<template>
  <q-layout view="hHh lpR fFf" class="kalam-font">
    <TheHeader v-model:leftDrawerOpen="leftDrawerOpen" v-if="headerMounting" />

    <TheDrawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <TheFooter v-if="footerMounting" />
  </q-layout>
</template>

<script setup lang="ts">
import TheDrawer from 'src/components/TheDrawer.vue'
import TheFooter from 'src/components/TheFooter.vue'
import TheHeader from 'src/components/TheHeader.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useDeviceDetail } from 'src/stores/deviceDetails'

const deviceDetail = useDeviceDetail()

const animationSettings = useAnimationSettings()
const { footerMounting, headerMounting } = storeToRefs(animationSettings)

import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const leftDrawerOpen = ref(false)

watch(
  () => headerMounting.value,
  (newValue) => {
    if (newValue && !deviceDetail.isMobile) {
      leftDrawerOpen.value = true
    }
  },
)
</script>
