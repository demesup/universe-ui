import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchTimetableStructure,
  fetchSeminars,
  fetchLabs,
  fetchCourses,
  fetchTimetableItem,
  createSeminar,
  createLab,
  createCourse
} from '/@src/api/timetables'

export const useTimetableStore = defineStore('timetable', () => {
  const timetableStructure = ref<{ timetable: Record<string, TimetableItemResponse[]> }>({ timetable: {} })
  const groupId = ref<any>()
  const seminars = ref<any>()
  const labs = ref<any>()
  const courses = ref<any>()
  const timetableItem = ref<any>()
  const loading = ref(false)
  const error = ref('')

  async function loadTimetableStructure() {
    if (loading.value) return
    loading.value = true
    try {
      timetableStructure.value = await fetchTimetableStructure(groupId.value)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function loadSeminars(groupId: number) {
    if (loading.value) return
    loading.value = true
    try {
      seminars.value = await fetchSeminars(groupId)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function loadLabs(groupId: number) {
    if (loading.value) return
    loading.value = true
    try {
      labs.value = await fetchLabs(groupId)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function loadCourses(groupId: number) {
    if (loading.value) return
    loading.value = true
    try {
      courses.value = await fetchCourses(groupId)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function loadTimetableItem(id: number) {
    if (loading.value) return
    loading.value = true
    try {
      timetableItem.value = await fetchTimetableItem(id)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function createSeminar(request: any) {
    if (loading.value) return
    loading.value = true
    try {
      await createSeminar(request)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function createLab(request: any) {
    if (loading.value) return
    loading.value = true
    try {
      await createLab(request)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function createCourse(request: any) {
    if (loading.value) return
    loading.value = true
    try {
      await createCourse(request)
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function setGroupId(id: number) {
    console.log(groupId.value)
    groupId.value = id
    console.log(groupId.value)
  }

  return {
    timetableStructure,
    seminars,
    labs,
    courses,
    timetableItem,
    loadTimetableStructure,
    loadSeminars,
    loadLabs,
    loadCourses,
    loadTimetableItem,
    createSeminar,
    createLab,
    createCourse,
    loading,
    error,
    setGroupId,
  } as const
})
