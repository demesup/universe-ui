import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { type UserData } from '/@types/UserData'
import {
  fetchUsers,
  deleteUser,
  type User,
  createUser,
  editUser,
  fetchUser,
} from '/@src/api/users'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const user = ref<UserData>()
  const userFormData = ref<User>()
  const loading = ref(false)
  const error = ref('')
  const deleteConfirmationOpen = ref(false)

  async function loadUsers() {
    if (loading.value) return
    loading.value = true
    try {
      users.value = await fetchUsers()
    } catch (err: any) {
      error.value = err as string
    } finally {
      loading.value = false
    }
  }

  async function openDeleteConfirmation(selected: UserData) {
    deleteConfirmationOpen.value = true
    user.value = selected
  }

  async function closeDeleteConfirmation() {
    deleteConfirmationOpen.value = false
  }

  async function remove() {
    deleteConfirmationOpen.value = false
    if (user.value) {
      await deleteUser(user.value.id)
      await loadUsers()
    }
  }

  async function setEditUserFormData(id: number) {
    if (loading.value) return
    loading.value = true
    try {
      userFormData.value = await fetchUser(id)
    } catch (er: any) {
      error.value = er as string
    } finally {
      loading.value = false
    }
  }

  function setCreateUserFormData() {
    userFormData.value = {
      id: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null,
      authorities: null,
    }
  }

  async function save(user: User) {
    loading.value = true
    let updatedUser
    if (user.id !== null) {
      updatedUser = await editUser(user)
    } else {
      updatedUser = await createUser(user)
    }
    loading.value = false
    return updatedUser
  }

  return {
    users,
    user,
    loadUsers,
    save,
    deleteConfirmationOpen,
    closeDeleteConfirmation,
    remove,
    openDeleteConfirmation,
    setCreateUserFormData,
    setEditUserFormData,
    userFormData,
    loading,
    error,
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
