<template>
  <q-page class="q-pa-lg">
    <component :is="PanelImage" :name="tab" v-model:is-first-mounted="isFirstMounted" />

    <TheRobotContainer @robot-action="robotAction" />
    <ChatMessageContainer
      :key="meSlide"
      :meTexts="chatTexts"
      :visitor-texts="visitorChatTexts"
      :delay-animation="0.5"
    />
  </q-page>
</template>

<script setup lang="ts">
import { gsap } from 'src/boot/gsap'
import PanelImage from 'src/components/aboutPage/panelImage.vue'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()

const tab = ref('me')
const isFirstMounted = ref(true)
const meSlide = ref(1)

const tl = gsap.timeline({ delay: 0.5 })

const { tm, t } = useI18n({ useScope: 'global' })

const chatTexts = computed(() => {
  return route.name === 'aboutMe'
    ? (tm(`chatMessage.meMobile.${meSlide.value}.description`) as string[])
    : (tm(`chatMessage.workEnvMobile.${meSlide.value}.description`) as string[])
})

const visitorChatTexts = computed(() => {
  return route.name === 'aboutMe'
    ? tm(`chatMessage.meMobile.${meSlide.value}.title`)
    : tm(`chatMessage.workEnvMobile.${meSlide.value}.title`)
})

onMounted(() => {})

function robotAction() {
  if (meSlide.value === Object.keys(tm(`chatMessage.meMobile`) as string[]).length) {
    meSlide.value = 1
  } else {
    meSlide.value++
  }
}
</script>

<style scoped></style>
