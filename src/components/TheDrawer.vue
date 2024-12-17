<template>
  <q-drawer
    v-model="leftDrawerOpen"
    ref="'drawer'"
    side="left"
    :behavior="deviceDetail.deviceOrientation"
    bordered
    :width="250"
    @show="handleMenuAnimation"
  >
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item exact :to="menuItem.to" active-class="text-primary" class="q-py-lg">
          <q-item-section avatar>
            <q-icon :ref="menuIcon.set" class="opacity-0" size="lg" :name="menuItem.icon" />
          </q-item-section>
          <q-item-section :ref="menuLabel.set" class="text-h6 menu_section_label">
            <!-- {{ menuItem.label }} -->
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
import { computed, onMounted, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'src/boot/gsap'
import { useTemplateRefsList } from '@vueuse/core'

import { useDeviceDetail } from 'src/stores/deviceDetails'

const deviceDetail = useDeviceDetail()

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuLabel = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuIcon = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const drawer = useTemplateRef<any>('drawer')

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
    label: t('navBar.services'),
    to: {
      name: 'service',
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

function handleMenuAnimation() {
  menuLabel.value.forEach((el, index) => {
    const elementTarget = el.$el as HTMLDivElement
    gsap.to(elementTarget, {
      duration: 1,
      text: { value: menuList.value[index]!.label },
      ease: 'none',
      delay: index,
    })
  })

  menuIcon.value.forEach((el, index) => {
    const elementTarget = el.$el as HTMLDivElement
    gsap.from(elementTarget, {
      duration: 1,
      rotateZ: -180,
      ease: 'none',
      delay: index,
    })
    gsap.to(elementTarget, {
      duration: 1,
      opacity: 1,
      ease: 'none',
      delay: index,
    })
  })
}
</script>

<style scoped></style>
