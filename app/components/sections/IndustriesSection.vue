<script setup lang="ts">
const industries = [
  'Government & Public Sector',
  'Facility Management',
  'Education & Training',
  'Energy & Utilities',
  'Healthcare',
  'Telecom & Technology'
]
</script>

<template>
  <section id="industries" class="container-page flex flex-col items-start pb-20 pt-20 lg:pt-[120px]">
    <div
      class="relative flex w-full flex-col items-start gap-10 overflow-hidden rounded-lg px-6 py-10 md:px-[50px] md:py-[60px] lg:gap-[60px]"
      style="background-image: radial-gradient(ellipse 120% 140% at 100% 0%, #f7effe 0%, #cfe5fb 100%)"
    >
      <!-- Oversized linework bleeding past the card edges, screened over the
           gradient exactly as in the comp. -->
      <img
        src="/illustrations/industries-glow-lines.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute left-[-449px] top-[-85.58px] h-[626px] w-[1897px] max-w-none mix-blend-screen"
      >

      <div class="relative flex w-full items-end justify-center px-0 md:px-[30px]">
        <div class="flex w-full max-w-[741px] flex-col items-center gap-4">
          <p class="eyebrow">Industries We Serve</p>
          <div class="flex w-full flex-col items-center gap-sm2 text-center">
            <h2 class="section-title max-w-[518px]">
              Technology shaped around the industries that matter.
            </h2>
            <p class="max-w-[534px] section-subtitle">
              Instead of simply saying "Industries We Serve", make the positioning more strategic.
            </p>
          </div>
        </div>
      </div>

      <ul class="relative flex w-full flex-wrap items-center justify-center gap-5">
        <li
          v-for="industry in industries"
          :key="industry"
          class="flex items-center justify-center rounded-lg bg-white/60 p-[14px] text-base font-semibold text-purple-800"
        >
          {{ industry }}
        </li>
      </ul>
    </div>
  </section>
</template>
