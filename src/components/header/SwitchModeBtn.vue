<template>
  <q-toggle color="blue-grey-8" dark @click="() => $q.dark.toggle()" v-model="dark">
    <template #default> <q-icon flat :name="mdiThemeLightDark" size="sm" /> </template>
  </q-toggle>
</template>

<script setup lang="ts">
import { mdiThemeLightDark } from '@quasar/extras/mdi-v7'
import { ref } from 'vue'
const dark = ref(false)
</script>

<style scoped></style>
