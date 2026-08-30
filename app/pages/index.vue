<template>
  <div class="bg-white">
    <AppHeader />

    <main>
      <!-- Section order follows the Figma frame top to bottom. -->
      <SectionsHeroSection />
      <SectionsStatsSection />

      <!-- Everything between the two dark bands sits on the dotted paper. -->
      <div class="bg-dot-grid">
        <SectionsAboutSection />
        <SectionsServicesSection />
        <SectionsIdentitySection />
        <SectionsCapabilitiesSection />
        <SectionsIndustriesSection />
        <SectionsClientsSection />
      </div>

      <SectionsTeamSection />

      <div class="bg-dot-grid">
        <SectionsMethodologySection />
        <SectionsProductsSection />
      </div>
    </main>

    <AppFooter />

    <ContactModal />
  </div>
</template>
