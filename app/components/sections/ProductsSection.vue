<script setup lang="ts">
// Each card gets its own pair of blurred brand-colour blobs, so the four
// tiles cycle through yellow / blue / purple rather than repeating.
type Product = {
  name: string
  tagline?: string
  image: string
  crop?: { top: string, left: string, width: string, height: string }
  blobs: [string, string]
  blobPosition: string
}

const products: Product[] = [
  {
    name: 'Office Intelligence Suite',
    tagline: 'Office Intelligence',
    image: '/products/office-intelligence.webp',
    crop: { top: '-0.14%', left: '0', width: '100%', height: '175.57%' },
    blobs: ['bg-yellow-500', 'bg-blue-500'],
    blobPosition: 'left-[39.6%] top-[29.25%]'
  },
  {
    name: 'Office Intelligence Suite',
    tagline: 'Office Operation',
    image: '/products/office-operations.webp',
    crop: { top: '0.06%', left: '-0.2%', width: '100.31%', height: '94.71%' },
    blobs: ['bg-blue-500', 'bg-purple-500'],
    blobPosition: 'left-[37.8%] top-[29.25%]'
  },
  {
    name: 'X Mission',
    tagline: 'Adaptive Mission Management',
    image: '/products/x-mission.webp',
    crop: { top: '0.21%', left: '0', width: '100%', height: '108.39%' },
    blobs: ['bg-purple-500', 'bg-yellow-500'],
    blobPosition: 'left-[41.4%] top-[24.25%]'
  },
  {
    name: 'Ejaad AI',
    image: '/products/ejaad-ai.webp',
    blobs: ['bg-blue-500', 'bg-purple-500'],
    blobPosition: 'left-[37.8%] top-[29.25%]'
  }
]
</script>

<template>
  <section
    id="products"
    class="container-page flex flex-col items-start gap-[42px] pb-20 pt-20 lg:pt-[120px]"
  >
    <div class="flex w-full items-end justify-center px-0 lg:px-[30px]">
      <div class="flex w-full max-w-[741px] flex-col items-center gap-4">
        <p class="eyebrow">Our Products</p>
        <div class="flex w-full flex-col items-center gap-sm2 text-center">
          <h2 class="section-title">Digital products. Real-world impact.</h2>
          <p class="max-w-[617px] section-subtitle">
            Purpose-built solutions that combine technology, intelligence, and innovation to solve
            complex business challenges.
          </p>
        </div>
      </div>
    </div>

    <ul class="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <li
        v-for="product in products"
        :key="product.name + (product.tagline ?? '')"
        class="flex flex-col items-center gap-6 bg-white px-1"
      >
        <div class="relative h-[400px] w-full overflow-hidden rounded-lg">
          <!-- Blurred colour blobs + screened linework behind the mockup. -->
          <div class="absolute inset-0" aria-hidden="true">
            <div
              class="absolute left-[-33.9%] top-[-47.5%] size-[353px] rounded-full opacity-50 blur-[208px]"
              :class="product.blobs[0]"
            />
            <div
              class="absolute size-[353px] rounded-full opacity-50 blur-[208px]"
              :class="[product.blobs[1], product.blobPosition]"
            />
            <img
              src="/illustrations/products-glow-lines.svg"
              alt=""
              class="absolute left-[-383px] top-[-77.53px] h-[626px] w-[1897px] max-w-none mix-blend-screen"
            >
          </div>

          <BrowserMockup :src="product.image" :alt="product.name" :crop="product.crop" />
        </div>

        <div class="flex w-full flex-col justify-center gap-[10px] px-4 pb-8 text-center">
          <h3 class="text-2xl font-bold text-dark-500">{{ product.name }}</h3>
          <p v-if="product.tagline" class="text-base text-dark-300">{{ product.tagline }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
