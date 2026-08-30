<script setup lang="ts">
// Heights mirror the comp; widths follow each logo's own aspect ratio. The
// comp positions these absolutely with optical spacing — a centred wrap gets
// the same result and survives narrower viewports.
const clients = [
  { name: 'Saudi Aramco', file: '/clients/aramco.svg', height: 53 },
  { name: 'Education & Training Evaluation Commission', file: '/clients/etec.webp', height: 52 },
  { name: 'Capital Market Authority', file: '/clients/capital-market-authority.svg', height: 47 },
  { name: 'Deloitte', file: '/clients/deloitte.svg', height: 30 },
  { name: 'Ministry of Culture', file: '/clients/ministry-of-culture.svg', height: 94 },
  { name: 'King Saud University', file: '/clients/king-saud-university.svg', height: 100 },
  { name: 'Ministry of Justice', file: '/clients/ministry-of-justice.svg', height: 100 },
  {
    name: 'Saudi Commission for Health Specialties',
    file: '/clients/saudi-commission-health-specialties.svg',
    height: 94
  }
]
</script>

<template>
  <section class="container-page flex flex-col items-start pb-20 pt-20 lg:pt-[120px]">
    <div class="flex w-full flex-col items-center gap-sm2 text-center">
      <h2 class="section-title">Trusted By Leaders</h2>
      <p class="section-subtitle">Trusted by leading developers and enterprises</p>
    </div>

    <ul
      class="mt-[42px] flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:gap-x-14 lg:gap-y-10"
    >
      <li v-for="client in clients" :key="client.name" class="flex items-center justify-center">
        <img
          :src="client.file"
          :alt="client.name"
          :style="{ height: `${client.height}px` }"
          class="w-auto max-w-full object-contain"
          loading="lazy"
        >
      </li>
    </ul>
  </section>
</template>
