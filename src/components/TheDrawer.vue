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
            <q-icon
              :ref="menuIcon.set"
              class="opacity-0 -rotate-90"
              size="lg"
              :name="menuItem.icon"
            />
          </q-item-section>
          <q-item-section class="text-h6 menu_section_label">
            <div :ref="menuLabel.set" class="flex">
              <span class="text-red-9">&lt;li&gt;</span><span class="text-green-9">Menu&lt;</span
              ><span class="text-red-9">/li&gt;</span>
            </div>
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

import { useDeviceDetail } from 'src/stores/deviceDetails'

const deviceDetail = useDeviceDetail()

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
  menuList.value.forEach((el, index) => {
    const elementTarget = menuLabel.value[index] as HTMLDivElement
    gsap.to(elementTarget, {
      duration: 1,
      text: { value: el.label },
      ease: 'none',
      delay: index,
    })
  })

  menuList.value.forEach((el, index) => {
    const elementTarget = menuIcon.value[index].$el as HTMLDivElement

    gsap.to(elementTarget, {
      duration: 1,
      opacity: 1,
      rotateZ: 0,
      ease: 'elastic',
      delay: index,
    })
  })
}

watch(
  () => locale.value,
  () => {
    console.log('locale changed')
    handleMenuAnimation()
  },
)
</script>

<style scoped></style>
