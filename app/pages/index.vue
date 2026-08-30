<template>
  <div class="bg-white">
    <AppHeader />

    <main>
      <SectionsHeroSection />
      <SectionsStatsSection />

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
