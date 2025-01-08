<template>
  <q-tab-panel :name="props.name">
    <div class="flex flex-center lg:justify-start">
      <WireCode
        ref="imageSkeleton"
        v-show="isFirstMounted"
        content="&lt;div&gt;Image About me&lt;/div&gt;"
        class="flex flex-center w-72 h-40 border-2 border-solid border-gray-300 bg-grey-3 absolute"
      />
      <q-img
        ref="image"
        :src="imageToDisplay"
        alt="photo de Ghislain montagne"
        fit="contain"
        class="rounded-borders opacity-0 w-10/12 lg:w-2/5"
      />
    </div>
  </q-tab-panel>
</template>

<script setup lang="ts">
import { gsap } from 'src/boot/gsap'
import { computed, onMounted, ref } from 'vue'
import WireCode from '../common/WireCode.vue'
import { useAnimationSettings } from 'src/stores/animationSettings'

const isFirstMounted = defineModel('isFirstMounted', { type: Boolean, required: true })
const animationSettings = useAnimationSettings()

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const tl = gsap.timeline({ delay: isFirstMounted.value ? 0.8 : 0 })

const image = ref()
const imageSkeleton = ref()

const imageToDisplay = computed(() => {
  return props.name === 'me' ? 'images/aboutPage/moi2.jpg' : 'images/aboutPage/moi.jpg'
})

onMounted(() => {
  animationImage()
})

function animationImage() {
  tl.to(imageSkeleton.value.$el, {
    duration: 0.3,
    opacity: 0,
  }).to(image.value.$el, {
    duration: 0.5,
    delay: 0.3,
    opacity: 1,
  })
  tl.call(() => {
    isFirstMounted.value = false
    animationSettings.isAnimating = false
  })
}
</script>

<style scoped></style>
