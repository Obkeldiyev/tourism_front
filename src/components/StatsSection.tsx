import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const StatsSection: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      value: '7+',
      label: {
        en: 'UNESCO Sites',
        ru: 'Объектов ЮНЕСКО',
        uz: 'UNESCO obyektlari',
        kaa: 'UNESCO obektleri',
      },
    },
    {
      value: '2500+',
      label: {
        en: 'Years of History',
        ru: 'Лет истории',
        uz: 'Yillik tarix',
        kaa: 'Jıllıq tariyxı',
      },
    },
    {
      value: '1000+',
      label: {
        en: 'Happy Travelers',
        ru: 'Довольных путешественников',
        uz: 'Mamnun sayohatchilar',
        kaa: 'Razı sayaxatshılar',
      },
    },
    {
      value: '50+',
      label: {
        en: 'Tour Packages',
        ru: 'Туристических пакетов',
        uz: 'Tur paketlari',
        kaa: 'Tur paketleri',
      },
    },
  ];

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground/80 text-sm md:text-base">
                {stat.label[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
