<template>
  <q-layout view="hHh lpR fFf" class="indie-flower-regular">
    <TheHeader
      v-model:leftDrawerOpen="leftDrawerOpen"
      v-if="presentationMounted || headerMounted"
    />

    <TheDrawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <LogoAEContainer v-if="!useIsMobile()" />
      <router-view :key="locale" />
      <AppRobotStars v-if="useIsMobile() && route.name !== 'game'" :key="'reset' + orientation" />
      <AppRobotStarsDesktop v-else-if="route.name !== 'game'" />
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
import AppRobotStars from 'src/components/common/AppRobotStars.vue'
import AppRobotStarsDesktop from 'src/components/common/AppRobotStarsDesktop.vue'
import LogoAEContainer from 'src/components/homePage/LogoAEContainer.vue'
import { useI18n } from 'vue-i18n'
import { useScreenOrientation } from '@vueuse/core'
import { useRoute } from 'vue-router'

const animationSettings = useAnimationSettings()
const { headerMounted, presentationMounted, drawerMounted } = storeToRefs(animationSettings)

const leftDrawerOpen = ref(false)

const { locale } = useI18n({ useScope: 'global' })

const { orientation } = useScreenOrientation()

const route = useRoute()

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
// un fond ecran spé desktop + mobile avec anim (les techs en fond écran ?)
// quasar tag html
</script>

<style scoped lang="scss"></style>
