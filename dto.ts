import type { InferAttributes } from 'sequelize'
import type { Company } from '~/server/models/company'

export type CompanyDto =  InferAttributes<Company>
export const SortDirections = ['asc', 'desc'] as const

export type CompaniesQueryDto = {
    sortBy?: keyof CompanyDto;
    sortDirection?: typeof SortDirections[number];
    page?: number;
    limit?: number;
    search?: string;
    yearFrom?: number;
    yearTo?: number;
}
