<template>
  <q-page class="q-pa-lg text-center">
    <h2 class="text-h4">{{ findProject.name }}</h2>

    <h3 class="text-h5 my-8">{{ findProject.summary }}</h3>

    <p v-html="findProject.description"></p>

    <button v-if="findProject.link">
      <a :href="findProject.link" target="_blank">Lien vers {{ findProject.name }}</a>
    </button>

    <h2 class="text-h5 my-8">{{ t('projectsIdPage.tech') }}</h2>
    <p>{{ findProject.tech }}</p>

    <h2 class="text-h5 my-8">{{ t('projectsIdPage.gallery') }}</h2>
    <div class="row justify-center">
      <div class="col-3">
        <q-carousel swipeable animated v-model="slide" thumbnails infinite height="450px">
          <q-carousel-slide
            v-for="(image, index) in findProject.imageURL"
            :key="index"
            :name="index"
            :img-src="`/images/projectsPage/${image}`"
            class="carousel_img"
          />
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Project } from 'src/types/index'
const { tm, t } = useI18n({ useScope: 'global' })

const route = useRoute()
const slide = ref(0)

const projects = computed(() => {
  return [...tm('projects.desktop'), ...tm('projects.mobile')] as Project[]
})

const findProject = computed(() => {
  return projects.value.find((e) => e.id === route.params.id) as Project
})

// function imgWidth(mobile: boolean) {
//   return mobile ? 'w-4/5 sm:w-2/5 lg:w-1/5' : 'w-5/5'
// }

// function imgHeight(mobile: boolean) {
//   return mobile ? '600px' : '600px'
// }
</script>

<style scoped lang="scss">
.carousel_img {
}
</style>
