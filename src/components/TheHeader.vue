<template>
  <q-header elevated ref="header" class="opacity-0 h-0">
    <q-toolbar>
      <transition
        v-if="useIsMobile()"
        appear
        enter-active-class="animated  rotateIn"
        leave-active-class="animated  rotateOut"
        mode="out-in"
      >
        <q-btn
          :key="leftDrawerOpen ? 'close' : 'open'"
          dense
          flat
          round
          :icon="leftDrawerOpen ? mdiClose : mdiMenu"
          @click="toggleLeftDrawer"
        />
      </transition>

      <q-toolbar-title @click="router.push({ name: 'home' })"> GG WebDev </q-toolbar-title>
      <q-space />
      <SwitchModeBtn />
      <SwitchLangBtn />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
const leftDrawerOpen = defineModel('leftDrawerOpen')
import SwitchLangBtn from './header/SwitchLangBtn.vue'
import SwitchModeBtn from './header/SwitchModeBtn.vue'
import { useTemplateRef, onMounted } from 'vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { gsap } from 'src/boot/gsap'

import { storeToRefs } from 'pinia'
import { mdiClose, mdiMenu } from '@quasar/extras/mdi-v7'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { useRouter } from 'vue-router'
import { name } from '@vue/eslint-config-prettier/skip-formatting'

const animationSettings = useAnimationSettings()
const { ANIM_LONG, headerMounted } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const header = useTemplateRef<any>('header')
const router = useRouter()

function headerAnimation() {
  const elementTarget = header.value?.$el as HTMLDivElement
  gsap.to(elementTarget, {
    duration: ANIM_LONG.value,
    height: '50px',
    opacity: 1,
    onComplete() {
      headerMounted.value = true
    },
  })
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
  headerAnimation()
})
</script>

<style scoped>
.q-toolbar__title {
  min-width: 150px;
}
</style>
