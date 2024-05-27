import { useApi } from '../composable/useApi'
import { Student } from '@src/api/students'

export interface Group {
  id: number | null
  year: any
  code: string | null
  head: Student | null
  advisor: any
}

export interface GroupDetails {
  id: number | null
  year: any
  code: string | null
  head: Student | null
  advisor: any
  students: Student[] | null
}

interface GroupResponse {
  data: Group[]
}

export const fetchGroups = async (): Promise<Group[]> => {
  const api = useApi()
  const response: GroupResponse = await api.get('/groups')
  return response.data
}

export const fetchGroup = async (id: number): Promise<Group> => {
  const api = useApi()
  const response: Group = await api.get(`/groups/${id}`)
  console.log(response.data)
  return response
}

export const deleteGroup = async (id: number): Promise<any> => {
  const api = useApi()
  try {
    const response: any = await api.delete(`/groups/${id}`)
    return response.data
  } catch (error: any) {
    return error.response.data.message
  }
}

export const createGroup = async (group: Group): Promise<any> => {
  const api = useApi()
  try {
    const response: any = await api.post(`/groups`, group)
    return response.data
  } catch (error: any) {
    return error.response.data.message
  }
}

export const updateGroup = async (group: Group): Promise<any> => {
  const api = useApi()
  try {
    const response: any = await api.put(`/groups/${group.id}`, group)
    return response.data
  } catch (error: any) {
    return error.response.data.message
  }
}
