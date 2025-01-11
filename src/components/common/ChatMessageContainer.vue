<template>
  <div>
    <div class="fixed bottom-24 right-24 ml-3">
      <q-chat-message v-if="visitorTexts" ref="receivedMessages" :text="[visitorTexts]" />
      <q-chat-message sent name="Me" text-color="white" bg-color="blue" ref="sentMessages">
        <div
          v-for="(text, index) in props.meTexts"
          :key="'text-' + index"
          @click="handleChatMessageAction(index)"
          :class="{
            'italic underline cursor-pointer': isLastChatClickable(index),
            width,
          }"
          :style="{ 'font-size': useIsMobileTall() ? '1rem' : '0.8rem' }"
        >
          <span v-html="text"></span>
        </div>
      </q-chat-message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { useIsMobileTall } from 'src/utils/useDeviceInfo'
import { onMounted, useTemplateRef, watch } from 'vue'
const animationSettings = useAnimationSettings()

const { pageMounted } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sentMessages = useTemplateRef<any>('sentMessages')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const receivedMessages = useTemplateRef<any>('receivedMessages')

const props = defineProps({
  visitorTexts: { type: String },
  meTexts: { type: Array, required: true },
  delayAnimation: { type: Number, default: 0.5 },
  hasEmitEvent: { type: Boolean, default: false },
  width: {
    type: String,
    default: 'w-full',
  },
})

function isLastChatClickable(index: number) {
  return props.meTexts.length - 1 === index && props.hasEmitEvent
}

const emit = defineEmits(['someEvent'])

function textMessageAnimation() {
  const duration = 1

  if (props.visitorTexts) {
    const allReceivedTextMessage = receivedMessages.value.$el.querySelectorAll(
      '.q-message-text, .q-message-name ',
    ) as HTMLElement[]
    allReceivedTextMessage.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration,
        delay: props.delayAnimation + i / 4,
      })
    })
  }
  const allSendTextMessage = sentMessages.value.$el.querySelectorAll(
    '.q-message-text, .q-message-name ',
  ) as HTMLElement[]

  allSendTextMessage.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration,
      delay: props.delayAnimation + i / 4,
    })
  })
}

onMounted(() => {
  if (pageMounted.value) {
    textMessageAnimation()
  }
})

watch(pageMounted, (newValue) => {
  if (newValue) {
    textMessageAnimation()
  }
})

function handleChatMessageAction(index: number) {
  if (props.meTexts.length - 1 === index) {
    emit('someEvent')
  }
}
</script>

<style lang="scss">
.q-message-text {
  opacity: 0;
  transform: translateX(-30px);
  &:last-child {
    min-height: unset;
  }
}

.q-message-name {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
