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

const emit = defineEmits<{
  (e: 'change', payload: {page: number, limit: number}): void
}>()

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
    sortable: false,
    title: 'Название',
    value: 'name'
  },
  { key: 'createdYear', title: 'Год основания', sortable: true, value: 'createdYear' }
]

const loadItems = ({ page, itemsPerPage }) => {
  emit('change', { page, limit: itemsPerPage })
}

</script>
