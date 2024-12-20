<template>
  <q-img
    :src="props.src"
    class="mr-2 w-8 h-8 cursor-pointer opacity-0 -translate-x-60"
    @click="goTo"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  src: String,
  link: {
    type: String,
    required: false,
  },
})

function goTo() {
  console.log(props.link)
  if (props.link) window.open(props.link, '_blank')
}
</script>

<style scoped></style>
