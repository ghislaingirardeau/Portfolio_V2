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
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useIsMobile } from 'src/utils/useDeviceInfo'

const animationSettings = useAnimationSettings()
const { footerMounting, headerMounting, headerMounted } = storeToRefs(animationSettings)

const leftDrawerOpen = ref(false)

watch(
  () => headerMounted.value,
  (newValue) => {
    if (newValue && !useIsMobile()) {
      leftDrawerOpen.value = true
    }
  },
)
</script>
