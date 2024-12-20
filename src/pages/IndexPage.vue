<template>
  <q-page class="q-pa-lg column relative z-0">
    <ThePresentation class="z-20" />

    <TheRobot />

    <!-- <div class="w-full flex lg:flex-center mt-32">
      <ThePlane />
    </div> -->

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
import ThePlane from 'src/components/ThePlane.vue'
import ThePresentation from 'src/components/ThePresentation.vue'
import TheRobot from 'src/components/TheRobot.vue'
</script>

<style scoped></style>
