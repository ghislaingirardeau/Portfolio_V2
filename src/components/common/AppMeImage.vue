<template>
  <q-img
    :src="`images/aboutPage/${props.imageSrc}`"
    ref="image"
    alt="photo de Ghislain montagne"
    fit="contain"
    class="rounded-borders opacity-60 md:w-2/5 img-square z-10"
    width="40%"
    :class="{ 'img-square-done': props.isImageFixed }"
    loading="eager"
    fetchpriority="high"
  >
  </q-img>
</template>

<script setup lang="ts">
const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  isImageFixed: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped>
.img-square {
  --_g: 10% /45% 45% no-repeat linear-gradient(#000 0 0);
  --m: left var(--_i, 0%) top var(--_g), bottom var(--_i, 0%) left var(--_g),
    top var(--_i, 0%) right var(--_g), right var(--_i, 0%) bottom var(--_g);
  -webkit-mask: var(--m);
  mask: var(--m);
  filter: grayscale();
  transition: 0.3s linear;
}
.img-square-done {
  --_i: 10%;
  filter: grayscale(0);
  border-radius: 20%;
}
</style>
