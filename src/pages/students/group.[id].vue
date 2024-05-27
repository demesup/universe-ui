<script setup lang="ts">

import { useRoute } from 'vue-router'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useI18n } from 'vue-i18n'
import { useStudentStore } from '/@src/stores/students'

const viewWrapper = useViewWrapper()
const { t } = useI18n()
viewWrapper.setPageTitle('students.title')
const student = useStudentStore()
const route = useRoute()

await student.setGroupId(route.params.id)

useHead({
  title: t('students.title'),
})
</script>

<template>
  <StudentList />
</template>

