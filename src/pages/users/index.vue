<script setup lang="ts">

import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useI18n } from 'vue-i18n'

const viewWrapper = useViewWrapper()
const { t } = useI18n()
viewWrapper.setPageTitle('users.title')

useHead({
  title: t('users.title'),
})
</script>

<template>
  <UserList />
</template>

