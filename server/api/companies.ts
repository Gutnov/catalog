import { Company } from '~/server/models/company'
import { CompaniesQueryDto, type CompanyDto, SortDirections } from '@/dto'
import { Op, WhereOptions } from 'sequelize'
import {
  DEFAULT_COMPANIES_LIMIT,
  DEFAULT_COMPANIES_PAGE,
  DEFAULT_COMPANIES_SORT_COLUMN,
  DEFAULT_COMPANIES_SORT_DIRECTION, MAX_COMPANIES_LIMIT
  // DEFAULT_MIN_YEAR
} from '~/settings'
import { QueryObject } from 'ufo'

type CompanyDbQuery = Required<Pick<CompaniesQueryDto, 'limit'|'page'|'sortBy'|'sortDirection'>>
    & {where: WhereOptions<Company>}

const cleanQuery = (query: QueryObject): CompanyDbQuery => {
  const page = query.page && !isNaN(Number(query.page))
    ? Number(query.page)
    : DEFAULT_COMPANIES_PAGE
  const yearFrom = query.yearFrom && !isNaN(Number(query.yearFrom))
    ? Number(query.yearFrom)
    : undefined
  const yearTo = query.yearTo && !isNaN(Number(query.yearTo))
    ? Number(query.yearTo)
    : undefined
  if (yearFrom && yearTo && yearFrom > yearTo){
    throw new Error(`Invalid year query. yearFrom '${yearFrom}' is greater than '${yearTo}'` )
  }

  let where : WhereOptions<Company> = {}
  if (yearFrom && yearTo) {
    where = { ...where, createdYear: {
      [Op.and]: [
        { [Op.gte]: yearFrom },
        { [Op.lte]: yearTo }
      ]
    }
    }
  } else if (yearFrom) {
    where = { ...where, createdYear: { [Op.gte]: yearFrom } }
  } else if (yearTo) {
    where = { ...where, createdYear: { [Op.lte]: yearTo } }
  }

  // const where: WhereOptions<Company> = {
  //   createdYear: {
  //     ...(yearFrom && { [Op.gt]: yearFrom }),
  //     ...(yearTo && { [Op.lt]: yearTo })
  //   }
  // }

  const search = query.search && typeof query.search === 'string'
    ? query.search
    : null

  if (search) {
    where.name = { [Op.substring]: search }
  }

  const limit = query.limit && !isNaN(Number(query.limit))
    ? Number(query.limit) > 0 && Number(query.limit) <= MAX_COMPANIES_LIMIT
      ? Number(query.limit)
      : DEFAULT_COMPANIES_LIMIT
    : DEFAULT_COMPANIES_LIMIT

  const isCompanyField = (key: unknown): key is keyof CompanyDto => {
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

export default defineEventHandler(async (event): Promise<{companies: CompanyDto[], totalCount: number}> => {
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
    companies: rows.map(row => ({ id: row.id, name: row.name, createdYear: row.createdYear })) as CompanyDto[],
    totalCount: count
  }
})
