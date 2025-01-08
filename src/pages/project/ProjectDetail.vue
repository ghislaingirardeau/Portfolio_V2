<template>
  <q-page class="q-pa-lg" ref="el">
    <q-btn
      :icon="mdiKeyboardReturn"
      round
      color="secondary"
      class="absolute z-10 top-2 left-2"
      @click="router.go(-1)"
    ></q-btn>
    <q-card class="my-card text-center" flat bordered>
      <q-card-section>
        <div class="text-overline text-orange-9">{{ findProject.name }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ findProject.summary }}</div>
        <div class="text-caption text-grey">
          {{ findProject.tech }}
        </div>
      </q-card-section>
      <q-carousel
        swipeable
        animated
        v-model="slide"
        thumbnails
        transition-prev="jump-right"
        transition-next="jump-left"
        infinite
        :height="imageHeight"
        class="px-2"
      >
        <q-carousel-slide
          v-for="(image, index) in findProject.imageURL"
          :key="index"
          :name="index"
          :img-src="`/images/projectsPage/${image}`"
        />
      </q-carousel>

      <q-card-actions>
        <q-btn
          v-if="findProject.link"
          flat
          color="secondary"
          label="Link"
          @click="goToExternalLink(findProject.link)"
        />

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
          <q-card-section class="text-subtitle2">
            <p v-html="findProject.description"></p>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Project } from 'src/types/index'
import { mdiKeyboardReturn } from '@quasar/extras/mdi-v7'
const { tm } = useI18n({ useScope: 'global' })
const el = ref<HTMLElement | null>(null)
const route = useRoute()
const router = useRouter()

const slide = ref(0)
const expanded = ref(false)

const projects = computed(() => {
  return [...tm('projects.desktop'), ...tm('projects.mobile')] as Project[]
})

const findProject = computed(() => {
  return projects.value.find((e) => e.id === route.params.id) as Project
})

const imageHeight = computed(() => {
  return findProject.value.mobileFirst ? '550px' : '300px'
})

function handleExpand() {
  expanded.value = !expanded.value
}

function goToExternalLink(link: string) {
  window.open(link, '_blank')
}
// function imgWidth(mobile: boolean) {
//   return mobile ? 'w-4/5 sm:w-2/5 lg:w-1/5' : 'w-5/5'
// }

// function imgHeight(mobile: boolean) {
//   return mobile ? '600px' : '600px'
// }
</script>

<style scoped lang="scss">
.q-carousel__slide {
  border-radius: 10px;
}
</style>
