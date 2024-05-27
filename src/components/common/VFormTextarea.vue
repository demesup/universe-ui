<script setup lang="ts">
import { useI18n } from 'vue-i18n'

export interface VFormInputProps {
  rows?: number
  name: string
  placeholder: string
}

const { t } = useI18n()

const props = withDefaults(defineProps<VFormInputProps>(), {
  rows: 2,
  name: '',
  placeholder: '',
})
</script>

<template>
  <VField :id="props.name" v-slot="{ field }">
    <VControl>
      <VTextarea :placeholder="t(props.placeholder)" :rows="props.rows" />
      <p v-if="field?.errorMessage" class="help is-danger">
        {{ field.errorMessage }}
      </p>
    </VControl>
  </VField>
</template>
