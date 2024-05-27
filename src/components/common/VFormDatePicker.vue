<script setup lang="ts">
export interface VFormInputProps {
  name: string
  placeholder: string
}

const props = withDefaults(defineProps<VFormInputProps>(), {
  name: '',
  placeholder: '',
})
</script>

<template>
  <VField :id="props.name" v-slot="{ field }">
    <VControl icon="feather:calendar">
      <ClientOnly>
        <VDatePicker
          :model-value="field?.value"
          color="green"
          trim-weeks
          @update:model-value="field?.handleChange"
        >
          <template #default="{ inputValue, inputEvents }">
            <input
              class="input"
              type="text"
              :value="inputValue"
              :placeholder="props.placeholder"
              v-on="inputEvents"
            />
            <p v-if="field?.errorMessage" class="help is-danger">
              {{ field.errorMessage }}
            </p>
          </template>
        </VDatePicker>
      </ClientOnly>
    </VControl>
  </VField>
</template>
