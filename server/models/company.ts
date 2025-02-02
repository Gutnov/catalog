import { Model, DataTypes } from 'sequelize'
import sequelize from '~/server/models/db'

interface ICompany {
    id: number
    name: string
}

export class Company extends Model<ICompany> {
  declare id: number
  declare name: string
}

Company.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  tableName: 'companies',
  timestamps: true
})
