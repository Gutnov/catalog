<template>
  <div class="companies-table">
    <VDataTableServer
      v-model:items-per-page="itemsPerPage"
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
import { type ICompany } from '@/types'

defineProps<({
  list: Array<ICompany>
  count: number,
  loading: boolean
})>()

const router = useRouter()
const route = useRoute()

const itemsPerPage = ref(5)

const headers = [
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

const loadItems = ({ page, itemsPerPage, sortBy }: { page: number, itemsPerPage: number, sortBy: Array<{ key: string, order: string }> }) => {
  router.push({ query: { ...route.query, page, limit: itemsPerPage } })
  if (sortBy.length) {
    router.push({ query: { ...route.query, sort: sortBy[0].key, order: sortBy[0].order } })
  }
}

</script>
