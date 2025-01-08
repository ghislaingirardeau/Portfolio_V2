<template>
  <MobilePage v-if="useIsMobile()" />

  <q-page class="q-pa-lg flex justify-center q-gutter-md" v-else>
    <q-card
      class="w-72 text-center"
      flat
      bordered
      v-for="(project, index) in mobileProjects"
      :key="project.id"
    >
      <q-card-section>
        <div class="text-overline text-orange-9">{{ project.name }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ project.summary }}</div>
        <div class="text-caption text-grey">
          {{ project.tech }}
        </div>
      </q-card-section>
      <DesktopCarousel :project-image-url="project.imageURL" />

      <q-card-actions>
        <!-- <q-btn
          v-if="findProject.link"
          flat
          color="secondary"
          label="Link"
          @click="goToExternalLink(findProject.link)"
        /> -->

        <q-btn flat color="primary" label="Description" @click="expanded = !expanded" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="handleExpand"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2"> </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DesktopCarousel from 'src/components/projectPage/desktopCarousel.vue'
import MobilePage from 'src/components/projectPage/mobilePage.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { Project } from 'src/types'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const animationSettings = useAnimationSettings()
const { headerMounting } = storeToRefs(animationSettings)

const { tm } = useI18n({ useScope: 'global' })
const expanded = ref(false)

const mobileProjects = computed(() => {
  return [...tm('projects.mobile')] as Project[]
})

const desktopProjects = computed(() => {
  return [...tm('projects.desktop')] as Project[]
})

function handleExpand() {
  expanded.value = !expanded.value
}

onMounted(() => {
  if (!headerMounting.value) {
    headerMounting.value = true
  }
})
</script>

<style scoped lang="scss"></style>
