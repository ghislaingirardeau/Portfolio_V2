<template>
  <q-layout
    view="hHh lpR fFf"
    class="indie-flower-regular bg-image"
    :key="`${breakpoints.active().value}`"
    :class="
      isBackgroundMount
        ? $q.dark.isActive
          ? ' space-bg-container-dark'
          : 'space-bg-container'
        : null
    "
  >
    <TheHeader
      v-model:leftDrawerOpen="leftDrawerOpen"
      v-if="presentationMounted || headerMounted"
    />

    <TheDrawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <LogoAEContainer v-if="!useIsMobile()" />
      <router-view :key="locale" />
      <AppRobotStars v-if="route.name !== 'game'" :key="'reset' + orientation" />
    </q-page-container>

    <TheRobotSkeleton @click="robotAction" :class="isRobotClickable ? 'cursor-pointer' : ''" />
    <TheRobotEye />
    <TheRobotIdea />

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
import { useIsMobile, breakpoints } from 'src/utils/useDeviceInfo'
import AppRobotStars from 'src/components/common/AppRobotStars.vue'
import LogoAEContainer from 'src/components/homePage/LogoAEContainer.vue'
import { useI18n } from 'vue-i18n'
import { useScreenOrientation } from '@vueuse/core'
import { useRoute } from 'vue-router'
import TheRobotSkeleton from 'src/components/robot/TheRobotSkeleton.vue'
import TheRobotEye from 'src/components/robot/TheRobotEye.vue'
import TheRobotIdea from 'src/components/robot/TheRobotIdea.vue'

const animationSettings = useAnimationSettings()
const { headerMounted, presentationMounted, drawerMounted, executeRobotAction, isRobotClickable } =
  storeToRefs(animationSettings)

const leftDrawerOpen = ref(false)
const isBackgroundMount = ref(false)

const { locale } = useI18n({ useScope: 'global' })

const { orientation } = useScreenOrientation()

const route = useRoute()

onMounted(() => {
  setTimeout(() => {
    isBackgroundMount.value = true
  }, 200)
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

function robotAction() {
  if (isRobotClickable.value) {
    executeRobotAction.value = true
  }
}
</script>

<style scoped lang="scss">
.bg-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  background-position: 80% center;
  background-image: url('/space_2_mobile.jpg');
}

.space-bg-container::before {
  transition: all 2s ease-in-out;
  filter: invert(1) hue-rotate(160deg) saturate(1.4) brightness(0.8);
  opacity: 1;
}

.space-bg-container-dark::before {
  transition: all 2s ease-in-out;
  filter: invert(0);
  opacity: 1;
}

@media screen and (min-width: 1025px) {
  .bg-image::before {
    background-image: url('/space_2.jpg');
  }
}
</style>
