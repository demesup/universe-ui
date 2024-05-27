import { useApi } from '../composable/useApi'

export interface User {
  id: number | null
  firstName: string | null
  lastName: string | null
  phone: string | null
  email: string | null
  authorities: string | null
}

interface response {
  data: User[]
}

export const fetchUsers = async (): Promise<User[]> => {
  const api = useApi()
  const response: response = await api.get('/users')
  return response.data
}

export const fetchUser = async (id: number): Promise<any> => {
  const api = useApi()
  const response: response = await api.get(`/users/${id}`)
  return response.data
}

export const deleteUser = async (id: number): Promise<any> => {
  const api = useApi()
  try {
    const response: response = await api.delete(`/users/${id}`)
    return response.data
  } catch (error: any) {
    return error.response.data.message
  }
}

export const createUser = async (user: User): Promise<any> => {
  const api = useApi()
  try {
    const response: response = await api.post(`/users`, user)
    return response.data
  } catch (error: any) {
    return error.response.data.message
  }
}

export const editUser = async (user: User): Promise<any> => {
  const api = useApi()
  try {
    const response: response = await api.put(`/users/${user.id}`, user)
    return response.data
  } catch (error: any) {
    return error.response.data.message
  }
}
