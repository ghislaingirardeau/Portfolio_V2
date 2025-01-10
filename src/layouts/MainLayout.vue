<template>
  <q-layout view="hHh lpR fFf" class="kalam-font">
    <TheHeader
      v-model:leftDrawerOpen="leftDrawerOpen"
      v-if="presentationMounted || headerMounted"
    />

    <TheDrawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <TheFooter v-if="presentationMounted || headerMounted" />
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
const { headerMounted, presentationMounted } = storeToRefs(animationSettings)

const leftDrawerOpen = ref(false)

watch(
  () => headerMounted.value,
  (newValue) => {
    if (newValue && !useIsMobile()) {
      leftDrawerOpen.value = true
    }
  },
)

//TODO:
// route guards => if hot relaod, redirect to index
// block click on is animating
// stack menu + page dedié
// my commitment menu + page dedié
// un fond ecran spé desktop + mobile avec anim
// fix les locales
// fix les couleurs
// quasar tag html
</script>
