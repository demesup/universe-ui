<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { useUserStore } from '/@src/stores/users'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
const { t } = useI18n()
const user = useUserStore()

viewWrapper.setPageTitle('users.createTitle')

useHead({
  title: t('users.createTitle'),
})

await user.setCreateUserFormData()
</script>

<template>
  <div class="page-content-inner">
    <UserForm />
  </div>
</template>
