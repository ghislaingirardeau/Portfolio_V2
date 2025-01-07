<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <q-img
      :key="typeDesktop ? projectsDesktop[currentSlide]!.id : projectsMobile[currentSlide]!.id"
      :src="`/images/projectsPage/${typeDesktop ? projectsDesktop[currentSlide]!.imageURL[0] : projectsMobile[currentSlide]!.imageURL[0]}`"
      fit="contain"
      loading="lazy"
      spinner-color="white"
      height="288px"
      class="cursor-pointer"
      @click="
        goToProjectDetail(
          typeDesktop ? projectsDesktop[currentSlide]!.id : projectsMobile[currentSlide]!.id,
        )
      "
    >
    </q-img>
  </transition>
</template>

<script setup lang="ts">
import { Project } from 'src/types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { tm } = useI18n({ useScope: 'global' })
const router = useRouter()

defineProps({
  typeDesktop: {
    type: Boolean,
    required: true,
  },
  currentSlide: {
    type: Number,
    required: true,
  },
})

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

<style scoped></style>
