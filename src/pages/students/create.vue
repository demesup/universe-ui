<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { useStudentStore } from '/@src/stores/students'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
const { t } = useI18n()
const student = useStudentStore()

viewWrapper.setPageTitle('students.createTitle')

useHead({
  title: t('students.createTitle'),
})

await student.setCreateStudentFormData()
</script>

<template>
  <div class="page-content-inner">
    <StudentForm />
  </div>
</template>
