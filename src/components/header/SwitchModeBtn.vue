<template>
  <q-toggle
    ref="toggleModeBtn"
    color="blue-grey-8"
    dark
    @click="() => $q.dark.toggle()"
    v-model="dark"
  >
    <template #default> <q-icon flat :name="mdiThemeLightDark" size="sm" /> </template>
  </q-toggle>
</template>

<script setup lang="ts">
import { mdiThemeLightDark } from '@quasar/extras/mdi-v7'
import { onMounted, ref, useTemplateRef } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useGlobalSettings } from 'src/stores/globalSettings'

const { ANIM_DELAY, ANIM_DURATION } = useGlobalSettings()

const dark = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleModeBtn = useTemplateRef<any>('toggleModeBtn')

onMounted(() => {
  const elementTarget = toggleModeBtn.value?.$el as HTMLDivElement
  gsap.from(elementTarget, { duration: ANIM_DURATION, x: -250, opacity: 0, delay: ANIM_DELAY })
  gsap.to(elementTarget, { duration: ANIM_DURATION, x: 0, opacity: 1, delay: ANIM_DELAY })
})
</script>

<style scoped></style>
