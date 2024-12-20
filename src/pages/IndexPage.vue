<template>
  <q-page class="q-pa-lg column relative z-0">
    <ThePresentation class="z-20" />

    <transition
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
      mode="out-in"
    >
      <LogoAE v-if="layoutMounted" />
      <code
        class="text-grey-7 flex flex-center mt-10 h-48 border-2 border-solid border-gray-300 lg:absolute lg:right-48"
        v-else
      >
        &lt;div&gt;Logo Entreprise&lt;/div&gt;</code
      >
    </transition>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <TheRobot v-if="layoutMounted" />
      <code class="text-grey-7 mt-10 absolute bottom-5 right-5 lg:bottom-5 lg:right-10" v-else>
        &lt;svg&gt;Un chat bot&lt;/svg&gt;</code
      >
    </transition>

    <!-- TODO 
     -A mettre dans les components  
     -Drawer display on desktop => pas possible de le
    réduire 
    - si desktop => afficher plus de textes
    - si desktop => augmenter taille logo
    -->

    <transition
      appear
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft delay-5s"
      mode="out-in"
    >
      <q-chat-message
        v-if="robotMounted"
        class="absolute bottom-16 right-24 lg:bottom-16 lg:right-32 ml-3"
        name="Ghislain Robot"
        sent
        text-color="white"
        bg-color="primary"
      >
        <div>J'ai fais le choix de créer ce portfolio différement</div>
        <div>Tu as déjà beaucoup d'information sur moi sur le lien ci-dessous</div>
      </q-chat-message>

      <div class="absolute bottom-16 right-32 ml-3 column" v-else>
        <code class="text-grey-7"> &lt;div&gt;chat message&lt;/div&gt;</code>
        <code class="text-grey-7"> &lt;div&gt;chat message&lt;/div&gt;</code>
      </div>
    </transition>

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
import { storeToRefs } from 'pinia'
import LogoAE from 'src/components/common/LogoAE.vue'
import ThePresentation from 'src/components/ThePresentation.vue'
import TheRobot from 'src/components/TheRobot.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
const animationSettings = useAnimationSettings()

const { layoutMounted, robotMounted } = storeToRefs(animationSettings)
</script>

<style scoped lang="scss"></style>
