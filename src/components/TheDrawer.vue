<template>
  <q-drawer
    v-model="leftDrawerOpen"
    ref="'drawer'"
    side="left"
    :behavior="useDeviceOrientation()"
    bordered
    :class="$q.dark.mode ? 'bg-dark' : 'bg-white'"
    :width="250"
    @show.once="handleShowMenu"
  >
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          exact
          :to="menuItem.to"
          :active-class="$q.dark.mode ? 'text-dark-primary' : 'text-primary'"
          @click="isCubeSpining = true"
          class="q-py-lg"
        >
          <q-item-section avatar>
            <q-icon
              :ref="menuIcon.set"
              class="opacity-0 rotate-90"
              size="lg"
              :color="iconColor(menuItem.to.name)"
              :name="menuItem.icon"
            />
          </q-item-section>
          <q-item-section :ref="menuLabel.set" class="text-h6"> </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import {
  mdiAccountDetails,
  mdiCodeTagsCheck,
  mdiHandshake,
  mdiSourceRepository,
} from '@quasar/extras/mdi-v7'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'src/boot/gsap'
import { useTemplateRefsList } from '@vueuse/core'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import { useDeviceOrientation, useIsMobile } from 'src/utils/useDeviceInfo'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

const animationSettings = useAnimationSettings()
const { ANIM_SHORT, drawerMounted, isCubeSpining } = storeToRefs(animationSettings)

const { t, locale } = useI18n()
const route = useRoute()
const $q = useQuasar()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuLabel = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuIcon = useTemplateRefsList<any>()

const leftDrawerOpen = defineModel('leftDrawerOpen', { type: Boolean, required: true })

const menuList = computed(() => [
  {
    icon: mdiSourceRepository,
    label: t('navBar.projects'),
    to: {
      name: 'project',
    },
  },
  {
    icon: mdiCodeTagsCheck,
    label: t('navBar.stack'),
    to: {
      name: 'stack',
    },
  },
  {
    icon: mdiAccountDetails,
    label: t('navBar.aboutMe'),
    to: {
      name: 'aboutMe',
    },
  },
  {
    icon: mdiHandshake,
    label: t('navBar.aboutWork'),
    to: {
      name: 'aboutWork',
    },
  },
])

function iconColor(currentRoute: string) {
  if (currentRoute === route.name) {
    return $q.dark.mode ? 'dark-primary' : 'primary'
  } else {
    return $q.dark.mode ? 'white' : 'dark'
  }
}

function handleShowMenu() {
  handleMenuAnimation(0, true)
}

function handleMenuAnimation(delay: number, isFirstMount: boolean) {
  drawerMounted.value = false
  const tl = gsap.timeline({ delay: delay })
  if (isFirstMount) {
    menuList.value.forEach((el, index) => {
      const elementTarget = menuIcon.value[index].$el as HTMLDivElement
      tl.to(elementTarget, {
        duration: ANIM_SHORT.value,
        opacity: 1,
        rotateZ: 0,
        ease: 'none',
      })
    })
  }

  menuList.value.forEach((el, index) => {
    const elementTarget = menuLabel.value[index].$el as HTMLDivElement
    tl.to(elementTarget, {
      duration: ANIM_SHORT.value,
      text: { value: el.label, newClass: `text-h6 ${$q.dark.mode ? 'white' : 'dark'}` },
      ease: 'none',
    })
  })
  tl.call(() => {
    drawerMounted.value = true
  })
}

watch(
  () => locale.value,
  () => {
    handleMenuAnimation(0, false)
  },
)
</script>

<style>
.q-drawer {
  opacity: 0.9 !important;
}
</style>
