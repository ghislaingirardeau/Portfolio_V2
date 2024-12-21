<template>
  <div>
    <div class="absolute bottom-16 right-24 lg:bottom-16 lg:right-32 ml-3">
      <q-chat-message
        v-for="(text, index) in props.texts"
        :key="'text-' + index"
        class="opacity-0 -translate-x-64"
        :name="index === 0 ? 'Ghislain Robot' : ''"
        :text="[text]"
        sent
        text-color="white"
        bg-color="primary"
        ref="chatMessages"
      />
    </div>
    <div ref="codePlaceholder" class="absolute bottom-16 right-32 ml-3 column">
      <WireCode content="&lt;div&gt;chat message&lt;/div&gt;" />
      <WireCode content="&lt;div&gt;chat message&lt;/div&gt;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import WireCode from './WireCode.vue'
import { useTemplateRef, watch } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'
const animationSettings = useAnimationSettings()

const { robotMounted } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chatMessages = useTemplateRefsList<any>()
const codePlaceholder = useTemplateRef('codePlaceholder')

const props = defineProps({
  texts: { type: Array, required: true },
})

function textMessageAnimation() {
  const tl = gsap.timeline()
  tl.to(codePlaceholder.value, {
    opacity: 0,
    x: 60,
    duration: 0.5,
  })

  props.texts?.forEach((el, index) => {
    const elementTarget = chatMessages.value[index].$el as HTMLDivElement
    tl.to(elementTarget, {
      x: 0,
      opacity: 1,
      duration: 0.2,
    })
  })
}

watch(robotMounted, () => {
  textMessageAnimation()
})
</script>

<style scoped lang="scss"></style>
