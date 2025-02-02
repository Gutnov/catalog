<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">
        Каталог изображений
      </h2>

      <div
        v-if="pending"
        class="text-center text-gray-500"
      >
        Загружаем изображения...
      </div>
      <div
        v-else-if="error"
        class="text-center text-red-500"
      >
        Ошибка загрузки данных
      </div>

      <div
        v-else
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

<script setup>
const images = ref([])
// const { data, pending, error } = useFetch('https://fakerapi.it/api/v2/images?_quantity=10&_type=any&_height=300')
const res = await fetch('https://fakerapi.it/api/v2/images?_quantity=10&_type=any&_height=300')

images.value = await res.json().then((body) => body.data)

// const images = computed(() => data.value?.data || [])
</script>