<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <q-card>
      <q-img
        :key="typeDesktop ? projectsDesktop[currentSlide]!.id : projectsMobile[currentSlide]!.id"
        :src="`/images/projectsPage/${typeDesktop ? projectsDesktop[currentSlide]!.imageURL[0] : projectsMobile[currentSlide]!.imageURL[0]}`"
        fit="contain"
        loading="lazy"
        spinner-color="white"
        class="cursor-pointer"
        :class="imageClass"
        @click="
          goToProjectDetail(
            typeDesktop ? projectsDesktop[currentSlide]!.id : projectsMobile[currentSlide]!.id,
          )
        "
      >
        <div class="text-subtitle2 text-center" :class="imageTitleClass">
          {{
            typeDesktop ? projectsDesktop[currentSlide]!.name : projectsMobile[currentSlide]!.name
          }}
        </div>
      </q-img>
    </q-card>
  </transition>
</template>

<script setup lang="ts">
import { Project } from 'src/types'
import { useIsMobileTall } from 'src/utils/useDeviceInfo'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { tm } = useI18n({ useScope: 'global' })
const router = useRouter()

const props = defineProps({
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

const imageTitleClass = computed(() => {
  return props.typeDesktop ? 'absolute-top' : 'absolute-bottom'
})

const imageClass = computed(() => {
  return useIsMobileTall() ? 'h-96' : 'h-72'
})

function goToProjectDetail(id: string) {
  router.push({ name: 'project-detail', params: { id } })
}
</script>

<style scoped></style>
