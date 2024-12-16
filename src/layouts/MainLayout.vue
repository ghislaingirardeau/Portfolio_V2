<template>
  <q-layout view="hHh lpR fFf">
    <TheHeader v-model:leftDrawerOpen="leftDrawerOpen" />

    <TheDrawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <TheFooter />
  </q-layout>
</template>

<script setup lang="ts">
import TheDrawer from 'src/components/TheDrawer.vue'
import TheFooter from 'src/components/TheFooter.vue'
import TheHeader from 'src/components/TheHeader.vue'
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
</script>
