<template>
  <div>
    <AppCatalog :images="images" />
  </div>
</template>

<script lang="ts" setup>
const res = await fetch('https://fakerapi.it/api/v2/images?_quantity=10&_type=any&_height=300')
const images = await res.json().then((body) => body.data)

</script>

<style>
</style>
