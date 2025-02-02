<template>
  <div class="layout min-h-screen grid overflow-auto">
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
<script setup lang="ts">


</script>

<style lang="scss">
  .layout {
    grid-template-rows: auto 1fr auto;
  }
</style>
