<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    :behavior="deviceOrientation"
    bordered
  >
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item exact :to="menuItem.to" active-class="text-primary">
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
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
import { useScreenOrientation } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { orientation } = useScreenOrientation()

const leftDrawerOpen = defineModel('leftDrawerOpen', { type: Boolean, required: true })
const deviceOrientation = computed(() => {
  return orientation.value === 'landscape-primary' ? 'desktop' : 'mobile'
})

const menuList = ref([
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
