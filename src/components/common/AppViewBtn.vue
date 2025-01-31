<template>
  <q-btn
    :icon="mdiMonitorEye"
    round
    :color="$q.dark.mode ? 'dark-primary' : 'primary'"
    class="absolute z-10 top-2 right-2 opacity-0 scale-0"
    @click="goToExternalLink"
  ></q-btn>
</template>

<script setup lang="ts">
import { mdiMonitorEye } from '@quasar/extras/mdi-v7'
import { useQuasar } from 'quasar'

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
})
const $q = useQuasar()

function goToExternalLink() {
  window.open(props.link, '_blank')
}
</script>

<style scoped></style>
