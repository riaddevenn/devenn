<script setup lang="ts">
const pillars = [
  {
    icon: '/icons/eye.svg',
    title: 'Our vision',
    body: 'To become the most trusted technology partner for organizations shaping the future.',
  },
  {
    icon: '/icons/target.svg',
    title: 'Our mission',
    body: 'To deliver the right technology solutions with the quality, speed, and accountability our clients can trust.',
  },
  {
    icon: '/icons/diamond.svg',
    title: 'Our values',
    body: 'The Right Trust. The Right Delivery. Through Quality, Speed, and complete transparency.',
  },
];
</script>

<template>
  <section
    class="container-page flex flex-col items-center justify-center gap-20 py-20 lg:gap-[120px] lg:py-[120px]"
  >
    <div
      class="flex w-full flex-col items-center gap-10 lg:h-[454px] lg:flex-row lg:gap-[55px]"
    >
      <div
        class="flex min-w-px flex-1 flex-col items-start justify-center gap-[25px] lg:h-full lg:px-10"
      >
        <p class="eyebrow">Our Identity</p>
        <h2 class="section-title">A new name. A bigger vision.</h2>
        <p class="text-base text-dark-300">
          Devenn's evolution from Alwasaet represents the next chapter of the
          company — expanding its capabilities and vision while building on the
          expertise and trust developed over the years.
        </p>
      </div>

      <!-- Legacy-to-now lockup: the Alwasaet mark and the Devenn mark sitting
           in overlapping blue/purple glows, joined by a timeline arrow. -->
      <div
        class="relative h-[260px] w-full max-w-[557px] shrink-0 sm:h-[338px] lg:w-[557px]"
      >
        <img
          src="/illustrations/identity-glow-blue.svg"
          alt=""
          aria-hidden="true"
          class="absolute inset-0 size-full"
        />
        <img
          src="/illustrations/identity-glow-purple.svg"
          alt=""
          aria-hidden="true"
          class="absolute inset-0 size-full rotate-180"
        />

        <img
          src="/logos/alwasaet-legacy.svg"
          alt="Alwasaet"
          class="absolute left-[1.17%] top-[46.44%] h-[13.3%] w-[28.73%]"
        />
        <img
          src="/logos/devenn-wordmark-dark.svg"
          alt="Devenn"
          class="absolute left-[70.11%] top-[47.91%] h-[10.06%] w-[28.72%]"
        />

        <img
          src="/illustrations/identity-timeline-arrow.webp"
          alt=""
          aria-hidden="true"
          class="absolute left-[32.85%] top-[50.54%] h-[3.1%] w-[34.29%]"
        />

        <span
          class="absolute left-[9.43%] top-[62.41%] w-[16%] text-center text-sm text-dark-300"
        >
          Since 2025
        </span>
        <span
          class="absolute left-[81.6%] top-[62.41%] w-[10%] text-center text-sm text-dark-300"
        >
          2026
        </span>
      </div>
    </div>

    <div class="flex w-full flex-col items-stretch gap-[30px] md:flex-row">
      <div
        v-for="pillar in pillars"
        :key="pillar.title"
        class="flex min-w-px flex-1 flex-col items-start gap-2 rounded-xs border border-[#E5CEFA] bg-gray-50 p-[14px]"
      >
        <img
          :src="pillar.icon"
          alt=""
          aria-hidden="true"
          class="size-6"
          width="24"
          height="24"
        />
        <h3 class="w-full text-xl font-semibold text-dark-500">
          {{ pillar.title }}
        </h3>
        <p class="text-base text-dark-300">{{ pillar.body }}</p>
      </div>
    </div>
  </section>
</template>
