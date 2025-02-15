import { Company } from '@/server/models/company'
import { YearFitlter } from '@/dto'

export default defineEventHandler(async (): Promise<YearFitlter[]> => {
  const minYear = await Company.min('createdYear')
  const maxYear = await Company.max('createdYear')

  if (!minYear || !maxYear) {
    return []
  }
  const result = Array.from({ length: Number(maxYear) - Number(minYear) + 1 }, (_, i) => {
    return {
      value: Number(minYear) + i,
      title: String(Number(minYear) + i)
    }
  })
  result.unshift({ value: -1, title: 'Не выбрано' })
  return result
})