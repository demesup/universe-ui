import { useApi } from '../composable/useApi'
import { Group } from './groups'

export interface Student {
  id: number | null
  firstName: string | null
  lastName: string | null
  email: string | null
  uniEmail: string | null
  phone: string | null
}

export interface StudentRequest {
  id: number | null
  firstName: string | null
  lastName: string | null
  email: string | null
  uniEmail: string | null
  phone: string | null
  groupId: number | null
}

export interface StudentDetails {
  id: number | null
  firstName: string | null
  lastName: string | null
  email: string | null
  uniEmail: string | null
  phone: string | null
  group: Group | null
}

interface StudentDetailsResponse {
  data: StudentDetails[]
}

export const fetchStudents = async (): Promise<StudentDetails[]> => {
  const api = useApi()
  const response: StudentDetailsResponse = await api.get('/students')
  console.log(response.data)
  return response.data
}

export const fetchStudentsByYear = async (id: number): Promise<StudentDetails[]> => {
  const api = useApi()
  const response: StudentDetailsResponse = await api.get(`/students/year/${id}`)
  console.log(response.data)
  return response.data
}

export const fetchStudentsByGroup = async (id: number): Promise<StudentDetails[]> => {
  const api = useApi()
  const response: StudentDetailsResponse = await api.get(`/students/group/${id}`)
  console.log(response.data)
  return response.data
}

export const fetchStudent = async (id: number): Promise<StudentDetails> => {
  const api = useApi()
  const response: StudentDetailsResponse = await api.get(`/students/${id}`)
  console.log(response.data)
  return response.data
}

export const deleteStudent = async (id: number): Promise<any> => {
  const api = useApi()
  try {
    const response: any = await api.delete(`/students/${id}`)
    return response.data
  }
  catch (error: any) {
    return error.response.data.message
  }
}

export const createStudent = async (student: StudentRequest): Promise<any> => {
  const api = useApi()
  try {
    console.log(student)
    const response: any = await api.post(`/students`, student)
    return response.data
  }
  catch (error: any) {
    return error.response.data.message
  }
}

export const updateStudent = async (student: StudentRequest): Promise<any> => {
  const api = useApi()
  try {
    const response: any = await api.put(`/students/${student.id}`, student)
    return response.data
  }
  catch (error: any) {
    return error.response.data.message
  }
}
