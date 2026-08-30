<script setup lang="ts">
// Nav targets match the section ids rendered in pages/index.vue.
const links = [
  { label: 'About devenn', href: '#about' },
  { label: 'Our Capabilities', href: '#capabilities' },
  { label: 'Industries We Serve', href: '#industries' },
  { label: 'Our Methodology', href: '#methodology' },
  { label: 'Our Products', href: '#products' },
];

const mobileOpen = ref(false);

const { open: openContact } = useContactModal();

// The header is bare over the hero art and only picks up a backdrop once the
// page moves. Below the hero it passes over white sections, where the white
// wordmark and nav would otherwise vanish — hence the dark bar rather than a
// light one.
const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 8;
}

onMounted(() => {
  onScroll(); // covers a reload part-way down the page
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

// Keep the bar filled while the mobile drawer is open, so the two read as one
// surface even at the very top.
const filled = computed(() => scrolled.value || mobileOpen.value);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 h-20 border-b transition-colors duration-300"
    :class="
      filled
        ? 'border-white/5 bg-dark-800/70 backdrop-blur-[6.5px]'
        : 'border-transparent bg-transparent'
    "
  >
    <div class="container-page flex h-full items-center justify-between">
      <a href="#" class="shrink-0" aria-label="Devenn — home">
        <img
          src="/logos/devenn-wordmark-white.svg"
          alt="Devenn"
          width="132"
          height="28"
          class="h-7 w-[132px]"
        />
      </a>

      <nav class="hidden items-center gap-5 lg:flex" aria-label="Main">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-xs px-xxs text-sm font-medium text-gray-50 transition-opacity hover:opacity-70"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="btn-primary hidden px-3 py-[10px] text-sm sm:inline-flex"
          @click="openContact"
        >
          Contact us
        </button>

        <button
          type="button"
          class="rounded-xs p-2 text-gray-50 lg:hidden"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" size="24" />
        </button>
      </div>
    </div>

    <!-- mobile drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="mobileOpen"
        class="border-b border-white/10 bg-dark-800/95 backdrop-blur-md lg:hidden"
        aria-label="Mobile"
      >
        <div class="container-page flex flex-col gap-1 py-4">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="rounded-xs py-2 text-sm font-medium text-gray-50"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </a>
          <button
            type="button"
            class="btn-primary mt-2 sm:hidden"
            @click="
              mobileOpen = false;
              openContact();
            "
          >
            Contact us
          </button>
        </div>
      </nav>
    </Transition>
  </header>
</template>
