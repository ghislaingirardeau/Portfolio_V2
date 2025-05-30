<template>
  <q-layout
    view="hHh lpR fFf"
    class="indie-flower-regular"
    :class="$q.dark.isActive ? 'space-bg-container-dark' : 'space-bg-container'"
  >
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
import { useQuasar } from 'quasar'

const $q = useQuasar()

const animationSettings = useAnimationSettings()
const { headerMounted, presentationMounted, drawerMounted } = storeToRefs(animationSettings)

const leftDrawerOpen = ref(false)

const { locale } = useI18n({ useScope: 'global' })

const { orientation } = useScreenOrientation()

const route = useRoute()

onMounted(() => {
  $q.dark.toggle()
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

<style scoped lang="scss">
@mixin bg-image() {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/public/space.jpg');
  opacity: 0.8;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.space-bg-container::before {
  @include bg-image();
  filter: invert(1);
}

.space-bg-container-dark::before {
  @include bg-image();
  filter: invert(0);
}
</style>
