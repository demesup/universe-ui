<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useUserStore } from '/@src/stores/users'

import { useI18n } from 'vue-i18n'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('users.editTitle')

const user = useUserStore()
const route = useRoute()
const { t } = useI18n()

useHead({
  title: t('users.editTitle'),
})

await user.setEditUserFormData(route.params.id)
</script>

<template>
  <div class="page-content-inner">
    <UserForm />
  </div>
</template>
