import { User } from '../models/users'

export const getUsers = async () => {
  const mUsers =  await User.findAll()
  return  mUsers.map(u=>({ id: u.id, name: u.name }))
}