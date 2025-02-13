import { Company } from '~/server/models/company'
import { CompaniesQuery, type ICompany, SortDirections } from '@/dto'
import { Op } from 'sequelize'
import {
  DEFAULT_COMPANIES_LIMIT,
  DEFAULT_COMPANIES_PAGE,
  DEFAULT_COMPANIES_SORT_COLUMN,
  DEFAULT_COMPANIES_SORT_DIRECTION, MAX_COMPANIES_LIMIT,
  DEFAULT_MIN_YEAR
} from '~/settings'
import { QueryObject } from 'ufo'

const cleanQuery = (query: QueryObject): Required<CompaniesQuery> => {
  const page = query.page && !isNaN(Number(query.page))
    ? Number(query.page)
    : DEFAULT_COMPANIES_PAGE
  let yearFrom = query.yearFrom && !isNaN(Number(query.yearFrom))
    ? Number(query.yearFrom)
    : DEFAULT_MIN_YEAR
  let yearTo = query.yearTo && !isNaN(Number(query.yearTo))
    ? Number(query.yearTo)
    : new Date().getFullYear()
  if (yearFrom > yearTo) {
    [yearFrom, yearTo] = [DEFAULT_MIN_YEAR, new Date().getFullYear()]
  }

  const where = {
    createdYear: {
      [Op.between]: [yearFrom, yearTo]
    }
  }

  const limit = query.limit && !isNaN(Number(query.limit))
    ? Number(query.limit) > 0 && Number(query.limit) <= MAX_COMPANIES_LIMIT
      ? Number(query.limit)
      : DEFAULT_COMPANIES_LIMIT
    : DEFAULT_COMPANIES_LIMIT

  const isCompanyField = (key: unknown): key is keyof ICompany => {
    if (typeof key !== 'string') {
      return false
    }
    return Object.keys(Company.getAttributes()).includes(key)
  }

  const isSortDirection = (value: unknown): value is typeof SortDirections[number] => {
    if (typeof value !== 'string') {
      return false
    }
    return SortDirections.includes(value as typeof SortDirections[number])
  }

  const sortBy = query.sortBy &&  isCompanyField(query.sortBy)
    ? query.sortBy
    : DEFAULT_COMPANIES_SORT_COLUMN

  const sortDirection = query.sortDirection && isSortDirection(query.sortDirection)
    ? query.sortDirection
    : DEFAULT_COMPANIES_SORT_DIRECTION
  return { page, limit, sortBy, sortDirection, where }
}

export default defineEventHandler(async (event): Promise<{companies: ICompany[], totalCount: number}> => {
  const rawQuery = getQuery(event)
  const query = cleanQuery(rawQuery)
  

  const { rows, count } = await Company.findAndCountAll({
    attributes: ['id', 'name', 'createdYear'],
    limit: query.limit,
    offset: (query.page - 1) * query.limit,
    order: [[query.sortBy, query.sortDirection]],
    where: query.where
  })

  return {
    companies: rows.map(row => ({ id: row.id, name: row.name, createdYear: row.createdYear })) as ICompany[],
    totalCount: count
  }
})
