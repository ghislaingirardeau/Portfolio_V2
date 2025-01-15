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
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useIsMobile } from 'src/utils/useDeviceInfo'

const animationSettings = useAnimationSettings()
const { headerMounted, presentationMounted, drawerMounted } = storeToRefs(animationSettings)

const leftDrawerOpen = ref(false)

onMounted(() => {
  if (useIsMobile()) {
    drawerMounted.value = true
  }
})

watch(
  () => headerMounted.value,
  (newValue) => {
    if (newValue && !useIsMobile()) {
      leftDrawerOpen.value = true
    }
  },
  { once: true },
)

//TODO:
// block click on is animating
// stack menu + page dedié
// un fond ecran spé desktop + mobile avec anim (les techs en fond écran ?)
// quasar tag html
</script>
