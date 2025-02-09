<template>
  <div class="companies-table">
    <VDataTableServer
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :items-per-page-options="[DEFAULT_COMPANIES_LIMIT, 10, 25, 50, 100]"
      :headers="headers"
      :items="list"
      :items-length="count"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
    />
  </div>
</template>

<script lang="ts" setup>
import type { VDataTableServer } from 'vuetify/components/VDataTable'
import { type ICompany, type CompaniesQuery } from '@/dto'

import {
  DEFAULT_COMPANIES_LIMIT,
  DEFAULT_COMPANIES_PAGE
} from '~/settings'

type Options = InstanceType<typeof VDataTableServer>['$options']

defineProps<({
  list: Array<ICompany>
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

const loadItems = ({ page, itemsPerPage, sortBy }: Options) => {
  const newQuery: CompaniesQuery = {}
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
  router.push({ query: { ...newQuery } })
}
</script>
