<script setup lang="ts">
// The portraits are framed slightly differently in the comp — each sits in a
// 170px circle at its own scale/offset so the faces line up.
const leaders = [
  {
    name: 'Abdulaziz Azzahrani',
    role: 'Co-Founder',
    photo: '/team/abdulaziz-azzahrani.webp',
    frame: 'h-[154px] w-[135px]',
    offset: 'left-[0.24%] top-[-6.54%] h-[113.09%] w-full',
  },
  {
    name: 'Yousef Alaqarbah',
    role: 'Chief Executive Officer',
    photo: '/team/yousef-alaqarbah.webp',
    frame: 'h-[172px] w-[151px]',
    offset: 'left-[-0.17%] top-[6%] size-[100.33%]',
  },
];
</script>

<template>
  <section
    class="relative overflow-hidden bg-blue-50 px-6 pb-20 pt-20 md:px-12 lg:px-20 lg:pt-[120px]"
  >
    <!-- Three heavily blurred brand-coloured circles. These are flat blurred
         ellipses in the comp; CSS reproduces them exactly without the assets. -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="absolute left-0 top-[-220px] size-[552px] rounded-full bg-blue-500 opacity-20 blur-[208px]"
      />
      <div
        class="absolute left-[80.6%] top-[-2px] size-[552px] rounded-full bg-purple-500 opacity-20 blur-[208px]"
      />
      <div
        class="absolute left-[-10.4%] top-[286px] size-[552px] rounded-full bg-yellow-500 opacity-20 blur-[208px]"
      />
    </div>

    <div
      class="container-page relative flex flex-col items-start gap-[42px] px-0"
    >
      <div class="flex w-full items-center justify-center">
        <div
          class="flex w-full max-w-[741px] flex-col items-center gap-sm2 text-center"
        >
          <h2 class="section-title">Executive management</h2>
          <p class="section-subtitle">The leadership behind our work.</p>
        </div>
      </div>

      <ul
        class="flex w-full flex-wrap items-start justify-center gap-x-[60px] gap-y-10"
      >
        <li
          v-for="leader in leaders"
          :key="leader.name"
          class="flex flex-col items-center gap-3"
        >
          <div
            class="flex size-[170px] items-end justify-center overflow-hidden rounded-full border border-[#C6AEDE] bg-white"
          >
            <div
              class="relative shrink-0 overflow-hidden rounded-xs"
              :class="leader.frame"
            >
              <img
                :src="leader.photo"
                :alt="leader.name"
                class="absolute max-w-none object-cover"
                :class="leader.offset"
                loading="lazy"
              />
            </div>
          </div>

          <div
            class="flex w-[245px] flex-col items-center gap-[10px] px-4 text-center"
          >
            <p class="text-[22px] font-semibold text-dark-500">
              {{ leader.name }}
            </p>
            <p class="text-base text-dark-300">{{ leader.role }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
