<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { z as zod } from 'zod'
import { useForm } from 'vee-validate'
import { useNotyf } from '/@src/composable/useNotyf'
import { useUserStore } from '/@src/stores/users'
import { useLocaleWatcher } from '/@src/composable/useLocaleWatcher'

const router = useRouter()
const user = useUserStore()
const { y } = useWindowScroll()
const { t } = useI18n()
const notif = useNotyf()

const isStuck = computed(() => {
  return y.value > 30
})

const pageTitle = computed(() => {
  if (user.userFormData?.id) {
    return t('users.editTitle')
  }
  return t('users.createTitle')
})

const phoneRegExp = /\+?\d{1,3}[\s\-]?\(?\d{1,3}\)?([\s\-]?\d){7}/

const validationSchema = useLocaleWatcher(() =>
  toTypedSchema(
    zod
      .object({
        id: zod.number().nullish(),
        email: zod
          .string({ required_error: t('auth.errors.email.required') })
          .email({ message: t('auth.errors.email.format') }),
        password: zod
          .string({ required_error: t('auth.errors.password.length') })
          .min(8, { message: t('auth.errors.password.length') }),
        passwordCheck: zod.string({
          required_error: t('auth.errors.passwordCheck.required'),
        }),
        firstName: zod
          .string({ required_error: t('auth.errors.firstName.required') })
          .min(3)
          .max(256),
        lastName: zod
          .string({ required_error: t('auth.errors.lastName.required') })
          .min(3)
          .max(256),
        phone: zod
          .string({ required_error: t('auth.errors.phone.required') })
          .regex(phoneRegExp, t('auth.errors.phone.required')),
        authorities: zod.string().nullish(),
      })
      .refine(data => data.password === data.passwordCheck, {
        message: t('auth.errors.passwordCheck.match'),
        path: ['passwordCheck'],
      }),
  ),
)

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: user.userFormData,
})

const onSubmit = handleSubmit(async (values) => {
  if (!user.loading) {
    notif.dismissAll()

    const response = await user.save(values)

    if (response?.id > 0) {
      notif.success(`${values.firstName} ${values.lastName} Saved`)
      router.push('/users')
    }
    else {
      notif.error({ message: response, duration: 5000 })
    }
  }
})
</script>

<template v-if="user.userFormData !== undefined">
  <form class="form-layout" @submit.prevent="onSubmit">
    <VLoader
      size="large"
      :active="user.loading"
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
                  name="firstName"
                  icon="feather:user"
                  placeholder="auth.placeholder.firstName"
                />
              </div>
              <div class="column is-6">
                <VFormInput
                  type="text"
                  name="lastName"
                  icon="feather:user"
                  placeholder="auth.placeholder.lastName"
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
                  name="phone"
                  icon="lnir lnir-phone-ring"
                  placeholder="auth.placeholder.phone"
                />
              </div>
              <div class="column is-6">
                <VFormInput
                  type="password"
                  name="password"
                  icon="feather:lock"
                  placeholder="auth.placeholder.password"
                />
              </div>
              <div class="column is-6">
                <VFormInput
                  type="password"
                  name="passwordCheck"
                  icon="feather:lock"
                  placeholder="auth.placeholder.passwordCheck"
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
