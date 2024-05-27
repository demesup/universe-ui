<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['close'])
const { t } = useI18n()
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">
        UniVerse
      </h3>
      <div
        class="panel-close"
        tabindex="0"
        @keydown.space.prevent="emit('close')"
        @click="emit('close')"
      >
        <i
          aria-hidden="true"
          class="iconify"
          data-icon="feather:x"
        />
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <VCollapseLinks :open="true">
          <RouterLink to="/students" class="is-submenu">
            <i class="lnir lnir-user" aria-hidden="true"></i>
            <span>{{ t('menu.students') }}</span>
          </RouterLink>
        </VCollapseLinks>
        <VCollapseLinks :open="true">
          <template #header>
            {{ t('menu.settings') }}
            <i
              aria-hidden="true"
              class="iconify"
              data-icon=""
            />
          </template>

          <RouterLink to="/users" class="is-submenu">
            <i class="lnir lnir-user" aria-hidden="true" />
            <span>{{ t('menu.users') }}</span>
          </RouterLink>
        </VCollapseLinks>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/layout/sidebar-panel';
</style>
