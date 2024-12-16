<template>
  <q-btn flat :icon="mdiThemeLightDark" @click="() => $q.dark.toggle()" />
</template>

<script setup lang="ts">
import { mdiThemeLightDark } from '@quasar/extras/mdi-v7'
</script>

<style scoped></style>
