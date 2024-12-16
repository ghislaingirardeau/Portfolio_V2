<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    :behavior="deviceOrientation"
    bordered
  >
    <!-- drawer content -->
  </q-drawer>
</template>

<script setup lang="ts">
import { useScreenOrientation } from '@vueuse/core'
import { computed } from 'vue'

const { orientation } = useScreenOrientation()

const leftDrawerOpen = defineModel('leftDrawerOpen', { type: Boolean, required: true })
const deviceOrientation = computed(() => {
  return orientation.value === 'landscape-primary' ? 'desktop' : 'mobile'
})
</script>

<style scoped></style>
