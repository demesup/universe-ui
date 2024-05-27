<script setup lang="ts">
import { useI18n } from 'vue-i18n'

export interface VFormInputProps {
  type: string
  name: string
  icon?: string
  disabled?: boolean
  placeholder: string
  min?: number
}

const { t } = useI18n()

const props = withDefaults(defineProps<VFormInputProps>(), {
  type: 'text',
  name: '',
  icon: '',
  disabled: false,
  placeholder: '',
  min: 0,
})
</script>

<template>
  <VField :id="props.name" v-slot="{ field }">
    <VControl :icon="props.icon">
      <VInput
        :type="props.type"
        :placeholder="t(props.placeholder)"
        :disabled="props.disabled"
        :min="props.min"
      />
      <p v-if="field?.errorMessage" class="help is-danger">
        {{ field.errorMessage }}
      </p>
    </VControl>
  </VField>
</template>
