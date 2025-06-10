<template>
  <q-page class="q-pa-lg">
    <div class="w-3/5 flex justify-center items-stretch" style="height: 75vh">
      <AppMeImage
        v-for="(image, index) in imagesToDisplay"
        :key="image"
        :imageSrc="image"
        :isImageFixed="isImageFixed[index]!"
      />
    </div>

    <ChatMessageContainer
      :key="'chatContainer' + meSlide"
      :meTexts="chatTexts"
      :visitor-texts="visitorChatTexts"
      :delay-animation="0.5"
    />
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AppMeImage from '../common/AppMeImage.vue'

const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable, isRobotTalk, executeRobotAction } =
  storeToRefs(animationSettings)
const route = useRoute()

const { tm } = useI18n({ useScope: 'global' })

const meSlide = ref(0)
const isImageFixed = ref([true, false, false])

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

const imagesToDisplay = computed(() => {
  return route.name === 'aboutMe'
    ? (tm(`about.personal.imageURL`) as string[])
    : (tm(`about.professionaly.imageURL`) as string[])
})

onMounted(() => {
  pageMounted.value = true
  isRobotClickable.value = true
  isRobotTalk.value = true
})

// When click on the robot inside the layout, it will execute the action
watch(
  () => executeRobotAction.value,
  (newValue: boolean) => {
    if (newValue) {
      robotAction()
      executeRobotAction.value = false
    }
  },
)

function handleSwitchImage(index: number) {
  const imgPrevIndex = isImageFixed.value.findIndex((el) => el === true)
  isImageFixed.value[imgPrevIndex] = false
  isImageFixed.value[index] = true
  meSlide.value = index
}

function robotAction() {
  if (isRobotClickable.value) {
    if (meSlide.value === 2) {
      handleSwitchImage(0)
      meSlide.value = 0
    } else {
      meSlide.value++
      handleSwitchImage(meSlide.value)
    }
  }
}
</script>

<style scoped></style>
