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
      <q-tab name="pro" :label="$t('about.h2Pro')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="me">
        <AboutCard
          v-for="(PersoDescription, index) in descriptions.perso"
          :key="index"
          :title="PersoDescription.title"
          :img-src="PersoDescription.imgSrc"
          :text="PersoDescription.text"
          :index="index"
        />
      </q-tab-panel>

      <q-tab-panel name="pro">
        <AboutCard
          v-for="(ProDescription, index) in descriptions.pro"
          :key="index"
          :title="ProDescription.title"
          :img-src="ProDescription.imgSrc"
          :text="ProDescription.text"
          :index="index"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import AboutCard from 'src/components/aboutPage/AboutCard.vue'
import { computed, ref } from 'vue'

const tab = ref('me')

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const descriptions = computed(() => {
  return {
    perso: [
      {
        title: t('about.personal.h3'),
        imgSrc: 'images/aboutPage/moi2.jpg',
        text: t('about.personal.text'),
      },
      {
        title: t('about.professionaly.h3'),
        imgSrc: 'images/aboutPage/moi.jpg',
        text: t('about.professionaly.id1') + ' ' + t('about.professionaly.id2'),
      },
    ],
    pro: [
      {
        title: t('about.h2commit'),
        imgSrc: 'images/aboutPage/environement_respect.jpg',
        text: t('about.willingness.id1'),
      },
      {
        title: '',
        imgSrc: 'images/aboutPage/data_protection.jpg',
        text: t('about.willingness.id2'),
      },
      {
        title: '',
        imgSrc: 'images/aboutPage/business_relationship.jpg',
        text: t('about.willingness.id3'),
      },
      {
        title: '',
        imgSrc: 'images/aboutPage/freelance_me.jpg',
        text: t('about.willingness.id4'),
      },
    ],
  }
})
</script>

<style scoped></style>
