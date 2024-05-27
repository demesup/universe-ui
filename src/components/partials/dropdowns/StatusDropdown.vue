<script setup lang="ts">
const emits = defineEmits<{
  (e: 'OPENED'): void
  (e: 'IN_PROGRESS'): void
  (e: 'DONE'): void
  (e: 'CANCELED'): void
  (e: 'WAIT'): void
}>()
</script>

<template>
  <VDropdown icon="feather:more-vertical" title="Change status">
    <template #content="{ close }">
      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="close(), $emit('changeStatus', 'OPENED')"
      >
        <div class="meta">
          <span>Opened</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="close(), $emit('changeStatus', 'IN_PROGRESS')"
      >
        <div class="meta">
          <span>In progress</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="close(), $emit('changeStatus', 'WAIT')"
      >
        <div class="meta">
          <span>Wait</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="close(), $emit('changeStatus', 'DONE')"
      >
        <div class="meta">
          <span>Done</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="close(), $emit('changeStatus', 'CANCELED')"
      >
        <div class="meta">
          <span>Canceled</span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>