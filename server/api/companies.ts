import { Company } from '~/server/models/company'
import { type ICompany } from '@/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const offset = (page - 1) * limit 

  const { rows, count } = await Company.findAndCountAll({
    attributes: ['id', 'name', 'createdYear'],
    limit,
    offset
  })

  return {
    data: rows.map(row => ({ id: row.id, name: row.name, createdYear: row.createdYear })) as ICompany[],
    pagination: {
      listLength: rows.length,
      count
    }
  }
})