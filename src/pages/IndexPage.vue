<template>
  <q-page class="q-pa-lg column relative z-0">
    <ThePresentation class="z-20" />

    <LogoAEContainer />

    <TheRobotContainer />

    <!-- TODO 
     -Drawer display on desktop => pas possible de le
    réduire 
    - si desktop => afficher plus de textes
    -->

    <ChatMessageContainer
      :texts="[
        'J\'ai fais le choix de créer ce portfolio différement',
        'Tu as déjà beaucoup d\'information sur moi sur le lien ci-dessous',
      ]"
    />

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
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import LogoAEContainer from 'src/components/common/LogoAEContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import ThePresentation from 'src/components/ThePresentation.vue'
</script>

<style scoped lang="scss"></style>
