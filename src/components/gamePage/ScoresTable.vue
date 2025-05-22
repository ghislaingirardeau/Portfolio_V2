<template>
  <q-card-section v-if="scoresToDisplay && scoresToDisplay.length" class="q-pt-none">
    <q-table
      :title="isLastGame ? 'Your score' : 'Best 5 scores'"
      :rows="scoresToDisplay"
      :columns="columns"
      row-key="name"
      hide-pagination
    />
  </q-card-section>
</template>

<script setup lang="ts">
import { formatMilliseconds } from 'src/utils/useTimeFormat'
import { computed } from 'vue'

const props = defineProps({
  GAMES_SCORES: {
    type: Array as () => { point: number; time: number }[],
    required: true,
  },
  isLastGame: {
    type: Boolean,
    default: false,
  },
})

const columns = [
  {
    name: 'index',
    align: 'center' as 'center' | 'left' | 'right',
    label: 'Ranking',
    field: 'index',
  },

  {
    name: 'point',
    label: 'Points',
    align: 'center' as 'center' | 'left' | 'right',
    field: 'point',
  },
  { name: 'time', align: 'center' as 'center' | 'left' | 'right', label: 'Times', field: 'time' },
]

const scoresToDisplay = computed(() => {
  // const findBestPointScore = GAMES_SCORES.value
  //   // Math.min(...array) prend le nombre le plus petit de l'array
  //   .filter((e) => e.point === Math.max(...GAMES_SCORES.value.map((m) => m.point)))
  //   // trie ensuite par temps si un plusieurs scores sont similaire
  //   .sort((a, b) => a.time - b.time)
  const sortByPoint = [...props.GAMES_SCORES].sort((a, b) => b.point - a.point)
  const ranking = sortByPoint.map((score, i) => {
    return {
      index: i + 1,
      point: score.point,
      time: score.time as number | string,
    }
  })

  // if show current game, get the last game score and find get it from the ranking
  if (props.isLastGame) {
    const findLastGameScore = ranking.find(
      (score) =>
        score.point === props.GAMES_SCORES[props.GAMES_SCORES.length - 1]!.point &&
        score.time === props.GAMES_SCORES[props.GAMES_SCORES.length - 1]!.time,
    )
    if (findLastGameScore && findLastGameScore.time) {
      findLastGameScore.time = formatMilliseconds(findLastGameScore!.time as number)
    }

    return [findLastGameScore]
  }

  return ranking
    .map((score) => {
      return {
        index: score.index,
        point: score.point,
        time: formatMilliseconds(score.time as number),
      }
    })
    .slice(0, 5)
})
</script>

<style scoped></style>
