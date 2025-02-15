import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize'
import sequelize from '~/server/models/db'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number
  declare name: string
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100)
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
})
