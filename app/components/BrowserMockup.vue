<script setup lang="ts">
/**
 * The frosted browser frame the product screenshots sit inside.
 *
 * The chrome (bar + traffic lights) is drawn in CSS rather than imported as
 * SVG — it is four rectangles and three dots, and the dot colours are already
 * design tokens (web.close / web.minimize / web.maximize).
 *
 * `crop` reproduces each screenshot's placement inside the frame: the source
 * captures are different heights, so the comp offsets each one individually.
 */
defineProps<{
  src: string;
  alt: string;
  crop?: { top: string; left: string; width: string; height: string };
}>();
</script>

<template>
  <div
    class="absolute left-[4.38%] top-[17.6%] h-[93.1%] w-[91.97%] rounded-[5.6px] bg-white/40 backdrop-blur-[2px]"
  >
    <!-- Title bar -->
    <div
      class="absolute inset-x-0 top-0 flex h-[14px] items-center gap-[4.2px] rounded-t-[5.6px] bg-white/70 pl-[6.3px]"
    >
      <span class="size-[4.2px] rounded-full bg-web-close" />
      <span class="size-[4.2px] rounded-full bg-web-minimize" />
      <span class="size-[4.2px] rounded-full bg-web-maximize" />
    </div>

    <!-- Screen -->
    <div
      class="absolute inset-x-0 top-[14px] bottom-0 overflow-hidden rounded-[2.8px] px-[3.15px] py-[3.5px]"
    >
      <div class="relative size-full overflow-hidden rounded-[2.8px]">
        <img
          :src="src"
          :alt="alt"
          loading="lazy"
          class="absolute max-w-none"
          :class="!crop && 'inset-0 size-full object-cover'"
          :style="crop"
        />
      </div>
    </div>
  </div>
</template>
