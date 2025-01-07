<template>
  <q-page class="q-pa-lg">
    <q-tabs
      ref="tabs"
      v-model="tab"
      dense
      class="text-grey h-0"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      @update:model-value="resetCarousel"
    >
      <q-tab name="mobile" ref="menuTab" :label="'Mobile first'" />
      <q-tab name="desktop" :label="'desktop'" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mobile">
        <CarouselProjects
          v-model:currentSlide="currentSlide"
          :slide-number="projectsMobile.length"
          :type-desktop="false"
          v-model:is-first-mounted="isFirstMounted"
        >
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <q-img
              :key="projectsMobile[currentSlide]!.id"
              :src="`/images/projectsPage/${projectsMobile[currentSlide]!.imageURL[0]}`"
              fit="contain"
              loading="lazy"
              spinner-color="white"
              height="288px"
              class="cursor-pointer"
              @click="goToProjectDetail(projectsMobile[currentSlide]!.id)"
            >
            </q-img>
          </transition>
        </CarouselProjects>
      </q-tab-panel>

      <q-tab-panel name="desktop">
        <CarouselProjects
          v-model:currentSlide="currentSlide"
          :slide-number="projectsDesktop.length"
          :type-desktop="true"
          v-model:is-first-mounted="isFirstMounted"
        >
          <q-img
            :src="`/images/projectsPage/${projectsDesktop[currentSlide]!.imageURL[0]}`"
            fit="contain"
            loading="lazy"
            spinner-color="white"
            height="288px"
            class="cursor-pointer"
            @click="goToProjectDetail(projectsDesktop[currentSlide]!.id)"
          >
          </q-img>
        </CarouselProjects>
      </q-tab-panel>
    </q-tab-panels>
    <TheRobotContainer />
    <ChatMessageContainer :texts="tm('chatMessage.project')" />
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'

import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import CarouselProjects from 'src/components/projectPage/carouselProjects.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import type { Project } from 'src/types'
import { onMounted } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const animationSettings = useAnimationSettings()
const { headerMounting } = storeToRefs(animationSettings)

const { tm } = useI18n({ useScope: 'global' })
const router = useRouter()

const tab = ref('mobile')
const tabs = ref()
const currentSlide = ref(0)
const isFirstMounted = ref(true)

const projectsMobile = computed(() => {
  return [...tm('projects.mobile')] as Project[]
})

const projectsDesktop = computed(() => {
  return [...tm('projects.desktop')] as Project[]
})

onMounted(() => {
  if (!headerMounting.value) {
    headerMounting.value = true
  }
  gsap.to(tabs.value.$el, {
    duration: 0.5,
    height: '40px',
    opacity: 1,
    delay: 0.2,
  })
})

function goToProjectDetail(id: string) {
  router.push({ name: 'project-detail', params: { id } })
}

function resetCarousel() {
  currentSlide.value = 0
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
