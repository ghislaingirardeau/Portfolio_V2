<template>
  <q-page class="q-pa-lg relative">
    <!-- <OctogoneWidget title="front" ref="front" class="absolute top-10 right-48" />
    {{ frontEl.x }}, {{ frontEl.y }}
    <OctogoneWidget title="back" ref="back" class="absolute bottom-28" />

    {{ backEl.x }}, {{ backEl.y }} -->

    <!-- <div>
      <q-img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg"
        alt=""
        fit="contain"
        height="70px"
      />
    </div> -->
    <TheRobotContainer />
    <AppRobotStars />
  </q-page>
</template>

<script setup lang="ts">
import OctogoneWidget from 'src/components/stackPage/OctogoneWidget.vue'
import { useElementBounding } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import TheRobotContainer from 'src/components/common/TheRobotContainer.vue'
import AppRobotStars from 'src/components/common/AppRobotStars.vue'

const front = useTemplateRef('front')
const back = useTemplateRef('back')

const frontEl = useElementBounding(front)
const backEl = useElementBounding(back)
</script>

<style scoped lang="scss"></style>
