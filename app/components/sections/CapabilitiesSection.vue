<script setup lang="ts">
// Each render sits at a slightly different scale inside its 366x323 frame, so
// the crop from the comp travels with the card rather than being hard-coded
// once. `fill` cards cover the frame edge-to-edge instead.
type Capability = {
  title: string;
  body: string;
  image: string;
  inset?: { top: string; left: string; width: string; height: string };
};

const capabilities: Capability[] = [
  {
    title: 'Digital Transformation Consultancy',
    body: 'Custom courseware, simulations and assessments built around client competency models.',
    image: '/capabilities/digital-transformation-consultancy.webp',
    inset: { top: '10.99%', left: '12.07%', width: '75.84%', height: '78.15%' },
  },
  {
    title: 'Enterprise Applications Implementation',
    body: 'From strategy and roadmap development to technology and operating-model advisory, we guide clients from vision to measurable outcomes.',
    image: '/capabilities/enterprise-applications.webp',
    inset: { top: '11.17%', left: '11.64%', width: '76.93%', height: '78.11%' },
  },
  {
    title: 'Mobility & Customer Experience Solutions',
    body: 'Native and cross-platform applications and measurable digital customer journeys.',
    image: '/capabilities/mobility-customer-experience.webp',
    inset: { top: '1.44%', left: '3.68%', width: '92.93%', height: '97.07%' },
  },
  {
    title: 'UI/UX & Design Systems',
    body: 'Research, interface design and scalable component-based design systems.',
    image: '/capabilities/ui-ux-design-systems.webp',
    inset: { top: '11.72%', left: '13.19%', width: '73.68%', height: '76.96%' },
  },
  {
    title: 'AI, Data & Analytics Solutions',
    body: 'Data platforms, pipelines, warehouses and applied AI moved from pilot into real workflows.',
    image: '/capabilities/ai-data-analytics.webp',
    inset: { top: '10.78%', left: '8.63%', width: '82.7%', height: '89.36%' },
  },
  {
    title: 'IOT and Facility Management Solution',
    body: 'Connected solutions for smarter, more efficient facility operations.',
    image: '/capabilities/iot-facility-management.webp',
  },
];
</script>

<template>
  <section
    id="capabilities"
    class="container-page flex flex-col items-start gap-[42px] pb-[60px] pt-20 lg:pt-[120px]"
  >
    <div class="flex w-full items-end justify-center px-0 lg:px-[30px]">
      <div class="flex w-full max-w-[741px] flex-col items-center gap-4">
        <p class="eyebrow">Our Capabilities</p>
        <div class="flex w-full flex-col items-center gap-sm2 text-center">
          <h2 class="section-title">
            Six capabilities. One delivery standard.
          </h2>
          <p class="max-w-[617px] section-subtitle">
            Rather than presenting the six services as a long corporate list,
            group them into a visual capability system.
          </p>
        </div>
      </div>
    </div>

    <ul
      class="grid w-full grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="capability in capabilities"
        :key="capability.title"
        class="flex flex-col items-center gap-6 overflow-hidden rounded-lg border border-gray-200 bg-white px-1 py-6"
      >
        <div
          class="relative aspect-[366/323] w-full shrink-0 overflow-hidden rounded-[2px]"
        >
          <img
            :src="capability.image"
            alt=""
            aria-hidden="true"
            loading="lazy"
            class="absolute max-w-none"
            :class="!capability.inset && 'inset-0 size-full object-cover'"
            :style="capability.inset"
          />
        </div>

        <div
          class="flex w-full flex-col justify-center gap-[10px] px-4 pb-8 text-center"
        >
          <h3 class="text-2xl font-semibold text-dark-500">
            {{ capability.title }}
          </h3>
          <p class="text-base text-dark-300">{{ capability.body }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
