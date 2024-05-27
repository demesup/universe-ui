import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchGroups, fetchGroup, deleteGroup, createGroup, type GroupDetails, updateGroup, type Group } from '../api/groups'

export const useGroupStore = defineStore('group', () => {
  const groups = ref<Group[]>([])
  const group = ref<Group | null>(null)
  const groupFormData = ref<Group | null>(null)
  const loading = ref(false)
  const error = ref('')
  const deleteConfirmationOpen = ref(false)

  async function loadGroups() {
    if (loading.value) return
    loading.value = true
    try {
      groups.value = await fetchGroups()
    }
    catch (err: any) {
      error.value = err.message || 'Failed to fetch groups'
    }
    finally {
      loading.value = false
    }
  }

  async function openDeleteConfirmation(selected: Group) {
    deleteConfirmationOpen.value = true
    group.value = selected
  }

  async function closeDeleteConfirmation() {
    deleteConfirmationOpen.value = false
  }

  async function remove() {
    deleteConfirmationOpen.value = false
    if (group.value) {
      await deleteGroup(group.value.id!)
      await loadGroups()
    }
  }

  async function setEditGroupFormData(id: number) {
    if (loading.value) return
    loading.value = true
    try {
      groupFormData.value = await fetchGroup(id)
    }
    catch (er: any) {
      error.value = er.message || 'Failed to fetch group'
    }
    finally {
      loading.value = false
    }
  }

  function setCreateGroupFormData() {
    groupFormData.value = {
      id: null,
      year: null,
      code: '',
      head: null,
      advisor: null,
      students: [],
    }
  }

  async function save(group: Group) {
    loading.value = true
    let updatedGroup
    if (group.id !== null) {
      updatedGroup = await updateGroup(group)
    }
    else {
      updatedGroup = await createGroup(group)
    }
    loading.value = false
    await loadGroups()
    return updatedGroup
  }

  return {
    groups,
    group,
    loadGroups,
    save,
    deleteConfirmationOpen,
    closeDeleteConfirmation,
    remove,
    openDeleteConfirmation,
    setCreateGroupFormData,
    setEditGroupFormData,
    groupFormData,
    loading,
    error,
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
}
