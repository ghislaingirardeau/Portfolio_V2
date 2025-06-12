<template>
  <q-page class="q-pa-lg">
    <div class="flex flex-center">
      <div class="text-h1 text-white">404</div>

      <div class="text-h2 text-white text-center">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        :outline="$q.dark.isActive"
        :color="buttonColor"
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const $q = useQuasar()

const buttonColor = computed(() => {
  return $q.dark.mode ? 'dark-primary' : 'primary'
})
</script>
