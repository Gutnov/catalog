<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">
        Каталог изображений
      </h2>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="item in images"
          :key="item.url"
          class="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            :src="item.url"
            :alt="item.title"
            class="w-full h-48 object-cover"
          >
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ item.title }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<({
  images: Array<any>
})>()
</script>
