<template>
  <q-page class="q-pa-lg">
    <span>{{ t('index.me.p1') }}</span>
    <span>{{ t('index.me.p2') }}</span>
    <span>{{ t('index.me.p3') }}</span>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped></style>
