<template>
  <header class="bg-white shadow-md">
    <AppContainer>
      <div>
        <div class="flex justify-between items-center py-4">
          <NuxtLink
            to="/"
            class="flex items-center space-x-2"
          >
            <img
              src="/img/app-logo.png"
              alt="Логотип"
              class="h-10"
            >
            <span class="text-lg font-bold text-gray-900">Мой сайт</span>
          </NuxtLink>

          <nav class="hidden md:flex space-x-6">
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-gray-900"
            >
              Главная
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-gray-700 hover:text-gray-900"
            >
              О нас
            </NuxtLink>
            <NuxtLink
              to="/catalog"
              class="text-gray-700 hover:text-gray-900"
            >
              Каталог
            </NuxtLink>
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-gray-900"
            >
              Контакты
            </NuxtLink>
          </nav>

          <button
            class="md:hidden text-gray-700 focus:outline-none"
            @click="toggleMenu"
          >
            <svg
              v-if="!isOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Мобильное меню -->
        <nav
          v-if="isOpen"
          class="md:hidden bg-white border-t border-gray-200"
        >
          <ul class="flex flex-col space-y-2 py-4 px-4">
            <li>
              <NuxtLink
                to="/"
                class="block text-gray-700 hover:text-gray-900"
              >
                Главная
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="block text-gray-700 hover:text-gray-900"
              >
                О нас
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/catalog"
                class="block text-gray-700 hover:text-gray-900"
              >
                Каталог
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="block text-gray-700 hover:text-gray-900"
              >
                Контакты
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </AppContainer>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
