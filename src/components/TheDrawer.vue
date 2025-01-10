<template>
  <q-drawer
    v-model="leftDrawerOpen"
    ref="'drawer'"
    side="left"
    :behavior="useDeviceOrientation()"
    bordered
    :width="250"
    @show="handleShowMenu"
  >
    <q-list

    >
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item exact :to="menuItem.to" active-class="text-primary" class="q-py-lg">
          <q-item-section avatar>
            <q-icon
              :ref="menuIcon.set"
              class="opacity-0 rotate-90"
              size="lg"
              :name="menuItem.icon"
            />
          </q-item-section>
          <q-item-section :ref="menuLabel.set" class="text-h6 menu_section_label">
            <WireCode content="&lt;li&gt;Menu&lt;/li&gt;" />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import {
  mdiAccountDetails,
  mdiHandshake,
  mdiHomeCircleOutline,
  mdiSourceRepository,
} from '@quasar/extras/mdi-v7'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'src/boot/gsap'
import { useTemplateRefsList } from '@vueuse/core'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import WireCode from './common/WireCode.vue'
import { useDeviceOrientation, useIsMobile } from 'src/utils/useDeviceInfo'

const animationSettings = useAnimationSettings()
const { ANIM_SHORT, drawerMounted } = storeToRefs(animationSettings)

const { t, locale } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuLabel = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuIcon = useTemplateRefsList<any>()

const leftDrawerOpen = defineModel('leftDrawerOpen', { type: Boolean, required: true })

const menuList = computed(() => [
  {
    icon: mdiHomeCircleOutline,
    label: t('navBar.index'),
    to: {
      name: 'home',
    },
  },
  {
    icon: mdiSourceRepository,
    label: t('navBar.projects'),
    to: {
      name: 'project',
    },
  },
  {
    icon: mdiHandshake,
    label: t('navBar.stack'),
    to: {
      name: 'stack',
    },
  },
  {
    icon: mdiAccountDetails,
    label: t('navBar.aboutMe'),
    to: {
      name: 'about',
    },
  },
])

function handleShowMenu() {
  if (!drawerMounted.value) {
    handleMenuAnimation(useIsMobile() ? 0 : 3, true)
  }
}

function handleMenuAnimation(delay: number, isFirstMount: boolean) {
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
      text: { value: el.label },
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
    handleMenuAnimation(0, true)
  },
)
</script>

<style scoped></style>
