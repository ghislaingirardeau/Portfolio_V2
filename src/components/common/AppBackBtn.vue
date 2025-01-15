<template>
  <q-btn
    :icon="mdiKeyboardReturn"
    round
    :color="$q.dark.mode ? 'dark-primary' : 'primary'"
    class="absolute z-10 top-2 left-2 opacity-0 scale-0"
    @click="router.go(-1)"
  ></q-btn>
</template>

<script setup lang="ts">
import { mdiKeyboardReturn } from '@quasar/extras/mdi-v7'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

const $q = useQuasar()
</script>

<style scoped></style>
