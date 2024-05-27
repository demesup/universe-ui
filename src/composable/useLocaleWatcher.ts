
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { type TypedSchema } from 'vee-validate';
import { type z as zod } from 'zod'

export const useLocaleWatcher = (generateSchema: () => TypedSchema<zod.ZodObject<any>>) => {
  const validationSchema = ref<TypedSchema<zod.ZodObject<any>>>(generateSchema());
const { locale } = useI18n();
  
  watch(locale, () => {
    validationSchema.value = generateSchema();
  });
  
  return validationSchema;
};