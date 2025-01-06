<template>
  <div>
    <div class="absolute bottom-16 right-24 lg:bottom-16 lg:right-32 ml-3">
      <q-chat-message sent :text-color="textColor" :bgColor="bgColor">
        <div ref="chatMessages" v-for="(text, index) in props.texts" :key="'text-' + index">
          <WireCode v-if="isPlaceholder" content="&lt;div&gt;chat message&lt;/div&gt;" />
          <span v-else>{{ text }}</span>
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
})

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
      delay: 0.5 + i / 5,
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
</script>

<style scoped lang="scss"></style>
