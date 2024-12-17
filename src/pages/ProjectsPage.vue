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
      <q-tab name="mobile" :label="'Mobile first'" />
      <q-tab name="desktop" :label="'desktop'" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mobile">
        <div class="row justify-around">
          <q-card
            v-for="project in projectsMobile"
            :key="project.id"
            class="my-card--portrait col-7 col-sm-4 col-md-3 col-lg-2 q-ma-md cursor-pointer"
            @click="goToProjectDetail(project.id)"
          >
            <q-img
              :src="`/images/projectsPage/${project.imageURL[0]}`"
              fit="fill"
              loading="lazy"
              spinner-color="white"
              height="85%"
            >
            </q-img>
            <q-card-section class="flex flex-center">
              {{ project.name }}
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>

      <q-tab-panel name="desktop">
        <div class="row justify-around">
          <q-card
            v-for="project in projectsDesktop"
            :key="project.id"
            class="my-card--landscape col-9 col-sm-5 col-md-4 col-lg-3 q-my-md q-mx-md-md cursor-pointer"
            @click="goToProjectDetail(project.id)"
          >
            <q-img
              :src="`/images/projectsPage/${project.imageURL[0]}`"
              fit="fill"
              loading="lazy"
              spinner-color="white"
              height="180px"
            >
            </q-img>
            <q-card-section class="flex flex-center">
              {{ project.name }}
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import type { Project } from 'src/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const { tm } = useI18n({ useScope: 'global' })
const router = useRouter()

const tab = ref('mobile')

const projectsMobile = computed(() => {
  return [...tm('projects.mobile')] as Project[]
})

const projectsDesktop = computed(() => {
  return [...tm('projects.desktop')] as Project[]
})

function goToProjectDetail(id: string) {
  router.push({ name: 'project-detail', params: { id } })
}
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
  &--portrait {
    height: 450px;
  }
}
</style>
