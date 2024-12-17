<template>
  <article class="row justify-between">
    <h2
      v-if="hasTitle"
      class="text-h4 text-md-h3 col-12"
      :class="{ 'md:text-right': index === 1, 'q-mt-xl': index === 1 }"
    >
      {{ props.title }}
    </h2>
    <div
      class="col-12 flex flex-center col-md-5 q-mb-md q-mb-md-none q-mt-xl"
      :class="{ 'order-last': isReverted }"
    >
      <q-img
        :src="props.imgSrc"
        alt="photo de Ghislain montagne"
        fit="contain"
        class="rounded-borders"
        width="85%"
      />
    </div>
    <div class="col-12 col-md-6 flex flex-center">
      <p class="reveal-3 about__personal--text">
        {{ props.text }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDeviceDetail } from 'src/stores/deviceDetails'

const deviceDetail = useDeviceDetail()

const props = defineProps({
  title: String,
  imgSrc: String,
  text: String,
  index: {
    type: Number,
    required: true,
  },
})

const hasTitle = computed(() => {
  return props.title?.length === 0 ? false : true
})

const isReverted = computed(() => {
  if (deviceDetail.isMobile) {
    return false
  }
  return props.index % 2 === 0 ? true : false
})
</script>

<style scoped></style>
