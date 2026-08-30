<script setup lang="ts">
const { open: openContact } = useContactModal();
</script>

<template>
  <section class="relative overflow-hidden bg-dark-800">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        src="/images/hero-wave-background.png"
        alt=""
        class="size-full object-cover"
        width="1264"
        height="843"
        fetchpriority="high"
      />
      <div
        class="absolute inset-0"
        style="
          background-image:
            linear-gradient(
              180deg,
              rgba(13, 10, 39, 0) 70.673%,
              rgb(13, 10, 39) 100%
            ),
            linear-gradient(
              90deg,
              rgba(13, 10, 39, 0.92) 35.096%,
              rgba(13, 10, 39, 0) 100%
            );
        "
      />
    </div>

    <div
      class="container-page relative flex flex-col items-start gap-8 pb-28 pt-40 lg:pb-[198px] lg:pt-[281px]"
    >
      <div class="flex max-w-[626px] flex-col items-start gap-6">
        <h1
          class="text-[32px] font-semibold leading-[1.1] text-white md:text-[40px] md:leading-[44px]"
        >
          Quality And Speed, Delivered With Absolute Transparency And Building
          The Right Trust.
        </h1>

        <p class="text-lg text-dark-50 md:text-2xl">
          Devenn empowers organizations to innovate across the digital
          landscape. Eight technology horizontals. One delivery standard. Twenty
          years of excellence in the Saudi market.
        </p>
      </div>

      <button type="button" class="btn-primary" @click="openContact">
        Contact us
      </button>
    </div>
  </section>
</template>
