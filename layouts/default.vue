<template>
  <VApp>
    <div class="layout min-h-full grid">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </div>
  </VApp>
</template>
<script setup lang="ts">


</script>

<style lang="scss">
  .layout {
    grid-template-rows: auto 1fr auto;
  }
</style>
