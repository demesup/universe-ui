<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useTimetableStore } from '/@src/stores/timetables'

import { useI18n } from 'vue-i18n'
import Timetable from '/@src/components/pages/Timetable.vue'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('timetable.groupTitle')

const timetable = useTimetableStore()
const route = useRoute()
const { t } = useI18n()

useHead({
  title: t('timetable.groupTitle'),
})

await timetable.setGroupId(route.params.id)
</script>

<template>
  <Timetable />
</template>
