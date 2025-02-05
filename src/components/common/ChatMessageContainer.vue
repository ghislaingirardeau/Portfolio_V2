<template>
  <div
    class="right-24 ml-3 z-50 md:w-3/5 lg:w-96"
    :class="useIsMobileLandscape ? 'absolute bottom-12' : 'fixed bottom-24'"
  >
    <q-chat-message
      v-if="visitorTexts"
      ref="receivedMessage"
      :bg-color="chatReceivedBg"
      :text-color="chatReceivedColor"
      :text="[visitorTexts]"
      :style="{ 'font-size': fontSize }"
    />
    <q-chat-message sent name="Me" :text-color="chatColor" :bg-color="chatBg" ref="sentMessages">
      <div
        v-for="(text, index) in props.meTexts"
        :key="'text-' + index"
        :style="{ 'font-size': fontSize }"
      >
        <span v-html="text"></span>
      </div>
    </q-chat-message>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import {
  useIsMobile,
  useIsMobileLandscape,
  useIsMobileTall,
  useIsTablet,
} from 'src/utils/useDeviceInfo'
import { computed, onMounted, useTemplateRef, watch } from 'vue'

const animationSettings = useAnimationSettings()
const $q = useQuasar()

const { pageMounted } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sentMessages = useTemplateRef<any>('sentMessages')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const receivedMessage = useTemplateRef<any>('receivedMessage')

const props = defineProps({
  visitorTexts: { type: String, required: true, default: '' },
  meTexts: { type: Array, required: true },
  delayAnimation: { type: Number, default: 0.5 },
  hasEmitEvent: { type: Boolean, default: false },
  width: {
    type: String,
    default: 'w-full',
  },
})

const chatColor = computed(() => {
  return $q.dark.mode ? 'dark' : 'white'
})

const chatBg = computed(() => {
  return $q.dark.mode ? 'white' : 'dark'
})

const chatReceivedBg = computed(() => {
  return $q.dark.mode ? 'dark' : 'shadow'
})

const chatReceivedColor = computed(() => {
  return $q.dark.mode ? 'white' : 'dark'
})

const fontSize = computed(() => {
  if (useIsTablet()) {
    return useIsMobileLandscape.value ? '0.8rem' : '1.4rem'
  }
  if (useIsMobile()) {
    return useIsMobileTall() ? '1rem' : '0.8rem'
  }
  return '1.2rem'
})

function textMessageAnimation() {
  const duration = 1

  if (props.visitorTexts) {
    const allReceivedTextMessage = receivedMessage.value.$el.querySelectorAll(
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
