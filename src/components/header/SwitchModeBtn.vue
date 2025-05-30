<template>
  <q-toggle
    ref="toggleModeBtn"
    class="opacity-0 -translate-x-32"
    color="dark-primary"
    dark
    @click="handleMode"
    v-model="dark"
  >
    <template #default>
      <q-icon
        flat
        :name="mdiThemeLightDark"
        size="sm"
        :color="$q.dark.isActive ? 'dark-primary' : 'primary'"
      />
    </template>
  </q-toggle>
</template>

<script setup lang="ts">
import { mdiThemeLightDark } from '@quasar/extras/mdi-v7'
import { onMounted, ref, useTemplateRef } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { Dark, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()

const animationSettings = useAnimationSettings()
const { ANIM_SHORT, headerMounted, isAnimationDone } = storeToRefs(animationSettings)

const $q = useQuasar()

const dark = ref(true)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleModeBtn = useTemplateRef<any>('toggleModeBtn')

onMounted(() => {
  animationAppear()
})

function handleMode() {
  if (isAnimationDone.value) {
    Dark.toggle()
    if (route.name === 'home') {
      animationSettings.resetRobotAction()
    }
  } else {
    dark.value = Dark.mode as boolean
  }
}

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
