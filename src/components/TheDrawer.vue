<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    :behavior="deviceDetail.deviceOrientation"
    bordered
    :width="250"
  >
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item exact :to="menuItem.to" active-class="text-primary" class="q-py-lg">
          <q-item-section avatar>
            <q-icon size="lg" :name="menuItem.icon" />
          </q-item-section>
          <q-item-section class="text-h6">
            {{ menuItem.label }}
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useDeviceDetail } from 'src/stores/deviceDetails'

const deviceDetail = useDeviceDetail()

const { t } = useI18n()

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
</script>

<style scoped></style>
