import { Company } from '~/server/models/company'
import sequelize from '~/server/models/db'
import { User } from '~/server/models/users'


const runDbSync = async () => {
  const registeredModels = [Company, User]
  console.warn('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
  await sequelize.sync({ alter: true })
  console.warn('...done syncing DB schema')
}

await runDbSync()
