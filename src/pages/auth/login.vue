<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'


import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z as zod } from 'zod'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import { useUserSession } from '/@src/stores/userSession'
import { login } from '/@src/api/login'

const darkmode = useDarkmode()
const router = useRouter()
const notif = useNotyf()
const userSession = useUserSession()
const route = useRoute()

const redirect = route.query.redirect as string

const isLoading = ref(false)
const { t } = useI18n()

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({
        required_error: t('auth.errors.email.required'),
      })
      .email(t('auth.errors.email.format')),
    password: zod
      .string({
        required_error: t('auth.errors.password.required'),
      })
      .min(6, t('auth.errors.password.required')),
  })
)

const { handleSubmit } = useForm({
  validationSchema,
})

const onLogin = handleSubmit(async (values) => {
  if (!isLoading.value) {
    isLoading.value = true
    notif.dismissAll()
    try {
      const token = await login({ email: values.email, password: values.password })
      if (token) {
        userSession.setToken(token)

        notif.success(`${t('login.welcome')}, ${values.email}`)

        if (redirect) {
          router.push(redirect)
        } else {
          router.push('/users')
        }
      } else {
        throw new Error()
      }
    } catch (error: any) {
      notif.error({ message: t('login.error'), duration: 5000 })
    } finally {
      isLoading.value = false
    }
  }
})

onMounted(() => {
  if (userSession.token) {
    router.push('/users')
  }
})

useHead({
  title: t('login.title'),
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <div class="column login-column is-8 h-hidden-mobile h-hidden-tablet-p hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <!--<div class="column is-10 is-offset-1">
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/landing/landing.jpeg"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/landing/landing.jpeg"
                alt=""
              />
            </div>-->
          </div>
        </div>
      </div>
    </div>

    <div class="column is-4">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <div class="auth-logo">
            <RouterLink to="/">
              <AnimatedLogo width="36px" height="36px" />
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
                  <h2>{{ t('login.greeting') }}</h2>
                  <p>{{ t('login.description') }}</p>
                  <RouterLink to="/auth/signup">
                    {{ t('login.noAccount') }}
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
                  <form @submit.prevent="onLogin">
                    <div class="login-form">
                      <VFormInput
                        type="text"
                        name="email"
                        icon="feather:user"
                        :placeholder="t('auth.placeholder.email')"
                      />

                      <VFormInput
                        type="password"
                        name="password"
                        icon="feather:lock"
                        :placeholder="t('auth.placeholder.password')"
                      />

                      <div class="login">
                        <VField>
                          <VControl class="login">
                            <VButton
                              :loading="isLoading"
                              color="primary"
                              type="submit"
                              bold
                              fullwidth
                              raised
                            >
                              {{ t('login.action') }}
                            </VButton>
                          </VControl>
                        </VField>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
