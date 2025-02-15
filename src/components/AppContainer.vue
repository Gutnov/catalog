<template>
  <div :class="mergedClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
const props = defineProps<{
  classes?: string;
}>()
const mergedClasses = computed(() => {
  return twMerge(
    'container mx-auto desktop:px-8 px-5 w-full',
    props.classes
  )
})
</script>

<style lang="scss">
.container {
  max-width: 985px;
}
</style>
