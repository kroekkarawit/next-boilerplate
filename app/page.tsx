'use client';

import { AnimatedBackground } from '@/components/enterprise/animated-background';
import { HeroSection } from '@/components/enterprise/hero-section';
import { FeaturesSection } from '@/components/enterprise/features-section';
import { TestimonialsSection } from '@/components/enterprise/testimonials-section';
import { CTASection } from '@/components/enterprise/cta-section';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enterprise animated background */}
      <AnimatedBackground />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}