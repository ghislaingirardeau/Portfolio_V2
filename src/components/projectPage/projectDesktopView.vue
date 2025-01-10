<template>
  <q-page class="q-pa-lg flex q-gutter-md">
    <q-card
      class="text-center"
      :class="cardClass"
      flat
      bordered
      v-for="project in projects"
      :key="project.id + isMobileProjectDisplayed"
    >
      <q-card-section>
        <div ref="cardOverline" class="text-overline text-grey opacity-50">
          &lt;div&gt;Project name&lt;/div&gt;
        </div>
        <div ref="cardTitle" class="text-h5 q-mt-sm q-mb-xs h-20 opacity-20 scale-50">
          &lt;h1&gt;summary&lt;/h1&gt;
        </div>
        <div ref="cardCaption" class="text-caption text-grey h-12 my-1 opacity-50">
          &lt;div&gt;Project tech&lt;/div&gt;
        </div>
      </q-card-section>

      <desktopCardCarousel
        :project-image-url="project.imageURL"
        :type-desktop="isDesktopProjectDisplayed"
      />

      <desktopCardActions :description="project.description" :link="project.link" />
    </q-card>

    <TheRobotContainer @click="handleRobotAction" class="cursor-pointer" />

    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        :key="'text-' + isMobileProjectDisplayed"
        :meTexts="chatMessageToDisplay"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'

const { tm, locale } = useI18n({ useScope: 'global' })
const animationSettings = useAnimationSettings()
const { pageMounted } = storeToRefs(animationSettings)

const isMobileProjectDisplayed = ref(true)
const isDesktopProjectDisplayed = ref(false)
const chatExpanded = ref(true)

const cardOverline = ref<HTMLElement[]>([])
const cardTitle = ref<HTMLElement[]>([])
const cardCaption = ref<HTMLElement[]>([])

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

onMounted(() => {
  pageMounted.value = false
  animationCardTitle(true)
})

function animationCardTitle(isFirstMount: boolean) {
  if (!isFirstMount) {
    cardOverline.value.reverse()
    cardTitle.value.reverse()
    cardCaption.value.reverse()
  }

  projects.value.forEach((element, index) => {
    const elementCardOverline = cardOverline.value[index] as HTMLDivElement
    const elementCardTitle = cardTitle.value[index] as HTMLDivElement
    const elementCardCaption = cardCaption.value[index] as HTMLDivElement

    const tl = gsap.timeline()

    tl.to(elementCardOverline, {
      duration: 1,
      opacity: 1,

      text: { value: element.name, newClass: 'text-orange-9' },
      ease: 'none',
    })
      .to(elementCardTitle, {
        duration: 1,
        opacity: 1,
        scale: 1,
        text: { value: element.summary },
        ease: 'none',
      })
      .to(elementCardCaption, {
        duration: 1,
        opacity: 1,

        text: { value: element.tech },
        ease: 'none',
      })
    tl.call(() => {
      pageMounted.value = true
    })
  })
}

function handleTextToDisplay() {
  isMobileProjectDisplayed.value = !isMobileProjectDisplayed.value
  isDesktopProjectDisplayed.value = !isDesktopProjectDisplayed.value
}

function handleRobotAction() {
  chatExpanded.value = !chatExpanded.value
}

watch(
  () => isMobileProjectDisplayed.value,
  () => {
    pageMounted.value = false
    setTimeout(() => {
      animationCardTitle(false)
    }, 500)
  },
)

watch(
  () => locale.value,
  () => {
    pageMounted.value = false
    setTimeout(() => {
      animationCardTitle(true)
    }, 500)
  },
)
</script>

<style scoped lang="scss"></style>
