<script setup lang="ts">
/**
 * Ocean Professional button component.
 * Variants: primary | secondary | default
 * Size: sm | md | lg
 */
// PUBLIC_INTERFACE
defineOptions({ name: 'AppButton' })

const props = withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'default',
  size: 'md',
  block: false,
  disabled: false,
  type: 'button'
})

const emit = defineEmits<{ (e:'click', evt: MouseEvent): void }>()

function onClick(e: MouseEvent) {
  if (!props.disabled) emit('click', e)
}
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="[
      'btn',
      props.variant === 'primary' && 'btn-primary',
      props.variant === 'secondary' && 'btn-secondary',
    ]"
    :style="{
      width: props.block ? '100%' : undefined,
      padding: props.size === 'sm' ? '.45rem .7rem' : props.size === 'lg' ? '.8rem 1.1rem' : undefined
    }"
    @click="onClick"
  >
    <slot />
  </button>
</template>
