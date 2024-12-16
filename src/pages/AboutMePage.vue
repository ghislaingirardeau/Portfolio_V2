<template>
  <q-page class="q-pa-lg">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="me" :label="$t('about.h2who')" />
      <q-tab name="pro" :label="$t('about.professionaly.h3')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="me">
        <article class="row justify-between">
          <h2 class="text-h4 text-md-h3 col-12">{{ $t('about.personal.h3') }}</h2>
          <div class="col-12 col-md-6 q-mb-md q-mb-md-none">
            <q-img
              src="images/aboutPage/moi2.jpg"
              alt="photo de Ghislain montagne"
              fit="contain"
              class="rounded-borders"
            />
          </div>
          <div class="col-12 col-md-5 flex flex-center">
            <p class="reveal-3 about__personal--text">
              {{ $t('about.personal.text') }}
            </p>
          </div>

          <h2 class="text-h4 text-md-h3 col-12">{{ $t('about.professionaly.h3') }}</h2>

          <div class="col-12 col-md-5 flex flex-center">
            <p class="">
              {{ $t('about.professionaly.id1') }} <br />
              <br />
              {{ $t('about.professionaly.id2') }}
            </p>
          </div>
          <div class="col-12 col-md-6">
            <q-img
              src="images/aboutPage/moi.jpg"
              alt="photo de Ghislain montagne"
              fit="contain"
              class="rounded-borders"
            />
          </div>
        </article>
      </q-tab-panel>

      <q-tab-panel name="pro">
        <article class="row justify-between">
          <h2 class="col-12 text-h4 text-md-h3">{{ $t('about.h2commit') }}</h2>

          <div class="reveal-2 about__wish">
            <img
              class="about__wish--img"
              src="images/aboutPage/environement_respect.jpg"
              alt="ecology"
            />
            <p class="about__wish--text">{{ $t('about.willingness.id1') }}</p>
          </div>

          <div class="reveal-2 about__wish reverse">
            <img
              class="about__wish--img"
              src="images/aboutPage/data_protection.jpg"
              alt="data protection"
            />
            <p class="about__wish--text">{{ $t('about.willingness.id2') }}</p>
          </div>

          <div class="reveal-2 about__wish">
            <img
              class="about__wish--img"
              src="images/aboutPage/business_relationship.jpg"
              alt="business relationship"
            />
            <p class="about__wish--text">{{ $t('about.willingness.id3') }}</p>
          </div>

          <div class="reveal-2 about__wish reverse">
            <img class="about__wish--img" src="images/aboutPage/freelance_me.jpg" alt="freelance" />
            <p class="about__wish--text">{{ $t('about.willingness.id4') }}</p>
          </div>
        </article>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('me')
</script>

<style scoped></style>
