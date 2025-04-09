<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <q-card>
      <q-img
        :src="`/images/projectsPage/${projectsToDisplay[currentSlide]!.imageURL[currentImg]}`"
        fit="fill"
        loading="eager"
        fetchpriority="high"
        spinner-color="primary"
        :class="imageClass"
        @click="goToProjectDetail(projectsToDisplay[currentSlide]!.id)"
      >
        <AppImgOverlay v-if="!typeDesktop && isRobotProcessing" :tap="true" />
        <div class="text-subtitle2 text-center" @click.stop="" :class="imageTitleClass">
          <p>{{ projectsToDisplay[currentSlide]!.name }}</p>
          <div v-if="!useIsMobile()" class="flex justify-center q-gutter-sm">
            <q-img
              v-for="(image, index) in projectsToDisplay[currentSlide]!.imageURL"
              :key="image"
              :src="`/images/projectsPage/${image}`"
              @click.stop="handleImgToShow(index)"
              :class="{ 'active-thumbnail': index === currentImg, thumbnail: index !== currentImg }"
              class="rounded cursor-pointer"
              width="10%"
            ></q-img>
          </div>
        </div>
      </q-img>
      <!-- <q-card-section v-if="!useIsMobile()" class="flex justify-center q-gutter-sm">
        <q-img
          v-for="(image, index) in projectsToDisplay[currentSlide]!.imageURL"
          :key="image"
          :src="`/images/projectsPage/${image}`"
          @click="handleImgToShow(index)"
          :class="{ 'active-thumbnail': index === currentImg }"
          class="rounded cursor-pointer"
          width="10%"
        ></q-img>
      </q-card-section> -->
    </q-card>
  </transition>
</template>

<script setup lang="ts">
import { Project } from 'src/types'
import { useIsMobile, useIsMobileTall, useIsTablet } from 'src/utils/useDeviceInfo'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppImgOverlay from '../common/AppImgOverlay.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'

const { tm } = useI18n({ useScope: 'global' })
const router = useRouter()

const currentImg = ref(0)

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

const projectsToDisplay = computed(() => {
  return props.typeDesktop
    ? ([...tm('projects.desktop')] as Project[])
    : ([...tm('projects.mobile')] as Project[])
})

const imageTitleClass = computed(() => {
  return props.typeDesktop ? 'absolute-top' : 'absolute-bottom'
})

const imageClass = computed(() => {
  if (useIsTablet()) {
    return props.typeDesktop ? 'h-4/5' : 'h-11/12 cursor-pointer'
  }
  if (useIsMobile()) {
    if (useIsMobileTall()) {
      return props.typeDesktop ? 'h-60' : 'h-96 cursor-pointer'
    } else {
      return props.typeDesktop ? 'h-48' : 'h-72 cursor-pointer'
    }
  }
  return props.typeDesktop ? 'h-4/5' : 'h-4/5 cursor-pointer'
})

function handleImgToShow(index: number) {
  currentImg.value = index
}

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

<style scoped lang="scss">
.active-thumbnail {
  border: 2px $primary solid;
}
.thumbnail {
  border: 2px white solid;
}
</style>
