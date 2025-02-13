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
import { type ICompany } from '@/dto'
const route = useRoute()

const companiesList = ref<ICompany[]>([])
const loading = ref(false)
const count = ref(0)

const getSearchParams = (): URLSearchParams => {
  const page = route.query.page
  const limit = route.query.limit
  const sortBy = route.query.sortBy
  const sortDirection = route.query.sortDirection
  const queryParams = new URLSearchParams()
  const yearFrom = route.query.yearFrom
  const yearTo = route.query.yearTo
  if (page && !Array.isArray(page)) {
    queryParams.append('page', page)
  }
  if (limit && !Array.isArray(limit)) {
    queryParams.append('limit', limit)
  }
  if (sortBy && !Array.isArray(sortBy)) {
    queryParams.append('sortBy', sortBy)
  }
  if (sortDirection && !Array.isArray(sortDirection)) {
    queryParams.append('sortDirection', sortDirection)
  }
  if (yearFrom && !Array.isArray(yearFrom)) {
    queryParams.append('yearFrom', yearFrom)
  }
  if (yearTo && !Array.isArray(yearTo)) {
    queryParams.append('yearTo', yearTo)
  }
  
  return  queryParams
}

const { data } = await useFetch(`/api/companies?${getSearchParams().toString()}`)

companiesList.value = data.value?.companies as ICompany[]
count.value = data.value?.totalCount as number

watch(route, async () => {
  const queryParams = getSearchParams()
  await changePage(queryParams)
}, { deep: true })

const changePage = async (queryParams: URLSearchParams) => {
  loading.value = true
  const { companies, totalCount }  = await $fetch(`/api/companies?${queryParams.toString()}`)
  count.value = totalCount
  companiesList.value = companies as ICompany[]
  loading.value = false
}
</script>
