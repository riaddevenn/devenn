<script setup lang="ts">
import type { FetchError } from 'ofetch'

const { isOpen, close } = useContactModal()

const titleId = useId()
const dialog = ref<HTMLElement | null>(null)

// Element that had focus before opening, so it can be restored on close.
let previouslyFocused: HTMLElement | null = null

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Your full name', type: 'text', required: true, autocomplete: 'name', narrow: true },
  { name: 'email', label: 'Work Email', placeholder: 'exemple@mail.com', type: 'email', required: true, autocomplete: 'email', narrow: false },
  { name: 'company', label: 'Company', placeholder: 'Company name', type: 'text', required: false, autocomplete: 'organization', narrow: true },
  { name: 'phone', label: 'Phone', placeholder: 'Phone number', type: 'tel', required: false, autocomplete: 'tel', narrow: false }
] as const

const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
  // Honeypot — hidden from humans, so anything here means a bot filled the
  // form by matching field names. The server discards those submissions.
  website: ''
})

const errors = ref<Record<string, string>>({})
const formError = ref('')
const status = ref<'idle' | 'sending' | 'sent'>('idle')

// Stamped when the modal opens. The server rejects submissions that arrive
// implausibly fast; see server/api/contact.post.ts.
const startedAt = ref(0)

const sending = computed(() => status.value === 'sending')

function resetForm() {
  Object.assign(form, {
    name: '', email: '', company: '', phone: '', subject: '', message: '', website: ''
  })
  errors.value = {}
  formError.value = ''
  status.value = 'idle'
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
    return
  }

  // Keep Tab inside the dialog while it is open.
  if (event.key !== 'Tab' || !dialog.value) return

  const focusable = dialog.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  )
  if (!focusable.length) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  const active = document.activeElement

  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(isOpen, async (open) => {
  if (open) {
    // Only clear after a successful send. Closing by accident mid-typing and
    // reopening should not cost the user their message.
    if (status.value === 'sent') resetForm()

    startedAt.value = Date.now()
    previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    dialog.value?.querySelector('input')?.focus()
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
    previouslyFocused?.focus()
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})

async function onSubmit() {
  if (sending.value) return

  status.value = 'sending'
  errors.value = {}
  formError.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, startedAt: startedAt.value }
    })

    status.value = 'sent'
  } catch (error) {
    const { data, statusMessage } = (error as FetchError<{
      statusMessage?: string
      data?: { errors?: Record<string, string> }
    }>).data ?? {}

    // Field-level messages come back under `data.errors` — createError() nests
    // its `data` option one level down in the serialised response.
    if (data?.errors) errors.value = data.errors

    formError.value = statusMessage
      || 'Something went wrong. Please try again, or email us at Contact@devenn.net.'

    status.value = 'idle'
    await nextTick()
    dialog.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-y-auto p-8"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <!-- Background overlay -->
        <div
          class="absolute inset-0 bg-[#0D121C]/70 backdrop-blur-[8px]"
          @click="close"
        />

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-2 scale-[0.98] opacity-0"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="translate-y-2 scale-[0.98] opacity-0"
          appear
        >
          <div
            v-if="isOpen"
            ref="dialog"
            class="relative flex w-full max-w-[640px] shrink-0 flex-col items-center overflow-hidden rounded-xl bg-white shadow-modal"
          >
            <!-- Header -->
            <div class="flex w-full flex-col items-center">
              <div class="flex w-full flex-col items-start gap-4 px-6 pt-14">
                <div class="flex w-full flex-col items-start gap-1">
                  <!-- #121926 comes from the modal's own token set, not the
                       Foundation/Dark ramp used elsewhere on the page. -->
                  <h2 :id="titleId" class="w-full text-[32px] font-bold text-[#121926] sm:text-[40px]">
                    {{ status === 'sent' ? 'Message sent' : 'Contact us' }}
                  </h2>
                  <p class="w-full text-base text-dark-300">
                    {{
                      status === 'sent'
                        ? "Thanks for reaching out — we'll be in touch shortly."
                        : "Share your vision and we'll help you make it real."
                    }}
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="absolute right-4 top-4 flex size-11 items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                aria-label="Close contact form"
                @click="close"
              >
                <img src="/icons/x-close.svg" alt="" aria-hidden="true" class="size-6" width="24" height="24">
              </button>

              <div class="h-8 w-full" />
            </div>

            <!-- Confirmation -->
            <div v-if="status === 'sent'" class="flex w-full flex-col items-start gap-6 px-6 pb-6">
              <div class="flex w-full items-start gap-3 rounded-lg bg-gray-200 p-4">
                <Icon name="lucide:check-circle-2" size="20" class="mt-px shrink-0 text-purple-600" />
                <p class="text-base text-dark-500">
                  Your message is on its way to our team. If it's urgent, reach us directly at
                  <a href="mailto:Contact@devenn.net" class="font-medium text-purple-600 underline">Contact@devenn.net</a>.
                </p>
              </div>

              <button
                type="button"
                class="w-full rounded-xs bg-purple-600 px-4 py-[10px] text-base font-semibold leading-6 text-white transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                @click="close"
              >
                Close
              </button>
            </div>

            <!-- Form -->
            <form v-else class="flex w-full flex-col items-start gap-5 px-6" @submit.prevent="onSubmit">
              <div class="flex w-full flex-col items-start gap-4">
                <div class="flex w-full flex-col gap-4 sm:flex-row sm:items-start">
                  <FormField
                    v-for="field in fields.slice(0, 2)"
                    :key="field.name"
                    v-model="form[field.name]"
                    v-bind="field"
                    :error="errors[field.name]"
                    :disabled="sending"
                  />
                </div>

                <div class="flex w-full flex-col gap-4 sm:flex-row sm:items-start">
                  <FormField
                    v-for="field in fields.slice(2)"
                    :key="field.name"
                    v-model="form[field.name]"
                    v-bind="field"
                    :error="errors[field.name]"
                    :disabled="sending"
                  />
                </div>

                <FormField
                  v-model="form.subject"
                  name="subject"
                  label="Subject"
                  placeholder="Subject"
                  type="text"
                  required
                  :error="errors.subject"
                  :disabled="sending"
                />

                <FormField
                  v-model="form.message"
                  name="message"
                  label="Message"
                  placeholder="Tell us about your project, timeline, or questions."
                  textarea
                  required
                  :error="errors.message"
                  :disabled="sending"
                />
              </div>

              <!-- Honeypot. Positioned off-screen rather than display:none —
                   bots increasingly skip hidden fields, but still fill this
                   one. tabindex and aria-hidden keep it away from real users. -->
              <div class="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label for="contact-website">Website</label>
                <input
                  id="contact-website"
                  v-model="form.website"
                  type="text"
                  name="website"
                  tabindex="-1"
                  autocomplete="off"
                >
              </div>

              <!-- Actions -->
              <div class="flex w-full flex-col items-start pt-8">
                <p
                  v-if="formError"
                  role="alert"
                  class="mb-4 w-full rounded-lg bg-error/10 px-4 py-3 text-sm text-error"
                >
                  {{ formError }}
                </p>

                <div class="flex w-full items-start gap-3 pb-6">
                  <button
                    type="submit"
                    :disabled="sending"
                    class="flex min-w-px flex-1 items-center justify-center gap-sm2 overflow-hidden rounded-xs bg-purple-600 px-4 py-[10px] text-base font-semibold leading-6 text-white transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Icon v-if="sending" name="lucide:loader-2" size="18" class="animate-spin" />
                    {{ sending ? 'Sending…' : 'Send message' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
