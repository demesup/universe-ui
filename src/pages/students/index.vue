<script setup lang="ts">

import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useI18n } from 'vue-i18n'

const viewWrapper = useViewWrapper()
const { t } = useI18n()
viewWrapper.setPageTitle('students.title')

useHead({
  title: t('students.title'),
})
</script>

<template>
  <StudentList />
</template>

