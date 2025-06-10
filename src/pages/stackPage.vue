<template>
  <div class="q-pa-lg relative" :class="usePageMobileLandscapeClass">
    <AppAtom :slide-chat="slideChat" @robot-action="robotAction" />

    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <ChatMessageContainer
        :meTexts="chatTexts"
        :visitor-texts="visitorChatTexts"
        :delay-animation="0.5"
        :key="'chat' + slideChat"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import ChatMessageContainer from 'src/components/common/ChatMessageContainer.vue'
import AppAtom from 'src/components/stackPage/AppAtom.vue'
import { usePageMobileLandscapeClass } from 'src/utils/useDeviceInfo'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAnimationSettings } from 'src/stores/animationSettings'

const { tm } = useI18n({ useScope: 'global' })

const animationSettings = useAnimationSettings()
const { isRobotClickable, executeRobotAction } = storeToRefs(animationSettings)

const slideChat = ref(0)

const chatTexts = computed(() => {
  return tm(`chatMessage.stack.${slideChat.value}.description`) as string[]
})

const visitorChatTexts = computed(() => {
  return tm(`chatMessage.stack.${slideChat.value}.title`) as string
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

function robotAction() {
  if (isRobotClickable.value) {
    if (slideChat.value === 1) {
      slideChat.value = 0
    } else {
      slideChat.value++
    }
  }
}
</script>
