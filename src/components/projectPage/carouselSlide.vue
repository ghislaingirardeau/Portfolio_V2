<template>
  <q-card class="bg-transparent" flat>
    <q-img
      :src="`/images/projectsPage/${projectsToDisplay[currentSlide]!.imageURL[currentImg]}`"
      fit="contain"
      loading="eager"
      fetchpriority="high"
      spinner-color="primary"
      class="cursor-pointer"
      :class="imageClass"
      @click="goToProjectDetail(projectsToDisplay[currentSlide]!.id)"
    >
      <!-- For mobile only -->
      <AppImgOverlay v-if="!typeDesktop && isRobotProcessing" :tap="true" />

      <!-- To display img title & thumbnail image inside it -->
      <div class="md:text-3xl lg:text-base text-center absolute top-0 w-full" @click.stop="">
        <p>{{ projectsToDisplay[currentSlide]!.name }}</p>
      </div>
      <div
        v-if="showThumbnail && projectsToDisplay[currentSlide]!.imageURL.length > 1"
        class="absolute bottom-0 w-full"
        @click.stop=""
      >
        <div class="flex justify-center q-gutter-sm">
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
  </q-card>
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

const showThumbnail = computed(() => {
  if (useIsMobile()) {
    return props.typeDesktop
  } else {
    return true
  }
})

const projectsMobile = computed(() => {
  return [...tm('projects.mobile')] as Project[]
})

const projectsToDisplay = computed(() => {
  return props.typeDesktop
    ? ([...tm('projects.desktop')] as Project[])
    : ([...tm('projects.mobile')] as Project[])
})

const imageClass = computed(() => {
  if (useIsTablet()) {
    return props.typeDesktop ? 'h-4/5' : 'image_container '
  }
  if (useIsMobile()) {
    if (useIsMobileTall()) {
      return props.typeDesktop ? 'h-60' : 'image_container '
    } else {
      return props.typeDesktop ? 'h-48' : 'image_container '
    }
  }
  return props.typeDesktop ? '' : ''
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
.image_container {
  min-height: calc(100vh - 250px);
}
</style>
