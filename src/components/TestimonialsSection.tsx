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
        en: 'The Savitsky Museum in Nukus was absolutely incredible! The world\'s second-largest collection of Russian avant-garde art in such an unexpected place. Truly a hidden gem.',
        ru: 'Музей Савицкого в Нукусе был просто невероятным! Вторая по величине коллекция русского авангарда в таком неожиданном месте. Настоящая скрытая жемчужина.',
        uz: 'Nukusdagi Savitskiy muzeyi juda ajoyib edi! Rus avangard san\'atining ikkinchi eng katta kolleksiyasi bunday kutilmagan joyda. Haqiqiy yashirin gavhar.',
        kaa: 'Nukustağı Savitskiy muzeyı ájaiyıp edi! Rus avangard óneriniń ekinshi eń úlken kolleksiyası bunday kútilmegen jerde. Shın jasırın gavhar.',
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
        en: 'The Aral Sea ship graveyard was both haunting and fascinating. Our guide explained the ecological history beautifully. The Karakalpak hospitality was unforgettable.',
        ru: 'Кладбище кораблей Аральского моря было одновременно жутким и завораживающим. Наш гид прекрасно объяснил экологическую историю. Каракалпакское гостеприимство незабываемо.',
        uz: 'Orol dengizining kema qabristoni ham dahshatli, ham jozibali edi. Gidimiz ekologik tarixni ajoyib tushuntirdi. Qaraqalpaq mehmondo\'stligi unutilmas.',
        kaa: 'Aral teńiziniń keme qábiristanı hám qorqınısh, hám qızıqlı edi. Gidimiz ekologiyalıq tariyxtı keremetley túsindirdi. Qaraqalpaq miymandoslığı umıtılmas.',
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
        en: 'Mizdakhan necropolis was like stepping into ancient legends. The 2000-year history and sacred atmosphere were deeply moving. A must-visit for history enthusiasts.',
        ru: 'Некрополь Миздахан был как погружение в древние легенды. 2000-летняя история и священная атмосфера глубоко тронули. Обязательно для любителей истории.',
        uz: 'Mizdaxon qabristoni qadimiy afsonalarga kirib borishga o\'xshardi. 2000 yillik tarix va muqaddas muhit chuqur ta\'sir qildi. Tarix sevuvchilar uchun zarur.',
        kaa: 'Mizdaxan qábiristanı qadimgi erteklere kirip barıwğa uqsaydı. 2000 jıllıq tariyxı hám muqaddas muhit terek tásir etedi. Tariyxsúyerler ushın kerek.',
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
