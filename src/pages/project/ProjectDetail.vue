<template>
  <q-page class="q-pa-lg">
    <pre>
      {{ findProject }}
    </pre>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Project } from 'src/types/index'
const { tm } = useI18n({ useScope: 'global' })

const route = useRoute()

const projects = computed(() => {
  return [...tm('projects.desktop'), ...tm('projects.mobile')] as Project[]
})

const findProject = computed(() => {
  return projects.value.find((e) => e.id === route.params.id)
})
</script>

<style scoped></style>
