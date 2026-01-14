import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import registanImage from '@/assets/registan.jpg';
import khivaImage from '@/assets/khiva.jpg';
import bukharaImage from '@/assets/bukhara.jpg';

const DestinationsGallery: React.FC = () => {
  const { language } = useLanguage();

  const destinations = [
    {
      image: registanImage,
      title: {
        en: 'Samarkand',
        ru: 'Самарканд',
        uz: 'Samarqand',
        kaa: 'Samarqand',
      },
      description: {
        en: 'The jewel of the Silk Road with its magnificent Registan Square',
        ru: 'Жемчужина Шелкового пути с великолепной площадью Регистан',
        uz: 'Buyuk Ipak yo\'lining marvaridi - ajoyib Registon maydoni bilan',
        kaa: 'Jipek jolının gáwheri - ájaiyıp Registan maydanı menen',
      },
    },
    {
      image: khivaImage,
      title: {
        en: 'Khiva',
        ru: 'Хива',
        uz: 'Xiva',
        kaa: 'Xıwa',
      },
      description: {
        en: 'An open-air museum with perfectly preserved ancient architecture',
        ru: 'Музей под открытым небом с прекрасно сохранившейся древней архитектурой',
        uz: 'Qadimiy me\'morchiligi mukammal saqlanib qolgan ochiq osmon muzeysi',
        kaa: 'Qadimgi árxitekturası tóliq saqlangan ashıq aspan muzeyi',
      },
    },
    {
      image: bukharaImage,
      title: {
        en: 'Bukhara',
        ru: 'Бухара',
        uz: 'Buxoro',
        kaa: 'Buxara',
      },
      description: {
        en: 'A sacred city with over 2,000 years of history and culture',
        ru: 'Священный город с более чем 2000-летней историей и культурой',
        uz: '2000 yillik tarix va madaniyatga ega muqaddas shahar',
        kaa: '2000 jıldan aslamıraq tariyxı hám mádeniyet ortalığı',
      },
    },
  ];

  const sectionTitle = {
    en: 'Popular Destinations',
    ru: 'Популярные направления',
    uz: 'Mashhur yo\'nalishlar',
    kaa: 'Máshur bağdarlar',
  };

  const sectionSubtitle = {
    en: 'Discover the ancient cities of the Silk Road',
    ru: 'Откройте для себя древние города Шелкового пути',
    uz: 'Buyuk Ipak yo\'lining qadimiy shaharlarini kashf eting',
    kaa: 'Jipek jolının qadimgi qalaların ashıń',
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{sectionTitle[language]}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {sectionSubtitle[language]}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              <img
                src={destination.image}
                alt={destination.title[language]}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-2xl font-bold">
                    {destination.title[language]}
                  </h3>
                </div>
                <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {destination.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsGallery;
