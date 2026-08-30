<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    label: string
    placeholder: string
    type?: string
    required?: boolean
    autocomplete?: string
    /** Renders a textarea instead of an input (the Message field). */
    textarea?: boolean
    /** First field in a two-up row — capped at 280px in the comp. */
    narrow?: boolean
    /** Server-side validation message for this field, if any. */
    error?: string
    disabled?: boolean
  }>(),
  {
    type: 'text',
    required: false,
    autocomplete: undefined,
    textarea: false,
    narrow: false,
    error: undefined,
    disabled: false
  }
)

const model = defineModel<string>({ default: '' })

const id = useId()
const errorId = `${id}-error`
</script>

<template>
  <div
    class="flex flex-col items-start gap-sm2"
    :class="[
      narrow ? 'w-full sm:max-w-[280px] sm:min-w-[240px] sm:flex-1' : 'w-full sm:min-w-px sm:flex-1',
      textarea && 'h-[144px]'
    ]"
  >
    <label :for="id" class="flex items-start gap-xxs text-sm font-medium leading-5 text-dark-500">
      {{ label }}
      <span v-if="required" class="font-medium text-error" aria-hidden="true">*</span>
    </label>

    <textarea
      v-if="textarea"
      :id="id"
      v-model="model"
      :name="name"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error ? errorId : undefined"
      class="w-full flex-1 resize-y rounded-lg border bg-white px-[14px] py-3 text-base text-dark-500 placeholder:text-dark-300 focus:outline-none focus:ring-1 disabled:opacity-60"
      :class="
        error
          ? 'border-error focus:border-error focus:ring-error'
          : 'border-dark-50 focus:border-purple-500 focus:ring-purple-500'
      "
    />

    <input
      v-else
      :id="id"
      v-model="model"
      :name="name"
      :type="type"
      :required="required"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error ? errorId : undefined"
      class="w-full rounded-lg border bg-white px-[14px] py-3 text-base text-dark-500 placeholder:text-dark-300 focus:outline-none focus:ring-1 disabled:opacity-60"
      :class="
        error
          ? 'border-error focus:border-error focus:ring-error'
          : 'border-dark-50 focus:border-purple-500 focus:ring-purple-500'
      "
    >

    <p v-if="error" :id="errorId" class="text-sm text-error">
      {{ error }}
    </p>
  </div>
</template>
