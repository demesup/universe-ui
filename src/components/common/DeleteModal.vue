<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['close', 'remove'])

export interface DeleteModalProps {
  open?: boolean
  title: string
}

const props = withDefaults(defineProps<DeleteModalProps>(), {
  open: false,
})

const close = () => {
  emit('close')
}

const remove = () => {
  emit('remove')
}
</script>
<template>
  <VModal
    :open="props.open"
    actions="center"
    size="small"
    :title="t('remove.title')"
    @close="close"
  >
    <template #content>
      <VPlaceholderSection :title="t('remove.confirm') + title + '?'" />
    </template>
    <template #action>
      <VButton color="primary" raised @click="remove">{{ t('remove.title') }}</VButton>
    </template>
  </VModal>
</template>


