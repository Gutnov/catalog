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

const companiesList = ref<ICompany[]>([])
const loading = ref(false)
const count = ref(0)
const { data } = await useFetch('/api/companies')
const route = useRoute()

companiesList.value = data.value?.companies as ICompany[]
count.value = data.value?.totalCount as number

watch(route, async () => { 
  const page = Number(route.query.page) || 1
  const limit = Number(route.query.limit) || 5
  const sort = route.query.sort as string
  const order = route.query.order as string
  await changePage({ page, limit, sort, order })
}, { deep: true })

const changePage = async ({ page, limit, sort, order }: { page: number, limit: number, sort: string, order: string }) => {
  loading.value = true
  const { companies, totalCount }  = await $fetch(`/api/companies?page=${page}&limit=${limit}&sort=${sort}&order=${order}`)
  count.value = totalCount
  companiesList.value = companies as ICompany[]
  loading.value = false
}


</script>
