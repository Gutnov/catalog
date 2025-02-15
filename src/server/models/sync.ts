import { Company } from '@/server/models/company'
import sequelize from '@/server/models/db'


const runDbSync = async () => {
  const registeredModels = [Company]
  console.warn('Syncing DB schema for: ', registeredModels.map(m => m.name).join(', '))
  await sequelize.sync({ alter: true })
  console.warn('...done syncing DB schema')
}

await runDbSync()
