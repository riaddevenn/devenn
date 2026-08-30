<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'triangle' | 'dot' }>(), {
  variant: 'triangle',
});
</script>

<template>
  <li
    class="flex w-full list-none items-start gap-2"
    :class="variant === 'dot' && 'pl-[18px]'"
  >
    <img
      v-if="variant === 'triangle'"
      src="/icons/bullet-triangle.svg"
      alt=""
      aria-hidden="true"
      class="mt-[7px] size-[9px] shrink-0"
      width="9"
      height="9"
    />
    <img
      v-else
      src="/icons/bullet-dot-blue.svg"
      alt=""
      aria-hidden="true"
      class="mt-[3px] h-[11px] w-[5px] shrink-0"
      width="5"
      height="11"
    />
    <span class="min-w-px flex-1 text-base text-dark-300">
      <slot />
    </span>
  </li>
</template>
