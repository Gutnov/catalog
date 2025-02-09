import { Model, DataTypes } from 'sequelize'
import sequelize from '~/server/models/db'
import {type ICompany} from '@/types'

export class Company extends Model<ICompany> {
  declare id: number
  declare name: string
  declare createdYear: number
}

Company.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100)
  },
  createdYear: {
    type: DataTypes.INTEGER,
    defaultValue: 2025,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'companies',
  timestamps: true
})
