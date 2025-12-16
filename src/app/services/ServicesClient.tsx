'use client';

import ServicesHero from '@/components/services/hero/ServicesHero';
import ServicesGrid from '@/components/services/grid/ServicesGrid';
import ServicesCTA from '@/components/services/cta/ServicesCTA';

export default function ServicesClient() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesCTA />
    </>
  );
}
