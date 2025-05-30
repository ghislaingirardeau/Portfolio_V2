<template>
  <q-footer
    elevated
    ref="footer"
    class="opacity-0 h-0 bg-transparent text-white border-t-2"
    :class="footerColor"
  >
    <q-toolbar>
      <q-space />

      <div>
        <LogoImage
          ref="logoMalt"
          src="/logos/malt-svgrepo-com.png"
          link="https://www.malt.fr/profile/ghislaingirardeau1"
        />

        <q-icon
          v-for="icon in icons"
          :ref="footerIcons.set"
          :key="icon.name"
          size="lg"
          :name="icon.name"
          class="cursor-pointer mx-2 opacity-0 -translate-x-60"
          @click="goToExternalLink(icon.link)"
        />
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { mdiGithub, mdiLinkedin } from '@quasar/extras/mdi-v7'
import { useTemplateRef, onMounted, computed } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useTemplateRefsList } from '@vueuse/core'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import LogoImage from './common/LogoImage.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const animationSettings = useAnimationSettings()
const { ANIM_SHORT, footerMounted } = storeToRefs(animationSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const footer = useTemplateRef<any>('footer')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const footerIcons = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logoMalt = useTemplateRef<any>('logoMalt')

const footerColor = computed(() => {
  return $q.dark.mode ? 'border-dark-primary' : 'border-primary'
})

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

const tl = gsap.timeline()

onMounted(() => {
  footerAnimation()
  animationAppear()
})

function goToExternalLink(link: string) {
  window.open(link, '_blank')
}

function footerAnimation() {
  const elementTarget = footer.value?.$el as HTMLDivElement
  tl.to(elementTarget, {
    duration: 1,
    height: '50px',
    opacity: 1,
  })
}

function animationAppear() {
  const logoMaltTarget = logoMalt.value.$el as HTMLDivElement
  tl.to(logoMaltTarget, {
    duration: ANIM_SHORT.value,
    x: 0,
    opacity: 1,
  })
  icons.forEach((el, index) => {
    const elementTarget = footerIcons.value[index].$el as HTMLDivElement
    tl.to(elementTarget, {
      duration: ANIM_SHORT.value,
      x: 0,
      opacity: 1,
    })
  })
  tl.call(() => {
    footerMounted.value = true
  })
}
</script>

<style scoped></style>
