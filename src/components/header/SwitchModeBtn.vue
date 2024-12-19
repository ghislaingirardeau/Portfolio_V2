<template>
  <q-toggle
    ref="toggleModeBtn"
    color="blue-grey-8"
    class="opacity-0 -translate-x-60"
    dark
    @click="() => $q.dark.toggle()"
    v-model="dark"
  >
    <template #default> <q-icon flat :name="mdiThemeLightDark" size="sm" /> </template>
  </q-toggle>
</template>

<script setup lang="ts">
import { mdiThemeLightDark } from '@quasar/extras/mdi-v7'
import { ref, useTemplateRef, watch } from 'vue'
import { useGlobalSettings } from 'src/stores/globalSettings'
import { storeToRefs } from 'pinia'

const settings = useGlobalSettings()
const { timeline } = storeToRefs(settings)

const dark = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleModeBtn = useTemplateRef<any>('toggleModeBtn')

function animationAppear() {
  const elementTarget = toggleModeBtn.value?.$el as HTMLDivElement
  timeline.value.to(elementTarget, {
    duration: settings.ANIM_HEADER_BTN_DURATION,
    x: 0,
    opacity: 1,
  })
}

watch(
  () => settings.HEADER_ANIMATED,
  () => {
    animationAppear()
  },
)
</script>

<style scoped></style>
