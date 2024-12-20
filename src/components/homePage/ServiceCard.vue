<template>
  <q-card>
    <q-card-section>
      <transition
        appear
        :enter-active-class="`animated fadeIn slow ${delay}`"
        :leave-active-class="`animated fadeOut slow ${delay}`"
        mode="out-in"
      >
        <q-skeleton type="text" height="32px" v-if="layoutMounted" />
        <div v-else class="text-h6">{{ title }}</div>
      </transition>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <transition
        appear
        :enter-active-class="`animated fadeIn slow ${delay}`"
        :leave-active-class="`animated fadeOut slow ${delay}`"
        mode="out-in"
      >
        <q-skeleton height="160px" square v-if="layoutMounted" />
        <div v-else>
          <p v-for="(text, index) in contents" :key="index">
            {{ text }}
          </p>
        </div>
      </transition>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
const animationSettings = useAnimationSettings()
const { layoutMounted } = storeToRefs(animationSettings)

defineProps({
  title: String,
  contents: Array,
  delay: String,
})
</script>

<style lang="scss" scoped></style>
