<template>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
    <!-- drawer content -->
  </q-drawer>
</template>

<script setup lang="ts">
const leftDrawerOpen = defineModel('leftDrawerOpen', { type: Boolean, required: true })
</script>

<style scoped></style>
