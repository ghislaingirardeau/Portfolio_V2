<template>
  <article class="row justify-between">
    <h2 v-if="hasTitle" class="text-h4 text-md-h3 col-12">{{ props.title }}</h2>
    <div
      class="col-12 col-md-6 q-mb-md q-mb-md-none"
      :class="{ 'q-mt-xl': !hasTitle, 'order-last': isReverted }"
    >
      <q-img
        :src="props.imgSrc"
        alt="photo de Ghislain montagne"
        fit="contain"
        class="rounded-borders"
      />
    </div>
    <div class="col-12 col-md-5 flex flex-center">
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
