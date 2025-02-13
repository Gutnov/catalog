import type { InferAttributes, WhereOptions } from 'sequelize'
import type { Company } from '~/server/models/company'

export type ICompany =  InferAttributes<Company>
export type CompanyWhere = WhereOptions<ICompany>
export const SortDirections = ['asc', 'desc'] as const

export type CompaniesQuery = {
    sortBy?: keyof ICompany;
    sortDirection?: typeof SortDirections[number];
    page?: number;
    limit?: number;
    where?: CompanyWhere;
}
