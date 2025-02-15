<template>
  <div class="companies-table">
    <div class="grid gap-2 grid-cols-2 companies-table__filters mb-5">
      <VSelect
        v-model="yearFrom"
        :items="availableYears"
        label="Год от"
        variant="outlined"
        hide-details
        single-line
      />
      <VSelect
        v-model="yearTo"
        :items="filteredYearsTo"
        label="Год до"
        variant="outlined"
        hide-details
        single-line
      />
    </div>
    <VDataTableServer
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :items-per-page-options="[DEFAULT_COMPANIES_LIMIT, 10, 25, 50, 100]"
      :headers="headers"
      :items="list"
      :items-length="count"
      :loading="loading"
      item-value="name"
      :search="search"
      @update:options="setQueryParams"
    >
      <template #top>
        <VTextField
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        />
      </template>
    </VDataTableServer>
  </div>
</template>

<script lang="ts" setup>
import type { VDataTableServer } from 'vuetify/components/VDataTable'
import { type CompanyDto, type CompaniesQueryDto } from '@/dto'

import {
  DEFAULT_COMPANIES_LIMIT,
  DEFAULT_COMPANIES_PAGE,
  DEFAULT_MIN_YEAR
} from '~/settings'

type Options = InstanceType<typeof VDataTableServer>['$options']
const search = ref('')
const tableFilters = ref<Options>({})


const yearFrom = ref<number>(DEFAULT_MIN_YEAR)
const yearTo = ref<number>(new Date().getFullYear())

watch(yearFrom, async (val) => {

  if (yearFrom.value > yearTo.value) {
    // todo: remove this code, if not necessary
    window.alert('I am here')
    yearTo.value = yearFrom.value
  }

  await setQueryParams({ ...tableFilters.value, yearFrom: yearFrom.value, yearTo: yearTo.value, search: search.value })
})

watch(yearTo, async () => {
  if (yearTo.value < yearFrom.value) yearFrom.value = yearTo.value
  // await loadItems(mapVdataTableToQuery())
  await setQueryParams({ ...tableFilters.value, yearFrom: yearFrom.value, yearTo: yearTo.value, search: search.value })
})

watch(search, async (val) => {
  await setQueryParams({ ...tableFilters.value, yearFrom: yearFrom.value, yearTo: yearTo.value, search: search.value })
})

const availableYears = Array.from({ length: yearTo.value - DEFAULT_MIN_YEAR + 1 }, (_, i) => DEFAULT_MIN_YEAR + i)

const filteredYearsTo = computed(() => {
  if (!yearFrom.value) return availableYears
  return availableYears.filter(year => year >= yearFrom.value)
})

defineProps<({
  list: Array<CompanyDto>
  count: number,
  loading: boolean
})>()

const router = useRouter()
const route = useRoute()

const itemsPerPage = ref(route.query.limit && !Array.isArray(route.query.limit)
  ? route.query.limit
  : DEFAULT_COMPANIES_LIMIT
)

const page = ref(route.query.page && !Array.isArray(route.query.page)
  ? route.query.page
  : DEFAULT_COMPANIES_PAGE
)

const headers: InstanceType<typeof VDataTableServer>['headers']= [
  {
    align: 'start',
    key: 'id',
    sortable: false,
    title: 'ID',
    value: 'id'
  },
  {
    align: 'start',
    key: 'name',
    sortable: true,
    title: 'Название',
    value: 'name'
  },
  { key: 'createdYear', title: 'Год основания', sortable: true, value: 'createdYear' }
]

const mapVdataTableToQuery = (options: Options): CompaniesQueryDto => {
//   todo: implement
}

const setQueryParams = (payload: any) => {
  const { sortBy, page, itemsPerPage, search } = payload
  tableFilters.value = payload
  const newQuery: CompaniesQueryDto = {}
  if (sortBy.length) {
    newQuery.sortBy = sortBy[0].key
    newQuery.sortDirection = sortBy[0].order
  }
  if (route.query.page || page !== DEFAULT_COMPANIES_PAGE) {
    newQuery.page = page
  }
  if (itemsPerPage !== DEFAULT_COMPANIES_LIMIT) {
    newQuery.limit = itemsPerPage
  }

  if (search && search !== ''){
    newQuery.search = search
  }
  // todo: make it "clearable"
  newQuery.yearFrom = yearFrom.value //fixme: we are using component dependency in browser layer
  newQuery.yearTo = yearTo.value
  router.push({ query: { ...newQuery } })
}
</script>
