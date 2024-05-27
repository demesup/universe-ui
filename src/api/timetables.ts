import { useApi } from '../composable/useApi'

export interface GroupResponse {
  id: number
  // year: YearFacultyDetailsResponse
  code: string
  // head: StudentResponse
  advisor: ProfessorResponse
}

export interface ProfessorResponse {
  id: number
  name: string
  email: string
  phone: string
  description: string
}

export interface YearResponse {
  id: number
  year: string
}

export interface ItemInfoResponse {
  type: string
}

export interface TimetableItemResponse {
  day: string
  hour: string
  duration: number
  frequency: string
  info: ItemInfoResponse
  subject: string
  description: string
  note: string
}

// export interface TimetableResponse {
  // timetable: 
// }

export const fetchTimetableStructure = async (groupId: number): Promise<any> => {
  const api = useApi()
  const response = await api.get(`/timetable/${groupId}`)
  return response.data
}

export const fetchSeminars = async (groupId: number): Promise<any> => {
  const api = useApi()
  const response = await api.get(`/timetable/seminars/${groupId}`)
  return response.data
}

export const fetchLabs = async (groupId: number): Promise<any> => {
  const api = useApi()
  const response = await api.get(`/timetable/labs/${groupId}`)
  return response.data
}

export const fetchCourses = async (groupId: number): Promise<any> => {
  const api = useApi()
  const response = await api.get(`/timetable/courses/${groupId}`)
  return response.data
}

export const fetchTimetableItem = async (id: number): Promise<any> => {
  const api = useApi()
  const response = await api.get(`/timetable/item/${id}`)
  return response.data
}

export const createSeminar = async (request: any): Promise<any> => {
  const api = useApi()
  const response = await api.post(`/timetable/seminars`, request)
  return response.data
}

export const createLab = async (request: any): Promise<any> => {
  const api = useApi()
  const response = await api.post(`/timetable/labs`, request)
  return response.data
}

export const createCourse = async (request: any): Promise<any> => {
  const api = useApi()
  const response = await api.post(`/timetable/courses`, request)
  return response.data
}
