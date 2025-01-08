<template>
  <q-page class="q-pa-lg flex q-gutter-md">
    <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-card
        class="text-center"
        :class="cardClass"
        flat
        bordered
        v-for="project in projects"
        :key="project.id + isMobileProjectDisplayed"
      >
        <q-card-section>
          <div class="text-overline text-orange-9">{{ project.name }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs h-20">{{ project.summary }}</div>
          <div class="text-caption text-grey h-12 my-1">
            {{ project.tech }}
          </div>
        </q-card-section>

        <desktopCardCarousel
          :project-image-url="project.imageURL"
          :type-desktop="isDesktopProjectDisplayed"
        />

        <desktopCardActions :description="project.description" :link="project.link" />
      </q-card>
    </transition-group>

    <TheRobotContainer @click="handleRobotAction" class="cursor-pointer" />

    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        :key="'text-' + isMobileProjectDisplayed"
        :texts="chatMessageToDisplay"
        :has-emit-event="!chatExpanded ? false : true"
        @some-event="!chatExpanded ? null : handleTextToDisplay()"
        :delay-animation="0.5"
        :width="!chatExpanded ? 'lg:w-10' : 'lg:w-80'"
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import desktopCardCarousel from 'src/components/projectPage/desktopCardCarousel.vue'
import desktopCardActions from 'src/components/projectPage/desktopCardActions.vue'
import { Project } from 'src/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'

const { tm } = useI18n({ useScope: 'global' })

const isMobileProjectDisplayed = ref(true)
const isDesktopProjectDisplayed = ref(false)
const chatExpanded = ref(true)

const projects = computed(() => {
  return isMobileProjectDisplayed.value
    ? ([...tm('projects.mobile')] as Project[])
    : ([...tm('projects.desktop')] as Project[])
})

const cardClass = computed(() => {
  return isMobileProjectDisplayed.value ? 'w-80' : 'w-2/5'
})

const chatMessageToDisplay = computed(() => {
  if (!chatExpanded.value) {
    return ['...']
  } else {
    return isMobileProjectDisplayed.value
      ? [...tm('chatMessage.project'), ...tm('chatMessage.projectDesktop.mobile')]
      : [...tm('chatMessage.projectDesktop.desktop')]
  }
})

function handleTextToDisplay() {
  isMobileProjectDisplayed.value = !isMobileProjectDisplayed.value
  isDesktopProjectDisplayed.value = !isDesktopProjectDisplayed.value
}

function handleRobotAction() {
  chatExpanded.value = !chatExpanded.value
}
</script>

<style scoped lang="scss"></style>
