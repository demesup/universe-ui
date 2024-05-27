<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { z as zod } from 'zod'
import { useField, useFieldArray, useForm } from 'vee-validate'
import { useGroupStore } from '/@src/stores/groups'
import { useNotyf } from '/@src/composable/useNotyf'
import { useStudentStore } from '/@src/stores/students'
import { useLocaleWatcher } from '/@src/composable/useLocaleWatcher'

const router = useRouter()
const student = useStudentStore()
const group = useGroupStore()
const { y } = useWindowScroll()
const { t } = useI18n()
const notif = useNotyf()

group.loadGroups()

const groups = computed(() => {
  if (group.groups) {
    return group.groups.map((group) => {
      return {
        label: `${group.code}`,
        value: group.id,
      }
    })
  }
})

const isStuck = computed(() => {
  return y.value > 30
})

const pageTitle = computed(() => {
  console.log(student.studentFormData?.id)
  if (student.studentFormData?.id) {
    return t('students.editTitle')
  }
  return t('students.createTitle')
})

const phoneRegExp = /\+?\d{1,3}[\s\-]?\(?\d{1,3}\)?([\s\-]?\d){7}/

const validationSchema = useLocaleWatcher(() =>
  toTypedSchema(
    zod
      .object({
        id: zod.number().nullish(),
        email: zod
          .string()
          .email({ message: t('auth.errors.email.format') }),
        uniEmail: zod
          .string().nullish(),
        firstName: zod
          .string({ required_error: t('auth.errors.firstName.required') })
          .min(3)
          .max(256),
        lastName: zod
          .string({ required_error: t('auth.errors.lastName.required') })
          .min(3)
          .max(256),
        groupId: zod.number({
          required_error: t('students.errors.group.required'),
          invalid_type_error: t('students.errors.group.required'),
        }),
        phone: zod
          .string()
          .regex(phoneRegExp, t('auth.errors.phone.required')),
      }),
  ),
)

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: student.studentFormData,
})

const { value: groupId } = useField('groupId')

const onSubmit = handleSubmit(async (values) => {
  if (!student.loading) {
    notif.dismissAll()

    const response = await student.save(values)

    if (response?.id > 0) {
      notif.success(`${values.firstName} ${values.lastName} Saved`)
      router.push('/students')
    }
    else {
      notif.error({ message: response, duration: 5000 })
    }
  }
})




</script>

<template v-if="student.studentFormData !== undefined">
  <form class="form-layout" @submit.prevent="onSubmit">
    <VLoader
      size="large"
      :active="student.loading"
      :translucent="true"
    >
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>{{ pageTitle }}</h3>
            </div>
            <div class="right">
              <div class="buttons">
                <VButton
                  icon="lnir lnir-arrow-left rem-100"
                  light
                  dark-outlined
                  @click="router.back()"
                >
                  {{ t('action.cancel') }}
                </VButton>
                <VButton
                  type="submit"
                  color="primary"
                  raised
                >
                  {{ t('action.save') }}
                </VButton>
              </div>
            </div>
          </div>
        </div>

        <div class="form-body">
          <div class="form-fieldset">
            <div class="columns is-multiline">
              <div class="column is-6">
                <VFormInput
                  type="text"
                  name="lastName"
                  icon="feather:student"
                  placeholder="auth.placeholder.lastName"
                />
              </div>
              <div class="column is-6">
                <VFormAutocomplete
                  icon="lnir lnir-group-alt"
                  name="groupId"
                  placeholder="students.table.group"
                  :items="groups"
                />
              </div>
              
              <div class="column is-6">
                <VFormInput
                  type="text"
                  name="firstName"
                  icon="feather:student"
                  placeholder="auth.placeholder.firstName"
                />
              </div>
              <div class="column is-6">
                <VFormInput
                  type="text"
                  name="email"
                  icon="feather:mail"
                  placeholder="auth.placeholder.email"
                />
              </div>

              <div class="column is-6">
                <VFormInput
                  type="text"
                  name="email"
                  icon="feather:mail"
                  placeholder="auth.placeholder.uniEmail"
                />
              </div>
              <div class="column is-6">
                <VFormInput
                  type="text"
                  name="phone"
                  icon="lnir lnir-phone-ring"
                  placeholder="auth.placeholder.phone"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </VLoader>
  </form>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';
@import '/@src/scss/components/forms-outer';

.form-layout {
  max-width: 740px;
  margin: 0 auto;
}
</style>
