<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

/**
 * We use the same storage key as we use in the /src/i18n.ts file
 * so if user reload the page, the selected language will be the same
 */
const defaultLocale = useStorage('locale', 'ua')

/**
 * Each time we change the locale, we persit it in the storage
 */
watch(locale, () => {
  defaultLocale.value = locale.value
})

const localFlagSrc = computed(() => {
  switch (locale.value) {
    case 'ua':
      return '/images/icons/flags/ukraine.svg'
    case 'ro':
      return '/images/icons/flags/romania.svg'
    case 'fr':
      return '/images/icons/flags/france.svg'
    case 'gr':
      return '/images/icons/flags/germany.svg'
    case 'en':
    default:
      return '/images/icons/flags/united-states-of-america.svg'
  }
})

const open = ref(false)
const target = ref(null)

onClickOutside(target, () => (open.value = false))

const selectLang = (lang: string) => {
  locale.value = lang
  open.value = false
}
</script>

<template>
  <div
    ref="target"
    class="dropdown lang-dropdown"
    :class="open ? 'is-active' : ''"
  >
    <a
      href="#"
      class="dropdown-trigger"
      @click.prevent="open = true"
    >
      <img
        :src="localFlagSrc"
        :alt="locale"
      >
    </a>

    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a
          href="#"
          role="button"
          class="dropdown-item"
          @click="selectLang('en')"
        >
          <img src="/images/icons/flags/united-states-of-america.svg" alt="">
          <span>English</span>
        </a>
        <a
          href="#"
          role="button"
          class="dropdown-item"
          @click="selectLang('ro')"
        >
          <img src="/images/icons/flags/romania.svg" alt="">
          <span>Polski</span>
        </a>
        <a
          href="#"
          role="button"
          class="dropdown-item"
          @click="selectLang('ua')"
        >
          <img src="/images/icons/flags/ukraine.svg" alt="">
          <span>Українська</span>
        </a>
        <a
          href="#"
          role="button"
          class="dropdown-item"
          @click="selectLang('fr')"
        >
          <img src="/images/icons/flags/france.svg" alt="">
          <span>Français</span>
        </a>
        <a
          href="#"
          role="button"
          class="dropdown-item"
          @click="selectLang('gr')"
        >
          <img src="/images/icons/flags/germany.svg" alt="">
          <span>Deutsch</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lang-dropdown {
  .dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;

    img {
      width: 2rem;
      height: 2rem;
    }
  }

  .dropdown-menu {
    width: 220px;
    max-width: 220px;

    .dropdown-content {
      padding: 0.75rem;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      padding-inline-start: 0.75rem;
      padding-inline-end: 0.75rem;

      img {
        display: block;
        height: 26px;
        width: 26px;
        min-width: 26px;
        border-radius: 50%;
      }

      span {
        display: block;
        margin-inline-start: 10px;
      }
    }
  }
}

.is-dark {
  .lang-dropdown {
    .dropdown-menu {
      .dropdown-content {
        background: var(--dark-sidebar) !important;
        border-color: var(--dark-sidebar-light-8) !important;

        .dropdown-item {
          color: var(--light-text);

          &:hover {
            background: var(--dark-sidebar-light-10) !important;
          }
        }

        .dropdown-divider {
          background-color: var(--dark-sidebar-light-12);
        }
      }
    }
  }
}

[dir='rtl'] .lang-dropdown .dropdown-menu {
  left: auto;
  right: 0;
}
</style>
