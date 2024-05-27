<script setup lang="ts">
import { useI18n } from 'vue-i18n'


import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z as zod } from 'zod'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import { useUserSession } from '/@src/stores/userSession'

import { type CompanyRequest, createCompany } from '../../api/company'
import { login } from '../../api/login'

const darkmode = useDarkmode()
const router = useRouter()
const notif: any = useNotyf()
const userSession = useUserSession()

const isLoading = ref(false)
const { t } = useI18n()

const phoneRegExp = /\+?\d{1,3}[\s\-]?\(?\d{1,3}\)?([\s\-]?\d){7}/

const validationSchema = toTypedSchema(
  zod
    .object({
      email: zod
        .string({ required_error: t('auth.errors.email.required') })
        .email({ message: t('auth.errors.email.format') }),
      password: zod
        .string({ required_error: t('auth.errors.password.length') })
        .min(8, { message: t('auth.errors.password.length') }),
      passwordCheck: zod.string({
        required_error: t('auth.errors.passwordCheck.required'),
      }),
      name: zod
        .string({ required_error: t('auth.errors.name.required') })
        .min(3)
        .max(256),
      country: zod
        .string({ required_error: t('auth.errors.country.required') })
        .min(3)
        .max(256),
      city: zod
        .string({ required_error: t('auth.errors.city.required') })
        .min(3)
        .max(256),
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
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: t('auth.errors.passwordCheck.match'),
      path: ['passwordCheck'],
    })
)

const { handleSubmit } = useForm({
  validationSchema,
})

const onSignup = handleSubmit(async (values) => {
  if (!isLoading.value) {
    isLoading.value = true
    notif.dismissAll()

    const response = await createCompany(values as CompanyRequest)

    if (response?.status === 200) {
      const token = await login({ email: values.email, password: values.password })
      if (token) {
        userSession.setToken(token)
        notif.success(`${t('login.welcome')}, ${values.firstName} ${values.lastName}`)

        router.push('/users')
      } else {
        notif.error({ message: response, duration: 5000 })
      }
    } else {
      notif.error({ message: response, duration: 5000 })
    }

    isLoading.value = false
  }
})

onMounted(() => {
  if (userSession.token) {
    router.push('/users')
  }
})

useHead({
  title: t('auth.title'),
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <div class="column is-5">
      <VLoader size="large" :active="isLoading" :translucent="true">
        <div class="hero is-fullheight is-white">
          <div class="hero-heading">
            <div class="auth-logo">
              <LanguageDropdown />
              <RouterLink to="/">
                <AnimatedLogo class="top-logo" width="36px" height="36px" />
              </RouterLink>
              <label
                class="dark-mode"
                tabindex="0"
                role="button"
                @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
              >
                <input
                  data-cy="dark-mode-toggle"
                  type="checkbox"
                  :checked="!darkmode.isDark"
                  @change="darkmode.onChange"
                />
                <span></span>
              </label>
            </div>
          </div>

          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-12">
                  <div class="auth-content">
                    <h2>{{ t('auth.title') }}</h2>
                    <p>{{ t('auth.subtitle') }}</p>
                    <RouterLink to="/users">
                      {{ t('auth.action.login') }}
                    </RouterLink>
                  </div>

                  <div class="auth-form-wrapper">
                    <form @submit="onSignup">
                      <div id="signin-form" class="login-form">
                        <VFormInput
                          :type="'text'"
                          :name="'firstName'"
                          :icon="'feather:user'"
                          :placeholder="'auth.placeholder.firstName'"
                        />

                        <VFormInput
                          :type="'text'"
                          :name="'lastName'"
                          :icon="'feather:users'"
                          :placeholder="'auth.placeholder.lastName'"
                        />

                        <VFormInput
                          :type="'text'"
                          :name="'email'"
                          :icon="'feather:mail'"
                          :placeholder="'auth.placeholder.email'"
                        />

                        <VFormInput
                          :type="'password'"
                          :name="'password'"
                          :icon="'feather:lock'"
                          :placeholder="'auth.placeholder.password'"
                        />

                        <VFormInput
                          :type="'password'"
                          :name="'passwordCheck'"
                          :icon="'feather:lock'"
                          :placeholder="'auth.placeholder.passwordCheck'"
                        />

                        <VFormInput
                          :type="'text'"
                          :name="'name'"
                          :icon="'lnil lnil-briefcase'"
                          :placeholder="'auth.placeholder.name'"
                        />

                        <VFormInput
                          :type="'text'"
                          :name="'country'"
                          :icon="'lnir lnir-house'"
                          :placeholder="'auth.placeholder.country'"
                        />

                        <VFormInput
                          :type="'text'"
                          :name="'city'"
                          :icon="'lnir lnir-house'"
                          :placeholder="'auth.placeholder.city'"
                        />

                        <VFormInput
                          :type="'text'"
                          :name="'phone'"
                          :icon="'lnir lnir-phone-ring'"
                          :placeholder="'auth.placeholder.phone'"
                        />

                        <VField>
                          <VControl class="login">
                            <VButton type="submit" color="primary" bold fullwidth raised>
                              {{ t('auth.action.signup') }}
                            </VButton>
                          </VControl>
                        </VField>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VLoader>
    </div>

    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-7 is-hidden-mobile hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <p>тут буде гарна картинка</p>
              <!-- <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/apps/demesup-banking-light.webp"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/apps/demesup-banking-dark.webp"
                alt=""
              /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
