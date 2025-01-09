<template>
  <q-card-actions>
    <q-btn
      v-if="link"
      flat
      color="secondary"
      label="Demo"
      @click="goToExternalLink(link)"
      @mouseenter="animationSettings.handleClickableEnter"
      @mouseleave="animationSettings.handleClickableLeave"
    />

    <q-btn
      flat
      color="primary"
      label="More details"
      @click="expanded = !expanded"
      @mouseenter="animationSettings.handleClickableEnter"
      @mouseleave="animationSettings.handleClickableLeave"
    />
  </q-card-actions>

  <q-slide-transition>
    <div v-show="expanded">
      <q-separator />
      <q-card-section class="text-subtitle2"> <p v-html="description"></p></q-card-section>
    </div>
  </q-slide-transition>
</template>

<script setup lang="ts">
import { useAnimationSettings } from 'src/stores/animationSettings'
import { ref } from 'vue'

const animationSettings = useAnimationSettings()

defineProps({
  description: {
    type: String,
  },
  link: {
    type: String,
  },
})

const expanded = ref(false)

function goToExternalLink(link: string) {
  window.open(link, '_blank')
}

function handleExpand() {
  expanded.value = !expanded.value
}
</script>

<style scoped></style>
