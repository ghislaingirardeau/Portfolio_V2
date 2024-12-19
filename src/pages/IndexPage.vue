<template>
  <q-page class="q-pa-lg column">
    <ThePresentation />
    <ServiceCard :title="$t('index.offer.hService')" :contents="tm('index.offer.textService')" />
    <ServiceCard
      :title="$t('index.offer.hWork')"
      :contents="tm('index.offer.textWork')"
      class="mt-2"
    />
  </q-page>
</template>

<script setup lang="ts">
import ThePresentation from 'src/components/ThePresentation.vue'
import { useI18n } from 'vue-i18n'
import ServiceCard from 'src/components/homePage/ServiceCard.vue'
const { tm } = useI18n({ useScope: 'global' })
</script>

<style scoped></style>
