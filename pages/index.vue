<template>
  <div>
    <h1>Главная</h1>
    <ul>
      <li
        v-for="company in companies"
        :key="company.id"
      >
        {{ company.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { data:companies } = useFetch('/api/companies')
</script>
