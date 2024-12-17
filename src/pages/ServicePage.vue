<template>
  <q-page class="q-pa-lg">
    <div class="column flex flex-center">
      <h1 class="text-h4 text-center">{{ $t('services.header.h1') }}</h1>
      <p class="text-center my-9">{{ $t('services.header.p') }}</p>
      <h2 class="text-h5 text-center mb-9">{{ $t('services.header.h2') }}</h2>
    </div>

    <div class="flex flex-center">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        :vertical="deviceDetail.isMobile"
        animated
        class="lg:w-4/5"
      >
        <q-step :name="1" :title="t('services.stepOne.h3')" icon="settings" :done="step > 1">
          <q-list bordered separator>
            <q-item v-for="index in 4" :key="index">
              <q-item-section>{{ t(`services.stepOne.description[${index - 1}]`) }}</q-item-section>
            </q-item>
          </q-list>
        </q-step>

        <q-step :name="2" :title="t('services.stepTwo.h3')" :icon="mdiDraw" :done="step > 2">
          <q-list bordered separator>
            <q-item v-for="index in 4" :key="index">
              <q-item-section>{{ t(`services.stepTwo.description[${index - 1}]`) }}</q-item-section>
            </q-item>
          </q-list>
        </q-step>

        <q-step :name="3" :title="t('services.stepThree.h3')" :icon="mdiClipboardCheckMultiple">
          <q-list bordered separator>
            <q-item v-for="index in 4" :key="index">
              <q-item-section>{{
                t(`services.stepThree.description[${index - 1}]`)
              }}</q-item-section>
            </q-item>
          </q-list>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="step !== 3"
              @click="stepper.next()"
              color="primary"
              :label="t('cta.next')"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="stepper.previous()"
              :label="t('cta.back')"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { mdiClipboardCheckMultiple, mdiDraw } from '@quasar/extras/mdi-v7'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDeviceDetail } from 'src/stores/deviceDetails'

const deviceDetail = useDeviceDetail()

const { t } = useI18n()

const step = ref(1)
const stepper = ref()
</script>

<style scoped></style>
