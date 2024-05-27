<script setup lang="ts">
import { useStudentStore } from '/@src/stores/students'
import { useNotyf } from '/@src/composable/useNotyf'
import { type StudentDetails, type Student } from '/@src/api/students'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const student = useStudentStore()
const router = useRouter()
const notif = useNotyf()

onMounted(async () => {
  try {
    await student.loadStudents()
  }
  catch (e: any) {
    notif.error({ message: e, duration: 5000 })
  }
  if (student.error) {
    notif.error({ message: student.error, duration: 5000 })
  }
})

const dataForTable = computed(() => {
  if (student.students) {
    const mappedStudents = student.students.map((student) => {
      return {
        id: student.id,
        email: student.email,
        uniEmail: student.uniEmail,
        phone: student.phone,
        name: `${student.firstName} ${student.lastName}`,
        groupId: student.group.id,
        group: `${student.group.code}`,
      }
    })

    return {
      data: mappedStudents,
    }
  }
})

const editStudent = (row: Student) => {
  router.push(`/students/edit/${row.id}`)
}

const deleteStudent = (row: Student) => {
  student.openDeleteConfirmation(row)
}
</script>

<template>
  <div class="page-content-inner">
    <VLoader
      size="large"
      :active="student.loading"
      :translucent="true"
    >
      <div class="students-table">
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
            uniEmail: {
              label: t('students.table.email'),
              sortable: true,
              searchable: true,
              grow: true,
            },
            group: {
              label: t('students.table.group'),
              sortable: true,
              searchable: true,
              grow: true,
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
                <RouterLink v-slot="{ navigate }" to="/students/create">
                  <VButton
                    color="primary"
                    icon="fas fa-plus"
                    raised
                    role="link"
                    @click="navigate"
                  >
                    {{ t('students.createTitle') }}
                  </VButton>
                </RouterLink>
              </VButtons>
            </div>

            <VFlexTable rounded>
              <template #body-cell="{ row, column }">
                <template v-if="column.key === 'actions'">
                  <VButtons>
                    <VIconButton icon="feather:edit" @click="editStudent(row)" />
                    <VIconButton icon="feather:trash" @click="deleteStudent(row)" />
                  </VButtons>
                </template>

                <template v-if="column.key === 'group'">
                  <RouterLink
                    v-tooltip.rounded="`${t('timetable.tooltips.viewGroup')}`"
                    class="student-link"
                    :to="`/timetable/${row.groupId}`"
                  >
                    <span>{{ row.group }}</span>
                  </RouterLink>
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
      :open="student.deleteConfirmationOpen"
      :title="student.student?.name"
      @close="student.closeDeleteConfirmation"
      @remove="student.remove"
    />
  </div>
</template>
<style lang="scss">
.is-dark .students-table .search-results {
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
