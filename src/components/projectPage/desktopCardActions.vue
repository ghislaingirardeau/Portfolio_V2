<template>
  <q-card-actions>
    <q-btn v-if="link" flat color="secondary" label="Demo" @click="goToExternalLink(link)" />

    <q-btn flat color="primary" label="More details" @click="expanded = !expanded" />

    <q-space />

    <q-btn
      color="grey"
      round
      flat
      dense
      :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
      @click="handleExpand"
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
import { ref } from 'vue'

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
