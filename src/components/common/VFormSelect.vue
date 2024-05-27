<script setup lang="ts">
import { useI18n } from 'vue-i18n'

export interface VFormInputOption {
  value: string
  name: string
}

export interface VFormSelectProps {
  options: VFormInputOption[]
  name: string
  label: string
}

const { t } = useI18n()

const props = withDefaults(defineProps<VFormSelectProps>(), {
  type: 'text',
  name: '',
  label: '',
})
</script>

<template>
  <VField :id="props.name" v-slot="{ field }" :label="t(props.label)">
    <VControl>
      <VSelect>
        <VOption
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
          >
          {{ option.name }}
          </VOption>
      </VSelect>
      <p v-if="field?.errorMessage" class="help is-danger">
        {{ field.errorMessage }}
      </p>
    </VControl>
  </VField>
</template>
