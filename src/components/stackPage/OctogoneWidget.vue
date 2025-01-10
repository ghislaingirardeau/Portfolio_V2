<template>
  <div class="w-24 h-24 flex flex-center">
    <div class="octagon"></div>
    <span class="absolute">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
})
</script>

<style scoped lang="scss">
.octagon {
  --b: 6px;

  width: 90px;
  aspect-ratio: 1;
  --o: calc(50% * tan(-22.5deg));
  --x: calc(var(--b) * cos(22.5deg));
  --y: calc(var(--b) * sin(22.5deg));
  clip-path: polygon(
    var(--o) 50%,
    50% var(--o),
    calc(100% - var(--o)) 50%,
    50% calc(100% - var(--o)),
    var(--o) 50%,
    calc(50% + var(--o) + var(--y)) var(--x),
    var(--x) calc(50% + var(--o) + var(--y)),
    var(--x) calc(50% - var(--o) - var(--y)),
    calc(50% + var(--o) + var(--y)) calc(100% - var(--x)),
    calc(50% - var(--o) - var(--y)) calc(100% - var(--x)),
    calc(100% - var(--x)) calc(50% - var(--o) - var(--y)),
    calc(100% - var(--x)) calc(50% + var(--o) + var(--y)),
    calc(50% - var(--o) - var(--y)) var(--x),
    calc(50% + var(--o) + var(--y)) var(--x)
  );
  background: #3b8686;
}
</style>
