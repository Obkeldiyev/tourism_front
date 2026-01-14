import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import ToursSection from '@/components/ToursSection';
import DestinationsGallery from '@/components/DestinationsGallery';
import CultureSection from '@/components/CultureSection';
import Features from '@/components/Features';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <ToursSection limit={6} />
        <DestinationsGallery />
        <CultureSection />
        <Features />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
