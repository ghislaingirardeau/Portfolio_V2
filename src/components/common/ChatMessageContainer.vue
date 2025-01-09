<template>
  <div>
    <div class="fixed bottom-28 right-24 ml-3">
      <q-chat-message sent :text-color="textColor" :bgColor="bgColor">
        <div
          ref="chatMessages"
          v-for="(text, index) in props.texts"
          :key="'text-' + index"
          @click="handleChatMessageAction(index)"
          class="w-full"
          :class="width"
        >
          <WireCode v-if="isPlaceholder" content="&lt;div&gt;chat message&lt;/div&gt;" />
          <span
            :class="{
              'italic underline cursor-pointer': props.texts.length - 1 === index && hasEmitEvent,
            }"
            v-html="text"
            v-else
          ></span>
        </div>
      </q-chat-message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import WireCode from './WireCode.vue'
import { onMounted, ref, watch } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'
const animationSettings = useAnimationSettings()

const { robotMounted } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chatMessages = useTemplateRefsList<any>()

const isPlaceholder = ref(true)

const textColor = ref('grey-9')
const bgColor = ref('grey-2')

const props = defineProps({
  texts: { type: Array, required: true },
  delayAnimation: { type: Number, default: 2 },
  hasEmitEvent: { type: Boolean, default: false },
  width: {
    type: String,
    default: 'w-full',
  },
})

const emit = defineEmits(['someEvent'])

function textMessageAnimation() {
  const getParents = [] as HTMLElement[]

  chatMessages.value.forEach((el) => {
    getParents.push(el.closest('.q-message-text'))
  })
  const duration = 0.5

  gsap.to(getParents, {
    opacity: 0,
    x: -30,
    duration,
    onComplete: () => {
      isPlaceholder.value = false
      textColor.value = 'white'
      bgColor.value = 'blue'
    },
  })

  getParents.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration,
      delay: props.delayAnimation + i / 4,
    })
  })
}

onMounted(() => {
  if (robotMounted.value) {
    textMessageAnimation()
  }
})

watch(robotMounted, () => {
  textMessageAnimation()
})

function handleChatMessageAction(index: number) {
  if (props.texts.length - 1 === index) {
    emit('someEvent')
  }
}
</script>

<style scoped lang="scss"></style>
