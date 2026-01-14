import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ToursSection from '@/components/ToursSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ToursSection limit={6} />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
