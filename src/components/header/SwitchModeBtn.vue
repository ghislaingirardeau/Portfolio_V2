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
import { onMounted, ref, useTemplateRef } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'

import { storeToRefs } from 'pinia'

const animationSettings = useAnimationSettings()
const { ANIM_SHORT, headerMounted } = storeToRefs(animationSettings)

const dark = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleModeBtn = useTemplateRef<any>('toggleModeBtn')

onMounted(() => {
  animationAppear()
})

function animationAppear() {
  const elementTarget = toggleModeBtn.value?.$el as HTMLDivElement
  gsap.to(elementTarget, {
    duration: ANIM_SHORT.value,
    x: 0,
    opacity: 1,
    delay: 1.5,
    onComplete: animationDone,
  })
}

function animationDone() {
  headerMounted.value = true
}
</script>

<style scoped></style>
