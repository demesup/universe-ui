<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Field } from 'vee-validate'

const emits = defineEmits(['change'])

const { t } = useI18n()

interface AutocompleteItem {
  value: number
  label: string
}

interface AutocompleteProps {
  name: string
  items: AutocompleteItem[]
  icon: string
  placeholder: string
}

const props = withDefaults(defineProps<AutocompleteProps>(), {
  name: '',
  items: undefined,
  icon: '',
  placeholder: '',
})
</script>

<template>
    <VField :id="props.name" :name="props.name" class="is-autocomplete-select"  v-slot="{ field }">
      <VControl :has-error="Boolean(field.errorMessage)" :icon="props.icon">
        <Multiselect
          :attrs="{ name }"
          :options="props.items"
          :placeholder="t(props.placeholder)"
          :searchable="true"
          v-model="field.value"
          @input="emits('change')"
        />
        <p v-if="field?.errorMessage" class="help is-danger">
          {{ field.errorMessage }}
        </p>
      </VControl>
    </VField>
</template>

<style lang="scss">
.is-dark .multiselect .multiselect-clear {
  background: none;
}

.multiselect-dropdown {
  white-space: pre-line;
}
</style>
