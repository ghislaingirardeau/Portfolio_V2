<template>
  <q-footer elevated ref="footer" class="opacity-0 h-0 bg-grey-8 text-white">
    <q-toolbar>
      <q-toolbar-title class="flex flex-center">
        <q-icon
          v-for="icon in icons"
          :key="icon.name"
          size="lg"
          :name="icon.name"
          class="cursor-pointer mx-10"
          @click="goToExternalLink(icon.link)"
        />
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { mdiGithub, mdiLinkedin } from '@quasar/extras/mdi-v7'
import { useTemplateRef, onMounted } from 'vue'
import { gsap } from 'src/boot/gsap'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const footer = useTemplateRef<any>('footer')

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

function goToExternalLink(link: string) {
  window.open(link, '_blank')
}

function footerAnimation() {
  const elementTarget = footer.value?.$el as HTMLDivElement
  gsap.to(elementTarget, { duration: 1, height: '50px', opacity: 1 })
}

onMounted(() => {
  footerAnimation()
})
</script>

<style scoped></style>
