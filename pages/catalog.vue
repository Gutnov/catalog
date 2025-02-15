<template>
  <div>
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

const { data, error } = await useAsyncData(
  'users',
  async () => {
    if (process.server) {
      const { getUsers } = await import('~/server/utils/users')
      return getUsers()
    }
    return []
  }
)
const users = data.value
</script>

<style>
</style>
