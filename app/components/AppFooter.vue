<script setup lang="ts">
const { open: openContact } = useContactModal();

const contact = [
  {
    label: 'Email',
    value: 'Contact@devenn.net',
    href: 'mailto:Contact@devenn.net',
  },
  { label: 'Phone', value: '+971 56 456 4415', href: 'tel:+971564564415' },
  { label: 'Offices', value: 'Riyadh, Saudi Arabia' },
];
</script>

<template>
  <footer
    id="contact"
    class="bg-dark-800 px-6 pb-8 pt-20 md:px-12 lg:px-20 lg:pt-[170px]"
  >
    <div
      class="container-page flex flex-col items-start gap-[38px] px-0 md:px-[30px]"
    >
      <div
        class="flex w-full flex-col items-start gap-10 lg:flex-row lg:gap-[38px]"
      >
        <div class="flex flex-col items-start gap-[38px] lg:w-[606px]">
          <div class="flex flex-col items-start gap-2">
            <h2 class="text-[28px] font-bold text-gray-50 md:text-[32px]">
              Let's build what's next.
            </h2>
            <p class="max-w-[470px] text-base text-dark-100">
              Have a challenge, an idea, or an opportunity? Tell us what you're
              trying to change. We'll come back with a clear view of the work,
              the team and what it takes to move forward.
            </p>
          </div>

          <button
            type="button"
            class="btn-primary px-3 py-[10px] text-sm"
            @click="openContact"
          >
            Contact us
          </button>
        </div>

        <dl class="flex min-w-px flex-1 flex-col items-start gap-6 text-xs">
          <div
            v-for="item in contact"
            :key="item.label"
            class="flex w-full flex-col gap-4"
          >
            <dt class="text-dark-100">{{ item.label }}</dt>
            <dd class="font-medium text-gray-50">
              <a
                v-if="item.href"
                :href="item.href"
                class="transition-opacity hover:opacity-70"
              >
                {{ item.value }}
              </a>
              <template v-else>{{ item.value }}</template>
            </dd>
          </div>
        </dl>
      </div>

      <img
        src="/illustrations/footer-divider-arrow.svg"
        alt=""
        aria-hidden="true"
        class="h-[8px] w-full"
      />

      <div
        class="flex w-full items-start justify-between gap-4 text-xs text-dark-100"
      >
        <p class="w-[193px]">
          © {{ new Date().getFullYear() }} Devenn. Formerly Alwasaet.
        </p>
        <p class="whitespace-nowrap">Quality · Speed · Transparency</p>
      </div>
    </div>
  </footer>
</template>
