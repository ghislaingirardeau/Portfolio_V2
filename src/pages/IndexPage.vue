<template>
  <q-page class="q-pa-lg column">
    <ThePresentation />
    <!-- <ServiceCard
      ref="cardService"
      :title="$t('index.offer.hService')"
      :contents="tm('index.offer.textService')"
      delay="delay-1s"
      class="my-8"
    />

    <ServiceCard
      ref="cardWork"
      :title="$t('index.offer.hWork')"
      :contents="tm('index.offer.textWork')"
      delay="delay-2s"
    /> -->
  </q-page>
</template>

<script setup lang="ts">
import ThePresentation from 'src/components/ThePresentation.vue'
</script>

<style scoped></style>
