import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '~/server/models/db'

export class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
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
    defaultValue: new Date().getFullYear(),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'companies',
  timestamps: true
})
