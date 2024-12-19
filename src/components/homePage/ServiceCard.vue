<template>
  <q-card dark bordered class="bg-grey-9 my-card mt-24" v-if="!layoutAnimating">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <p v-for="(text, index) in contents" :key="index">
        {{ text }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { tm } = useI18n({ useScope: 'global' })
const animationSettings = useAnimationSettings()
const { layoutAnimating } = storeToRefs(animationSettings)

defineProps({
  title: String,
  contents: Array,
})
</script>

<style lang="scss" scoped></style>
