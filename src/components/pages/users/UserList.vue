<script setup lang="ts">
import { useUserStore } from '/@src/stores/users'
import { useNotyf } from '/@src/composable/useNotyf'
import { type User } from '/@src/api/users'
import { type UserData } from '/@types/UserData'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const user = useUserStore()
const router = useRouter()
const notif = useNotyf()

onMounted(async () => {
  try {
    await user.loadUsers()
  }
  catch (e: any) {
    notif.error({ message: e, duration: 5000 })
  }
  if (user.error) {
    notif.error({ message: user.error, duration: 5000 })
  }
})

const dataForTable = computed(() => {
  if (user.users) {
    const mappedUsers = user.users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: `${user.firstName} ${user.lastName}`,
        role: user.authorities,
      }
    })

    return {
      data: mappedUsers,
    }
  }
})

const getRole = (role: string) => {
  const roleMap: any = {
    ROLE_ADMIN: {
      color: 'primary',
      name: 'staff',
    },
    ROLE_ROOT: {
      color: 'primary',
      name: 'staff',
    },
    ROLE_USER: {
      color: 'info',
      name: 'user',
    },
    ROLE_STUDENT: {
      color: 'success',
      name: 'student',
    },
  }

  return roleMap[role]
}

const editUser = (row: User) => {
  router.push(`/users/edit/${row.id}`)
}

const deleteUser = (row: UserData) => {
  user.openDeleteConfirmation(row)
}
</script>

<template>
  <div class="page-content-inner">
    <VLoader
      size="large"
      :active="user.loading"
      :translucent="true"
    >
      <div class="users-table">
        <VFlexTableWrapper
          :data="dataForTable?.data"
          :columns="{
            name: {
              label: t('users.table.name'),
              sortable: true,
              searchable: true,
              grow: true,
            },
            phone: {
              label: t('users.table.phone'),
              sortable: true,
              searchable: true,
              grow: true,
            },
            email: {
              label: t('users.table.email'),
              sortable: true,
              searchable: true,
              grow: true,
            },
            role: {
              label: t('users.table.role'),
              sortable: true,
              searchable: true,
            },
            actions: {
              label: t('action.actions'),
              align: 'end',
            },
          }"
        >
          <template #default="wrapperState">
            <div class="list-flex-toolbar flex-list-v1">
              <VField>
                <VControl icon="feather:search">
                  <input
                    v-model="wrapperState.searchInput"
                    type="text"
                    class="input is-rounded"
                    :placeholder="t('table.search')"
                  >
                </VControl>
              </VField>

              <VButtons>
                <RouterLink v-slot="{ navigate }" to="/users/create">
                  <VButton
                    color="primary"
                    icon="fas fa-plus"
                    raised
                    role="link"
                    @click="navigate"
                  >
                    {{ t('users.createTitle') }}
                  </VButton>
                </RouterLink>
              </VButtons>
            </div>

            <VFlexTable rounded>
              <template #body-cell="{ row, column }">
                <template v-if="column.key === 'role'">
                  <VTag :color="getRole(row.role).color" rounded>
                    {{ getRole(row.role).name }}
                  </VTag>
                </template>

                <template v-if="column.key === 'actions'">
                  <VButtons>
                    <VIconButton icon="feather:edit" @click="editUser(row)" />
                    <VIconButton icon="feather:trash" @click="deleteUser(row)" />
                  </VButtons>
                </template>
              </template>
            </VFlexTable>

            <VFlexPagination
              v-model:current-page="wrapperState.page"
              class="mt-6"
              :item-per-page="wrapperState.limit"
              :total-items="wrapperState.total"
              :max-links-displayed="5"
              no-router
            />
          </template>
        </VFlexTableWrapper>
      </div>
    </VLoader>
    <DeleteModal
      :open="user.deleteConfirmationOpen"
      :title="user.user?.name"
      @close="user.closeDeleteConfirmation"
      @remove="user.remove"
    />
  </div>
</template>
<style lang="scss">
.is-dark .users-table .search-results {
  background: none;
}

.has-top-nav {
  .flex-list-wrapper,
  .list-flex-toolbar {
    max-width: 880px;
    margin-inline-end: auto;
    margin-inline-start: auto;
  }
}
</style>
