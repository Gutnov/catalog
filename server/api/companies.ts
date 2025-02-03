import { Company } from '~/server/models/company'

export default defineEventHandler(async () => {
  const rows = await Company.findAll({ attributes: ['id', 'name'] })
  return rows.map(row => ({ id: row.id, name: row.name }))
})
