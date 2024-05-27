import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchStudents, fetchStudent, deleteStudent, createStudent, updateStudent, type Student, type StudentDetails, type StudentRequest, fetchStudentsByYear, fetchStudentsByGroup } from '../api/students'
import { E } from 'unplugin-vue-router/dist/options-8dbadba3'

export const useStudentStore = defineStore('student', () => {
  const students = ref<StudentDetails[]>([])
  const groupId = ref<number | null>(null)
  const yearId = ref<number | null>(null)
  const student = ref<Student | null>(null)
  const studentFormData = ref<StudentRequest | null>(null)
  const loading = ref(false)
  const error = ref('')
  const deleteConfirmationOpen = ref(false)

  async function loadStudents() {
    if (loading.value) return
    loading.value = true
    try {
      if (groupId.value) {
        console.log(groupId.value)
        students.value = await fetchStudentsByGroup(groupId.value)
      }
      else if (yearId.value) {
        console.log(yearId.value)
        students.value = await fetchStudentsByYear(yearId.value)
      }
      else { students.value = await fetchStudents() }
      console.log(students.value)
    }
    catch (err: any) {
      error.value = err.message || 'Failed to fetch students'
    }
    finally {
      loading.value = false
    }
  }

  async function openDeleteConfirmation(selected: Student) {
    deleteConfirmationOpen.value = true
    student.value = selected
  }

  async function closeDeleteConfirmation() {
    deleteConfirmationOpen.value = false
  }

  async function remove() {
    deleteConfirmationOpen.value = false
    if (student.value) {
      await deleteStudent(student.value.id!)
      await loadStudents()
    }
  }

  async function setEditStudentFormData(id: number) {
    if (loading.value) return
    loading.value = true
    try {
      studentFormData.value = await fetchStudent(id)
    }
    catch (er: any) {
      error.value = er.message || 'Failed to fetch student'
    }
    finally {
      loading.value = false
    }
  }

  function setCreateStudentFormData() {
    studentFormData.value = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      uniEmail: '',
      phone: '',
    }
  }

  function setGroupId(id: number) {
    groupId.value = id
  }
  function setYearId(id: number) {
    yearId.value = id
  }

  async function save(student: StudentRequest) {
    console.log(student.id)
    loading.value = true
    let updatedStudent
    if (student.id !== null) {
      updatedStudent = await updateStudent(student)
    }
    else {
      updatedStudent = await createStudent(student)
    }
    loading.value = false
    await loadStudents()
    return updatedStudent
  }

  return {
    students,
    student,
    loadStudents,
    save,
    deleteConfirmationOpen,
    closeDeleteConfirmation,
    remove,
    openDeleteConfirmation,
    setCreateStudentFormData,
    setEditStudentFormData,
    studentFormData,
    loading,
    setGroupId,
    setYearId,
    error,
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStudentStore, import.meta.hot))
}
