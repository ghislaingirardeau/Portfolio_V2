<template>
  <q-header elevated ref="header" class="opacity-0 h-0 bg-transparent" :class="headerColor">
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
          aria-label="menu"
          dense
          :color="$q.dark.isActive ? 'dark-primary' : 'secondary'"
          flat
          round
          :icon="leftDrawerOpen ? mdiClose : mdiMenu"
          @click="toggleLeftDrawer"
        />
      </transition>

      <q-toolbar-title
        ref="header_title"
        class="opacity-0 kaushan-regular cursor-pointer"
        :class="headerTextColor"
        @click="router.push({ name: 'home' })"
      >
        <h1 class="text-xl">GG WebDev</h1>
      </q-toolbar-title>
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
import { useTemplateRef, onMounted, computed } from 'vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { gsap } from 'src/boot/gsap'

import { storeToRefs } from 'pinia'
import { mdiClose, mdiMenu } from '@quasar/extras/mdi-v7'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const animationSettings = useAnimationSettings()
const { ANIM_LONG, headerMounted } = storeToRefs(animationSettings)

const $q = useQuasar()
const tl = gsap.timeline()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const header = useTemplateRef<any>('header')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerTitle = useTemplateRef<any>('header_title')
const router = useRouter()

const headerColor = computed(() => {
  return $q.dark.isActive ? 'border_header-gradient ' : 'border_header-gradient--light'
})

const headerTextColor = computed(() => {
  return $q.dark.mode ? 'text-white' : 'text-dark'
})

function headerAnimation() {
  const elementTarget = header.value?.$el as HTMLDivElement
  const elementTargetTitle = headerTitle.value?.$el as HTMLDivElement

  tl.to(elementTarget, {
    duration: ANIM_LONG.value,
    height: '50px',
    opacity: 1,
    onComplete() {
      headerMounted.value = true
    },
  }).to(
    elementTargetTitle,
    {
      duration: ANIM_LONG.value,
      opacity: 1,
      ease: 'power2.out',
    },
    '>-0.5',
  )
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
  headerAnimation()
})
</script>

<style scoped lang="scss">
@import 'src/css/layout.scss';

.q-toolbar__title {
  min-width: 150px;
}
.border_header-gradient {
  @include border-radient('bottom', $dark-primary, $accent);
}
.border_header-gradient--light {
  @include border-radient('bottom', $primary, $accent);
}
</style>
