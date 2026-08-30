<script setup lang="ts">
// Each figure fades into the next brand colour, so the row reads as one
// continuous white -> purple -> blue -> yellow sweep.
const stats = [
  { value: '23', label: 'Project realized', gradient: 'from-white to-purple-500' },
  { value: '+20', label: 'Years of Trust', gradient: 'from-purple-500 to-blue-500' },
  { value: '+8', label: 'Technology used', gradient: 'from-blue-500 to-yellow-500' }
]
</script>

<template>
  <section class="relative overflow-hidden bg-dark-800 px-6 pb-20 pt-[120px] md:px-12 lg:px-20">
    <!-- Decorative linework sitting between the copy and the figures. The
         radial mask fades both ends so the lines don't collide with the text. -->
    <div
      class="pointer-events-none absolute left-1/2 top-[244px] hidden h-[283px] w-[1055px] -translate-x-1/2 overflow-hidden lg:block"
      aria-hidden="true"
    >
      <img
        src="/illustrations/stats-wave-glow.svg"
        alt=""
        class="absolute left-[-99px] top-[18px] h-[389px] w-[1180px] max-w-none"
      >
      <img
        src="/illustrations/stats-wave-lines.svg"
        alt=""
        class="absolute left-[-99px] top-[18px] h-[389px] w-[1180px] max-w-none"
      >
      <div
        class="absolute inset-0"
        style="
          background: radial-gradient(
            ellipse 50.7% 65.9% at 50.7% 36.3%,
            rgba(13, 10, 39, 0) 57.2%,
            rgba(13, 10, 39, 1) 100%
          );
        "
      />
    </div>

    <div class="container-page relative flex flex-col items-center gap-24 lg:gap-[263px]">
      <div class="flex w-full max-w-[901px] flex-col items-center gap-sm2 text-center">
        <h2 class="text-[28px] font-bold text-gray-50 md:text-[32px]">Scale with confidence</h2>
        <p class="max-w-[848px] text-base text-dark-50 md:text-xl">
          Our growing expertise, diverse technology capabilities and experience in the Saudi market
          let us deliver solutions that create measurable, sustainable business impact.
        </p>
      </div>

      <dl class="flex w-full flex-col items-center gap-10 sm:flex-row sm:gap-0">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-1 flex-col items-center justify-center gap-[10px] px-10 py-5 text-center"
        >
          <dt
            class="bg-gradient-to-r bg-clip-text text-5xl font-medium text-transparent md:text-[64px]"
            :class="stat.gradient"
          >
            {{ stat.value }}
          </dt>
          <dd class="text-base text-dark-50">{{ stat.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
