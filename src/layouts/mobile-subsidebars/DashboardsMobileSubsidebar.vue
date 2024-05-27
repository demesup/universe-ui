<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>UniVerse</h3>
      </div>

      <ul class="submenu" data-simplebar>

        <VCollapseLinks :open="true">
          <RouterLink to="/students" class="is-submenu">
            <i class="lnir lnir-user" aria-hidden="true"></i>
            <span>{{ t('menu.students') }}</span>
          </RouterLink>
        </VCollapseLinks>

        <VCollapseLinks :open="true">
          <template #header>
            {{ t('menu.settings') }}
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink to="/users" class="is-submenu">
            <i class="lnir lnir-user" aria-hidden="true"></i>
            <span>{{ t('menu.users') }}</span>
          </RouterLink>
        </VCollapseLinks>
      </ul>
    </div>
  </div>
</template>
