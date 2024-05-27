<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useStudentStore } from '/@src/stores/students'

import { useI18n } from 'vue-i18n'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('students.editTitle')

const student = useStudentStore()
const route = useRoute()
const { t } = useI18n()

useHead({
  title: t('students.editTitle'),
})

await student.setEditStudentFormData(route.params.id)
</script>

<template>
  <div class="page-content-inner">
    <StudentForm />
  </div>
</template>
