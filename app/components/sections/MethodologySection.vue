<script setup lang="ts">
const steps = [
  {
    icon: '/icons/route.svg',
    title: 'Discover',
    body: 'Understand the constraint before naming a solution.',
  },
  {
    icon: '/icons/grid.svg',
    title: 'Define',
    body: 'Scope, success measures and the delivery standard, agreed in writing.',
  },
  {
    icon: '/icons/palette.svg',
    title: 'Design',
    body: 'Interfaces and architecture designed together, not in sequence.',
  },
  {
    icon: '/icons/dataflow.svg',
    title: 'Build',
    body: 'Short increments with visible progress and no reporting theatre.',
  },
  {
    icon: '/icons/container.svg',
    title: 'Deliver',
    body: 'Launch, handover and the training that makes adoption stick.',
  },
  {
    icon: '/icons/rocket.svg',
    title: 'Evolve',
    body: 'Measure, tune and extend as the organisation changes.',
  },
];
</script>

<template>
  <section
    id="methodology"
    class="container-page flex flex-col items-start gap-[42px] pb-20 pt-20 lg:pb-[120px] lg:pt-[180px]"
  >
    <div class="flex w-full items-start justify-center">
      <div class="flex w-full max-w-[741px] flex-col items-center gap-4">
        <p class="eyebrow">Our Methodology</p>
        <div class="flex w-full flex-col gap-sm2 text-center">
          <h2 class="section-title">From challenge to continuous impact.</h2>
          <p class="section-subtitle">
            Your proposed process works very well here.
          </p>
        </div>
      </div>
    </div>

    <div class="flex w-full flex-col items-center justify-center">
      <!-- Streamed linework running behind the step row, faded to white at
           both ends so it doesn't crowd the first and last columns. -->
      <div
        class="relative -mb-6 hidden h-[117px] w-full overflow-hidden lg:block"
        aria-hidden="true"
      >
        <img
          src="/illustrations/methodology-wave.svg"
          alt=""
          class="absolute left-[0.78px] top-[1.25px] h-[129.169px] w-[1119.438px] max-w-none"
        />
        <div
          class="absolute inset-0"
          style="
            background: radial-gradient(
              ellipse 50.8% 55% at 50.8% 55%,
              rgba(255, 255, 255, 0) 57.2%,
              rgba(255, 255, 255, 1) 100%
            );
          "
        />
      </div>

      <ol
        class="grid w-full grid-cols-1 items-start gap-2 sm:grid-cols-2 lg:grid-cols-6"
      >
        <li
          v-for="step in steps"
          :key="step.title"
          class="flex flex-col items-start justify-center gap-[10px] rounded-xs p-[14px]"
        >
          <img
            :src="step.icon"
            alt=""
            aria-hidden="true"
            class="size-6"
            width="24"
            height="24"
          />
          <h3 class="text-xl font-semibold text-dark-500">{{ step.title }}</h3>
          <p class="w-full text-sm text-dark-300">{{ step.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
