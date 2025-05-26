<template>
  <q-dialog v-model="isScoresDialog" :backdrop-filter="backdropFilter">
    <q-card class="w-full">
      <q-card-section class="flex">
        <div v-if="props.hasCurrentGame" class="text-h6 text-center">
          {{ props.isVictory ? 'You win !' : 'Game Over !' }}
        </div>
        <div v-else-if="props.GAMES_SCORES.length === 0" class="text-h6">No game played yet !</div>
        <div v-else class="text-h6">Ranking</div>
        <q-space />

        <q-btn
          flat
          :icon="mdiCloseCircleOutline"
          color="primary"
          v-close-popup
          @click="AppFullscreen.exit()"
        />
      </q-card-section>

      <ScoresTable
        v-if="props.hasCurrentGame"
        :isLastGame="true"
        :GAMES_SCORES="props.GAMES_SCORES"
      />

      <ScoresTable :GAMES_SCORES="props.GAMES_SCORES" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScoresTable from './ScoresTable.vue'
import { mdiCloseCircleOutline } from '@quasar/extras/mdi-v7'
import { AppFullscreen } from 'quasar'

const backdropFilter = ref('blur(4px)')

const isScoresDialog = defineModel('isScoresDialog', {
  type: Boolean,
  default: false,
})

const props = defineProps({
  isVictory: {
    type: Boolean,
    required: true,
  },
  hasCurrentGame: {
    type: Boolean,
    required: true,
  },
  GAMES_SCORES: {
    type: Array as () => { point: number; time: number }[],
    required: true,
  },
})
</script>

<style scoped></style>
