import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();

  const sectionTitle = {
    en: 'What Our Travelers Say',
    ru: 'Что говорят наши путешественники',
    uz: 'Sayohatchilarimiz fikrlari',
    kaa: 'Sayaxatshılarımız pikrleri',
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: {
        en: 'United States',
        ru: 'США',
        uz: 'AQSH',
        kaa: 'AQSh',
      },
      text: {
        en: 'An incredible journey through history! The Registan at sunset was absolutely breathtaking. Our guide was knowledgeable and the organization was flawless.',
        ru: 'Невероятное путешествие сквозь историю! Регистан на закате был просто потрясающим. Наш гид был очень знающим, а организация безупречной.',
        uz: 'Tarix bo\'ylab ajoyib sayohat! Quyosh botishida Registon hayratlanarli edi. Gidimiz bilimdon va tashkilot mukammal edi.',
        kaa: 'Tariyxtan ótkizetın keremetley sayaxat! Kún batqanda Registan hayran qaldıradı. Gidimiz bilimli hám shólkemlestiriw kemshiliksiz edi.',
      },
      rating: 5,
    },
    {
      name: 'Dmitry Petrov',
      location: {
        en: 'Russia',
        ru: 'Россия',
        uz: 'Rossiya',
        kaa: 'Rossiya',
      },
      text: {
        en: 'The hospitality of Uzbek people is something I will never forget. The food was amazing, especially the plov in Samarkand. Highly recommended!',
        ru: 'Гостеприимство узбекского народа - это то, что я никогда не забуду. Еда была потрясающей, особенно плов в Самарканде. Очень рекомендую!',
        uz: 'O\'zbek xalqining mehmondo\'stligi - bu hech qachon unutmayman. Taomlar juda mazali, ayniqsa Samarqanddagi palov. Tavsiya qilaman!',
        kaa: 'O\'zbek xalqının miymandoslığın heshqashan umıtpayaman. Tağamlar ájaiyıp, ásirese Samarqandtağı palaw. Usynısymen!',
      },
      rating: 5,
    },
    {
      name: 'Emma Schmidt',
      location: {
        en: 'Germany',
        ru: 'Германия',
        uz: 'Germaniya',
        kaa: 'Germaniya',
      },
      text: {
        en: 'Bukhara and Khiva felt like stepping back in time. The architecture is stunning and well-preserved. A must-visit destination for history lovers.',
        ru: 'Бухара и Хива - как путешествие во времени. Архитектура потрясающая и хорошо сохранившаяся. Обязательное место для любителей истории.',
        uz: 'Buxoro va Xiva - vaqtda orqaga qaytish kabi. Me\'morchilik ajoyib va yaxshi saqlanib qolgan. Tarix ixlosmandlari uchun must.',
        kaa: 'Buxara hám Xıwa - waqıtta artqa qaytqandaydı. Arxitektura keremetley hám jaqsı saqlangan. Tariyxsúyerler ushın kerek.',
      },
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{sectionTitle[language]}</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-2xl border border-border shadow-soft relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Quote className="h-5 w-5 text-primary-foreground" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                "{testimonial.text[language]}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location[language]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
