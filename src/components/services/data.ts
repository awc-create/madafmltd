export type ServiceItem = {
  id: 'electrical' | 'cooling' | 'security';
  title: string;
  icon: string;
  description: string;
  href: string;
  subServices: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'electrical',
    title: 'Electrical Solutions',
    icon: 'mdi:lightning-bolt-circle',
    description:
      'Comprehensive electrical solutions—from wiring and panel upgrades to 24/7 emergency repairs—for homes, offices and industrial sites.',
    href: '/services/electrical',
    subServices: ['Wiring & Rewiring', 'Panel Upgrades', '24/7 Emergency Repairs'],
  },
  {
    id: 'cooling',
    title: 'Cooling Systems',
    icon: 'mdi:air-conditioner',
    description:
      'Energy-efficient air conditioning installations, duct cleaning, and commercial HVAC maintenance to keep you cool year-round.',
    href: '/services/cooling',
    subServices: ['AC Installation', 'Duct Cleaning', 'Commercial HVAC'],
  },
  {
    id: 'security',
    title: 'Security Solutions',
    icon: 'mdi:cctv',
    description:
      'Advanced CCTV, access control, and alarm systems to protect your property—residential or commercial.',
    href: '/services/security',
    subServices: ['CCTV Systems', 'Access Control', 'Alarm Systems'],
  },
];
