<template>
  <footer class="bg-gray-800 text-white py-8 h-max">
    <AppContainer>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex md:justify-between items-center justify-center">
          <div class="flex md:space-x-4 flex-col md:flex-row items-center">
            <NuxtLink
              to="/"
              class="text-gray-300 hover:text-white text-sm font-medium"
            >
              Политика конфиденциальности
            </NuxtLink>
            <NuxtLink
              to="/"
              class="text-gray-300 hover:text-white text-sm font-medium"
            >
              Условия использования
            </NuxtLink>
            <NuxtLink
              to="/"
              class="text-gray-300 hover:text-white text-sm font-medium"
            >
              Контакты
            </NuxtLink>
          </div>
        </div>
        <div class="mt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Ваша компания. Все права защищены.</p>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>

<script setup>
</script>

<style scoped>
</style>
