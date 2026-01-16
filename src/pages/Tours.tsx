import React from 'react';
import Header from '@/components/Header';
import ToursSection from '@/components/ToursSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Tours: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Page Header */}
        <div className="bg-gradient-to-b from-primary/10 to-transparent py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{t('nav_tours')}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('hero_subtitle')}
            </p>
          </div>
        </div>
        <ToursSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Tours;
