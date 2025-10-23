<script setup lang="ts">
/**
 * Ocean Professional card surface container.
 * Props:
 * - padding: CSS padding value (default 1rem)
 * - hover: adds subtle hover elevation
 */
defineOptions({ name: 'AppCard' })
withDefaults(defineProps<{ padding?: string; hover?: boolean }>(), {
  padding: '1rem',
  hover: false
})
</script>

<template>
  <div class="card" :style="{ padding }" :class="[{ 'card-hover': hover }]">
    <slot />
  </div>
</template>

<style scoped>
.card-hover {
  transition: transform .12s ease, box-shadow .12s ease;
}
.card-hover:hover {
  transform: translateY(-1px);
}
</style>
