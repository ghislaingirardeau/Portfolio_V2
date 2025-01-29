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
        fit="fill"
        loading="lazy"
        spinner-color="white"
        :class="imageClass"
        @click="
          goToProjectDetail(
            typeDesktop ? projectsDesktop[currentSlide]!.id : projectsMobile[currentSlide]!.id,
          )
        "
      >
        <AppImgOverlay v-if="!typeDesktop && isRobotProcessing" :tap="true" />
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
import { useIsMobile, useIsMobileTall } from 'src/utils/useDeviceInfo'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppImgOverlay from '../common/AppImgOverlay.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'

const { tm } = useI18n({ useScope: 'global' })
const router = useRouter()

const animationSettings = useAnimationSettings()
const { isRobotProcessing } = storeToRefs(animationSettings)

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
  if (useIsMobile()) {
    if (useIsMobileTall()) {
      return props.typeDesktop ? 'h-60' : 'h-96 cursor-pointer'
    } else {
      return props.typeDesktop ? 'h-48' : 'h-72 cursor-pointer'
    }
  } else {
    return props.typeDesktop ? 'h-4/5' : 'h-4/5 cursor-pointer'
  }
})

function goToProjectDetail(id: string) {
  if (!props.typeDesktop) {
    if (useIsMobile()) {
      router.push({ name: 'project-detail', params: { id } })
    } else {
      const currentLinkProject = projectsMobile.value.find((el) => el.id === id)
      window.open(currentLinkProject?.link, '_blank')
    }
  }
}
</script>

<style scoped></style>
