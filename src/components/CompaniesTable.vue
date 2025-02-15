<template>
  <div class="companies-table">
    <div class="grid gap-2 grid-cols-2 companies-table__filters mb-5">
      <VSelect
        v-model="yearFrom"
        :items="filteredYearsFrom"
        label="Год от"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        :clearable="yearFrom !== DEFAULT_MIN_YEAR_VALUE"
      />
      <VSelect
        v-model="yearTo"
        :items="filteredYearsTo"
        label="Год до"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        :clearable="yearTo !== DEFAULT_MIN_YEAR_VALUE"
        on-clear-year="onClearYear"
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
      @update:options="updateTableOptions"
    >
      <template #top>
        <VTextField
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          clear-icon="mdi-close-circle"
          clearable
          @click:clear="clearSearch"
        />
      </template>
    </VDataTableServer>
    <CreateCompany />
  </div>
</template>

<script lang="ts" setup>
import type { VDataTableServer } from 'vuetify/components/VDataTable'
import { type CompanyDto, type CompaniesQueryDto } from '@/dto'
import { type YearFitlter } from '@/dto'
import { debounce } from '@/helpers'

import {
  DEFAULT_COMPANIES_LIMIT,
  DEFAULT_COMPANIES_PAGE,
  DEFAULT_MIN_YEAR_VALUE
} from '@/settings'

const props = defineProps<({
  list: Array<CompanyDto>
  count: number,
  loading: boolean,
  yearFilter: YearFitlter[]
})>()
type Options = InstanceType<typeof VDataTableServer>['$options']
const search = ref('')
const tableFilters = ref<CompaniesQueryDto>({})


const yearFrom = ref<number>(DEFAULT_MIN_YEAR_VALUE)
const yearTo = ref<number>(DEFAULT_MIN_YEAR_VALUE)

watch(yearFrom, async (val) => {
  if (val === null) {
    yearFrom.value = DEFAULT_MIN_YEAR_VALUE
  }
  await setQueryParams({ ...tableFilters.value, yearFrom: yearFrom.value, yearTo: yearTo.value, search: search.value })
})

watch(yearTo, async (val) => {
  if (val === null) {
    yearTo.value = DEFAULT_MIN_YEAR_VALUE
  }

  await setQueryParams(getAllQueryOptions())
})

watch(search, () => {
  debouncedSetQueryParams(getAllQueryOptions())
})


const debouncedSetQueryParams = debounce((payload) => {
  setQueryParams(payload)
}, 500)


const filteredYearsTo = computed(() => {
  if (!Array.isArray(props.yearFilter)) {
    return []
  }

  if (yearFrom.value === DEFAULT_MIN_YEAR_VALUE) {
    return props.yearFilter
  }
  return props.yearFilter.filter(year => year.value === DEFAULT_MIN_YEAR_VALUE || year.value >= yearFrom.value)
})
const filteredYearsFrom = computed(() => {
  if (!Array.isArray(props.yearFilter)) {
    return []
  }

  if (yearTo.value === DEFAULT_MIN_YEAR_VALUE) {
    return props.yearFilter
  }
  return props.yearFilter.filter(year => year.value === DEFAULT_MIN_YEAR_VALUE || year.value <= yearTo.value)
})

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

const clearSearch = () => {
  search.value = ''
}

const mapVdataTableToQuery = (options: Options): CompaniesQueryDto => {
  const { sortBy, page, itemsPerPage } = options

  const res: CompaniesQueryDto = {
    limit: itemsPerPage,
    page,
    sortBy
  }

  if (sortBy && sortBy.length) {
    res.sortBy = sortBy[0].key
    res.sortDirection = sortBy[0].order
  }

  return res
}

const updateTableOptions = (options: Options) => {
  const mappedParamsFromTable = mapVdataTableToQuery(options)
  tableFilters.value = mappedParamsFromTable
  setQueryParams()
}

const getAllQueryOptions = (): CompaniesQueryDto => {
  return {
    ...tableFilters.value,
    search: search.value,
    yearFrom: yearFrom.value,
    yearTo: yearTo.value
  }
}

const setQueryParams = () => {
  const { sortBy, page, search, sortDirection, limit, yearFrom, yearTo } = getAllQueryOptions()

  const newQuery: CompaniesQueryDto = {}
  if (sortBy) {
    newQuery.sortBy = sortBy
  }
  if (sortDirection) {
    newQuery.sortDirection = sortDirection
  }
  if (route.query.page || page !== DEFAULT_COMPANIES_PAGE) {
    newQuery.page = page
  }
  if (limit && limit !== DEFAULT_COMPANIES_LIMIT) {
    newQuery.limit = limit
  }

  if (search && search !== ''){
    newQuery.search = search
  }
  
  if (yearFrom && yearFrom !== DEFAULT_MIN_YEAR_VALUE) {
    newQuery.yearFrom = yearFrom
  }

  if (yearTo && yearTo !== DEFAULT_MIN_YEAR_VALUE) {
    newQuery.yearTo = yearTo
  }
  router.push({ query: { ...newQuery } })
}
</script>
