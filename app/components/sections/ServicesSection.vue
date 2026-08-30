<script setup lang="ts">
const services = [
  'Digital Transformation Consultancy',
  'Enterprise Applications Implementation',
  'Mobility & Customer Experience Solutions',
  'UI/UX & Design Systems',
  'AI, Data & Analytics Solutions',
  'IoT & Facility Management Solutions',
];
</script>

<template>
  <section class="container-page">
    <div class="flex flex-col items-stretch gap-[25px] pb-20 lg:flex-row">
      <div
        class="card-gradient-border flex flex-1 flex-col items-start gap-[25px] p-6"
      >
        <h2 class="w-full text-2xl font-semibold text-dark-500">
          Our Services Span Across:
        </h2>
        <ul class="flex w-full flex-col gap-[25px]">
          <BulletItem v-for="service in services" :key="service">{{
            service
          }}</BulletItem>
        </ul>
      </div>

      <div
        class="card-gradient-border flex flex-1 flex-col items-start gap-[25px] p-6"
      >
        <h2 class="w-full text-2xl font-semibold text-dark-500">
          Our Proprietary product Portfolio includes:
        </h2>
        <ul class="flex w-full flex-col gap-[25px]">
          <BulletItem>Ejaad AI Engine</BulletItem>

          <li class="flex w-full list-none flex-col gap-[10px]">
            <ul class="flex flex-col gap-[10px]">
              <BulletItem>Office Intelligence suite, including:</BulletItem>
              <BulletItem variant="dot">Office Intelligence 360</BulletItem>
              <BulletItem variant="dot">Office Operations Engine</BulletItem>
            </ul>
          </li>

          <BulletItem>XMission - Adaptive Case Management Platform</BulletItem>
        </ul>
      </div>
    </div>
  </section>
</template>
