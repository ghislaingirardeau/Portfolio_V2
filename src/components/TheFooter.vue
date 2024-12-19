<template>
  <q-footer elevated ref="footer" class="opacity-0 h-0 bg-grey-8 text-white">
    <q-toolbar>
      <q-space />

      <q-icon
        v-for="icon in icons"
        :ref="footerIcons.set"
        :key="icon.name"
        size="lg"
        :name="icon.name"
        class="cursor-pointer mx-2 opacity-0 -translate-x-60"
        @click="goToExternalLink(icon.link)"
      />
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { mdiGithub, mdiLinkedin } from '@quasar/extras/mdi-v7'
import { useTemplateRef, onMounted } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useTemplateRefsList } from '@vueuse/core'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'

const animationSettings = useAnimationSettings()
const { ANIM_SHORT } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const footer = useTemplateRef<any>('footer')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const footerIcons = useTemplateRefsList<any>()

const icons = [
  {
    name: mdiGithub,
    link: 'https://github.com/ghislaingirardeau',
  },
  {
    name: mdiLinkedin,
    link: 'https://www.linkedin.com/in/ghislain-girardeau/',
  },
]

onMounted(() => {
  footerAnimation()
  animationAppear()
})

function goToExternalLink(link: string) {
  window.open(link, '_blank')
}

function footerAnimation() {
  const elementTarget = footer.value?.$el as HTMLDivElement
  gsap.to(elementTarget, { duration: 1, height: '50px', opacity: 1 })
}

function animationAppear() {
  const tl = gsap.timeline({ delay: 1 })
  icons.forEach((el, index) => {
    const elementTarget = footerIcons.value[index].$el as HTMLDivElement
    tl.to(elementTarget, {
      duration: ANIM_SHORT.value,
      x: 0,
      opacity: 1,
    })
  })
}
</script>

<style scoped></style>
