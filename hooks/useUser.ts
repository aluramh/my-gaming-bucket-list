import { useQuery } from 'react-query'
import { User } from '../types/schema'

let baseUrl = 'http://localhost:3000/api'

const fetchUser = async (userId: string) => {
  let res = await fetch(baseUrl + `/users/${userId}`)
  return (await res.json()) as User
}

const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(userId),
  })
}

export { useUser, fetchUser }
