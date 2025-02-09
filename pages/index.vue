<template>
  <div>
    <AppContainer>
      <h1 class="text-3xl font-bold text-gray-900 my-5">
        Список компаний
      </h1>
      <CompaniesTable
        :list="companiesList"
        :count="count"
        :loading="loading"
        @change="changePage"
      />
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
import { type ICompany } from '@/types'

const currentPage = ref(1)
const companiesList = ref<ICompany[]>([])
const loading = ref(false)
const count = ref(0)
const { data } = await useFetch('/api/companies')

companiesList.value = data.value?.data as ICompany[]
count.value = data.value?.pagination.count as number


const changePage = async ({ page, limit }: { page: number, limit: number }) => {
  loading.value = true
  currentPage.value = page
  const { data, pagination }  = await $fetch(`/api/companies?page=${currentPage.value}&limit=${limit}`)
  count.value = pagination.count
  companiesList.value = data as ICompany[]
  loading.value = false
}
</script>
